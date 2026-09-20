import { rmSync, mkdirSync } from "node:fs"

process.env.NEXTAUTH_SECRET = "test-nextauth-secret-please-change"
process.env.DATABASE_URL = "file:./data/test.db"
process.env.PAYPAL_WEBHOOK_VERIFY = "skip"
process.env.PAYPAL_PLAN_MONTHLY = "P-TEST-MONTHLY"
process.env.PAYPAL_PLAN_YEARLY = "P-TEST-YEARLY"
process.env.PAYPAL_PLAN_BASIC_MONTHLY = "P-TEST-MONTHLY"
process.env.PAYPAL_PLAN_BASIC_YEARLY = "P-TEST-YEARLY"
process.env.PAYPAL_PLAN_PREMIUM_MONTHLY = "P-TEST-PREMIUM-MONTHLY"
process.env.PAYPAL_PLAN_PREMIUM_YEARLY = "P-TEST-PREMIUM-YEARLY"

mkdirSync("./data", { recursive: true })
try {
  rmSync("./data/test.db")
} catch {
  // first run
}
