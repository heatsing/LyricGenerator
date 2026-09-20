/**
 * Creates PayPal product + monthly/yearly plans when credentials exist.
 * Does not print secrets.
 */
import { paypalRequest, paypalConfigured } from "../lib/paypal"

async function main() {
  if (!paypalConfigured()) {
    console.log("PayPal credentials are missing. Sandbox/live checkout cannot start until they exist in the environment.")
    process.exit(0)
  }

  const product = await paypalRequest<{ id: string }>("/v1/catalogs/products", {
    method: "POST",
    body: JSON.stringify({
      name: "LyricGenerator Pro",
      description: "Unlimited lyric generation, history, and lyrics-to-song",
      type: "SERVICE",
      category: "SOFTWARE",
    }),
  })

  const monthly = await paypalRequest<{ id: string }>("/v1/billing/plans", {
    method: "POST",
    body: JSON.stringify({
      product_id: product.id,
      name: "Pro Monthly",
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: { fixed_price: { value: "9.00", currency_code: "USD" } },
        },
      ],
      payment_preferences: { auto_bill_outstanding: true, payment_failure_threshold: 3 },
    }),
  })

  const yearly = await paypalRequest<{ id: string }>("/v1/billing/plans", {
    method: "POST",
    body: JSON.stringify({
      product_id: product.id,
      name: "Pro Yearly",
      billing_cycles: [
        {
          frequency: { interval_unit: "YEAR", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: { fixed_price: { value: "69.00", currency_code: "USD" } },
        },
      ],
      payment_preferences: { auto_bill_outstanding: true, payment_failure_threshold: 3 },
    }),
  })

  console.log("PayPal product and plans created.")
  console.log(`PAYPAL_PLAN_MONTHLY=${monthly.id}`)
  console.log(`PAYPAL_PLAN_YEARLY=${yearly.id}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
