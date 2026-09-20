import { readFileSync, writeFileSync } from "node:fs"
import { getPaypalAccessToken, paypalRequest } from "../lib/paypal"

function loadLocalEnv() {
  const text = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue
    const idx = line.indexOf("=")
    process.env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
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
  return paypalRequest<{ id: string }>(
    "/v1/billing/plans",
    {
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
    },
    "live",
  )
}

async function main() {
  loadLocalEnv()
  await getPaypalAccessToken("live")
  console.log("live_token=ok")

  const product = await paypalRequest<{ id: string }>(
    "/v1/catalogs/products",
    {
      method: "POST",
      body: JSON.stringify({
        name: "LyricGenerator Subscriptions",
        description: "Basic and Premium lyric generation plans",
        type: "SERVICE",
        category: "SOFTWARE",
      }),
    },
    "live",
  )
  console.log(`PAYPAL_LIVE_PRODUCT_ID=${product.id}`)

  const basicMonthly = await createPlan(product.id, "Basic Monthly", "MONTH", "9.70")
  const basicYearly = await createPlan(product.id, "Basic Yearly", "YEAR", "58.20")
  const premiumMonthly = await createPlan(product.id, "Premium Monthly", "MONTH", "16.00")
  const premiumYearly = await createPlan(product.id, "Premium Yearly", "YEAR", "96.00")

  const existing = await paypalRequest<{ webhooks?: Array<{ id: string; url: string }> }>(
    "/v1/notifications/webhooks",
    undefined,
    "live",
  )
  let webhookId = existing.webhooks?.find((item) => item.url === WEBHOOK_URL)?.id
  if (!webhookId) {
    const webhook = await paypalRequest<{ id: string }>(
      "/v1/notifications/webhooks",
      {
        method: "POST",
        body: JSON.stringify({ url: WEBHOOK_URL, event_types: EVENT_TYPES }),
      },
      "live",
    )
    webhookId = webhook.id
  }

  writeEnv(loadLocalEnv(), {
    PAYPAL_LIVE_PRODUCT_ID: product.id,
    PAYPAL_LIVE_PLAN_BASIC_MONTHLY: basicMonthly.id,
    PAYPAL_LIVE_PLAN_BASIC_YEARLY: basicYearly.id,
    PAYPAL_LIVE_PLAN_PREMIUM_MONTHLY: premiumMonthly.id,
    PAYPAL_LIVE_PLAN_PREMIUM_YEARLY: premiumYearly.id,
    PAYPAL_LIVE_WEBHOOK_ID: webhookId || "",
  })

  console.log(`PAYPAL_LIVE_PLAN_BASIC_MONTHLY=${basicMonthly.id}`)
  console.log(`PAYPAL_LIVE_PLAN_BASIC_YEARLY=${basicYearly.id}`)
  console.log(`PAYPAL_LIVE_PLAN_PREMIUM_MONTHLY=${premiumMonthly.id}`)
  console.log(`PAYPAL_LIVE_PLAN_PREMIUM_YEARLY=${premiumYearly.id}`)
  console.log(`PAYPAL_LIVE_WEBHOOK_ID=${webhookId}`)
}

main().catch((error) => {
  console.error(String(error).slice(0, 400))
  process.exit(1)
})
