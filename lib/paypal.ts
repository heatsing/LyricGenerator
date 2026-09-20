import { isYearlyPlan, paypalPlanEnv, type PaidPlanId } from "./plans"

export type PaypalMode = "sandbox" | "live"

export function paypalMode(): PaypalMode {
  return process.env.PAYPAL_MODE === "live" ? "live" : "sandbox"
}

export function paypalApiBase() {
  return paypalMode() === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"
}

export function paypalCredentials(mode: PaypalMode = paypalMode()) {
  if (mode === "live") {
    return {
      clientId: process.env.PAYPAL_LIVE_CLIENT_ID || process.env.PAYPAL_CLIENT_ID || "",
      secret: process.env.PAYPAL_LIVE_CLIENT_SECRET || process.env.PAYPAL_CLIENT_SECRET || "",
    }
  }
  return {
    clientId: process.env.PAYPAL_SANDBOX_CLIENT_ID || process.env.PAYPAL_CLIENT_ID || "",
    secret: process.env.PAYPAL_SANDBOX_CLIENT_SECRET || process.env.PAYPAL_CLIENT_SECRET || "",
  }
}

export function paypalConfigured(mode: PaypalMode = paypalMode()) {
  const creds = paypalCredentials(mode)
  return Boolean(creds.clientId && creds.secret)
}

export async function getPaypalAccessToken(mode: PaypalMode = paypalMode()) {
  const { clientId, secret } = paypalCredentials(mode)
  if (!clientId || !secret) {
    throw new Error("PayPal is not configured")
  }
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64")
  const base = mode === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 180)
    throw new Error(`PayPal token failed: ${response.status} ${detail}`)
  }
  const data = (await response.json()) as { access_token: string }
  return data.access_token
}

export async function paypalRequest<T>(path: string, init?: RequestInit, mode: PaypalMode = paypalMode()): Promise<T> {
  const token = await getPaypalAccessToken(mode)
  const base = mode === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init?.headers || {}),
    },
  })
  const text = await response.text()
  const json = text ? JSON.parse(text) : {}
  if (!response.ok) {
    const error = new Error(`PayPal API ${response.status}: ${text.slice(0, 300)}`)
    ;(error as Error & { status: number }).status = response.status
    throw error
  }
  return json as T
}

export type PaypalSubscription = {
  id: string
  status: string
  plan_id?: string
  custom_id?: string
  subscriber?: { payer_id?: string; email_address?: string }
  billing_info?: {
    next_billing_time?: string
    last_payment?: { amount?: { value?: string; currency_code?: string }; time?: string }
    failed_payments_count?: number
  }
  start_time?: string
  links?: Array<{ rel: string; href: string }>
}

export async function createPaypalSubscription(input: {
  planId: PaidPlanId
  userId: string
  returnUrl: string
  cancelUrl: string
}) {
  const paypalPlanId = paypalPlanEnv(input.planId)
  if (!paypalPlanId) {
    throw new Error(`Missing PayPal plan id for ${input.planId}`)
  }
  return paypalRequest<PaypalSubscription>("/v1/billing/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      plan_id: paypalPlanId,
      custom_id: input.userId,
      application_context: {
        brand_name: "LyricGenerator",
        locale: "en-US",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
        return_url: input.returnUrl,
        cancel_url: input.cancelUrl,
      },
    }),
  })
}

export async function getPaypalSubscription(id: string) {
  return paypalRequest<PaypalSubscription>(`/v1/billing/subscriptions/${id}`)
}

export async function cancelPaypalSubscription(id: string, reason = "User cancelled from account billing") {
  await paypalRequest(`/v1/billing/subscriptions/${id}/cancel`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  })
}

export type PaypalWebhookHeaders = {
  transmissionId: string
  transmissionTime: string
  certUrl: string
  authAlgo: string
  transmissionSig: string
}

export async function verifyPaypalWebhookSignature(headers: PaypalWebhookHeaders, webhookEvent: unknown) {
  if (process.env.NODE_ENV === "test" && process.env.PAYPAL_WEBHOOK_VERIFY === "skip") {
    return true
  }
  const webhookId =
    paypalMode() === "live"
      ? process.env.PAYPAL_LIVE_WEBHOOK_ID || process.env.PAYPAL_WEBHOOK_ID
      : process.env.PAYPAL_SANDBOX_WEBHOOK_ID || process.env.PAYPAL_WEBHOOK_ID
  if (!webhookId) return false
  const result = await paypalRequest<{ verification_status: string }>("/v1/notifications/verify-webhook-signature", {
    method: "POST",
    body: JSON.stringify({
      auth_algo: headers.authAlgo,
      cert_url: headers.certUrl,
      transmission_id: headers.transmissionId,
      transmission_sig: headers.transmissionSig,
      transmission_time: headers.transmissionTime,
      webhook_id: webhookId,
      webhook_event: webhookEvent,
    }),
  })
  return result.verification_status === "SUCCESS"
}

export function approvalUrlFrom(sub: PaypalSubscription) {
  return sub.links?.find((link) => link.rel === "approve")?.href
}

export function periodEndFrom(sub: PaypalSubscription, planId: PaidPlanId, now = Date.now()) {
  if (sub.billing_info?.next_billing_time) {
    const parsed = Date.parse(sub.billing_info.next_billing_time)
    if (!Number.isNaN(parsed)) return parsed
  }
  const month = 30 * 24 * 60 * 60 * 1000
  return now + (isYearlyPlan(planId) ? month * 12 : month)
}
