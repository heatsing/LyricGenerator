/**
 * Creates GSong-aligned PayPal plans and ensures the webhook exists.
 * Prints IDs only, never secrets.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { paypalRequest, paypalConfigured, paypalMode } from "../lib/paypal"

function loadLocalEnv() {
  const text = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue
    const idx = line.indexOf("=")
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    if (key) process.env[key] = value
  }
  return text
}

function writeEnv(text: string, updates: Record<string, string>) {
  let next = text
  for (const [key, value] of Object.entries(updates)) {
    const line = `${key}=${value}`
    if (new RegExp(`^${key}=`, "m").test(next)) {
      next = next.replace(new RegExp(`^${key}=.*$`, "m"), line)
    } else {
      next = `${next.trimEnd()}\n${line}\n`
    }
  }
  writeFileSync(new URL("../.env.local", import.meta.url), next)
}

loadLocalEnv()

const WEBHOOK_URL = "https://lyricgenerator.cc/api/billing/webhook"
const EVENT_TYPES = [
  "BILLING.SUBSCRIPTION.ACTIVATED",
  "BILLING.SUBSCRIPTION.CANCELLED",
  "BILLING.SUBSCRIPTION.SUSPENDED",
  "BILLING.SUBSCRIPTION.EXPIRED",
  "BILLING.SUBSCRIPTION.UPDATED",
  "BILLING.SUBSCRIPTION.PAYMENT.FAILED",
  "PAYMENT.SALE.COMPLETED",
  "PAYMENT.SALE.DENIED",
].map((name) => ({ name }))

async function createPlan(productId: string, name: string, interval: "MONTH" | "YEAR", value: string) {
  return paypalRequest<{ id: string }>("/v1/billing/plans", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      name,
      billing_cycles: [
        {
          frequency: { interval_unit: interval, interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: { fixed_price: { value, currency_code: "USD" } },
        },
      ],
      payment_preferences: { auto_bill_outstanding: true, payment_failure_threshold: 3 },
    }),
  })
}

async function main() {
  if (!paypalConfigured()) {
    console.log("missing_credentials")
    process.exit(1)
  }
  console.log(`mode=${paypalMode()}`)

  const productId =
    process.env.PAYPAL_PRODUCT_ID ||
    (
      await paypalRequest<{ id: string }>("/v1/catalogs/products", {
        method: "POST",
        body: JSON.stringify({
          name: "LyricGenerator Subscriptions",
          description: "Basic and Premium lyric generation plans",
          type: "SERVICE",
          category: "SOFTWARE",
        }),
      })
    ).id
  console.log(`PAYPAL_PRODUCT_ID=${productId}`)

  const basicMonthly = await createPlan(productId, "Basic Monthly", "MONTH", "9.70")
  const basicYearly = await createPlan(productId, "Basic Yearly", "YEAR", "58.20")
  const premiumMonthly = await createPlan(productId, "Premium Monthly", "MONTH", "16.00")
  const premiumYearly = await createPlan(productId, "Premium Yearly", "YEAR", "96.00")

  const existing = await paypalRequest<{ webhooks?: Array<{ id: string; url: string }> }>("/v1/notifications/webhooks")
  let webhookId = existing.webhooks?.find((item) => item.url === WEBHOOK_URL)?.id
  if (!webhookId) {
    const webhook = await paypalRequest<{ id: string }>("/v1/notifications/webhooks", {
      method: "POST",
      body: JSON.stringify({ url: WEBHOOK_URL, event_types: EVENT_TYPES }),
    })
    webhookId = webhook.id
  }

  const updates = {
    PAYPAL_PRODUCT_ID: productId,
    PAYPAL_PLAN_BASIC_MONTHLY: basicMonthly.id,
    PAYPAL_PLAN_BASIC_YEARLY: basicYearly.id,
    PAYPAL_PLAN_PREMIUM_MONTHLY: premiumMonthly.id,
    PAYPAL_PLAN_PREMIUM_YEARLY: premiumYearly.id,
    PAYPAL_PLAN_MONTHLY: basicMonthly.id,
    PAYPAL_PLAN_YEARLY: basicYearly.id,
    PAYPAL_WEBHOOK_ID: webhookId || "",
  }
  writeEnv(loadLocalEnv(), updates)

  console.log(`PAYPAL_PLAN_BASIC_MONTHLY=${basicMonthly.id}`)
  console.log(`PAYPAL_PLAN_BASIC_YEARLY=${basicYearly.id}`)
  console.log(`PAYPAL_PLAN_PREMIUM_MONTHLY=${premiumMonthly.id}`)
  console.log(`PAYPAL_PLAN_PREMIUM_YEARLY=${premiumYearly.id}`)
  console.log(`PAYPAL_WEBHOOK_ID=${webhookId}`)
}

main().catch((error) => {
  console.error(String(error).slice(0, 400))
  process.exit(1)
})
