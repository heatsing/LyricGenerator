export const PLAN_IDS = [
  "free",
  "basic_monthly",
  "basic_yearly",
  "premium_monthly",
  "premium_yearly",
] as const
export type PlanId = (typeof PLAN_IDS)[number]
export type PaidPlanId = Exclude<PlanId, "free">

export const ENTITLEMENT_STATUSES = [
  "free",
  "active",
  "past_due",
  "canceled",
  "expired",
  "suspended",
] as const
export type EntitlementStatus = (typeof ENTITLEMENT_STATUSES)[number]

export const ACCOUNT_STATUSES = ["active", "disabled"] as const
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number]

export type PaypalPlanEnvKey =
  | "PAYPAL_PLAN_BASIC_MONTHLY"
  | "PAYPAL_PLAN_BASIC_YEARLY"
  | "PAYPAL_PLAN_PREMIUM_MONTHLY"
  | "PAYPAL_PLAN_PREMIUM_YEARLY"

export type PlanDefinition = {
  id: PlanId
  name: string
  tagline: string
  priceUsd: number
  interval: "month" | "year" | null
  paypalEnvKey?: PaypalPlanEnvKey
  dailyGenerationLimit: number | null
  historyLimit: number | null
  lyricsToSong: boolean
  commercialUse: boolean
  variations: number
  deviceLimit: number
}

export const PLANS: Record<PlanId, PlanDefinition> = {
  free: {
    id: "free",
    name: "Free",
    tagline: "Free to use",
    priceUsd: 0,
    interval: null,
    dailyGenerationLimit: 10,
    historyLimit: 10,
    lyricsToSong: false,
    commercialUse: false,
    variations: 1,
    deviceLimit: 1,
  },
  basic_monthly: {
    id: "basic_monthly",
    name: "Basic",
    tagline: "Perfect for individual creators",
    priceUsd: 9.7,
    interval: "month",
    paypalEnvKey: "PAYPAL_PLAN_BASIC_MONTHLY",
    dailyGenerationLimit: 40,
    historyLimit: 90,
    lyricsToSong: true,
    commercialUse: false,
    variations: 1,
    deviceLimit: 1,
  },
  basic_yearly: {
    id: "basic_yearly",
    name: "Basic",
    tagline: "Perfect for individual creators",
    priceUsd: 58.2,
    interval: "year",
    paypalEnvKey: "PAYPAL_PLAN_BASIC_YEARLY",
    dailyGenerationLimit: 40,
    historyLimit: 90,
    lyricsToSong: true,
    commercialUse: true,
    variations: 1,
    deviceLimit: 1,
  },
  premium_monthly: {
    id: "premium_monthly",
    name: "Premium",
    tagline: "Best for professionals and teams",
    priceUsd: 16,
    interval: "month",
    paypalEnvKey: "PAYPAL_PLAN_PREMIUM_MONTHLY",
    dailyGenerationLimit: 120,
    historyLimit: null,
    lyricsToSong: true,
    commercialUse: false,
    variations: 3,
    deviceLimit: 3,
  },
  premium_yearly: {
    id: "premium_yearly",
    name: "Premium",
    tagline: "Best for professionals and teams",
    priceUsd: 96,
    interval: "year",
    paypalEnvKey: "PAYPAL_PLAN_PREMIUM_YEARLY",
    dailyGenerationLimit: 120,
    historyLimit: null,
    lyricsToSong: true,
    commercialUse: true,
    variations: 3,
    deviceLimit: 3,
  },
}

export const ANONYMOUS_DAILY_LIMIT = 10
export const PAST_DUE_GRACE_MS = 3 * 24 * 60 * 60 * 1000

export const PAID_PLAN_IDS: PaidPlanId[] = [
  "basic_monthly",
  "basic_yearly",
  "premium_monthly",
  "premium_yearly",
]

export function isPaidPlan(plan: string | null | undefined): plan is PaidPlanId {
  return PAID_PLAN_IDS.includes(plan as PaidPlanId)
}

export function isYearlyPlan(plan: string | null | undefined) {
  return plan === "basic_yearly" || plan === "premium_yearly"
}

export function paypalPlanEnv(planId: PaidPlanId): string | undefined {
  const key = PLANS[planId].paypalEnvKey
  if (!key) return undefined
  const live = process.env.PAYPAL_MODE === "live"
  const prefixed = live ? `PAYPAL_LIVE_${key.replace(/^PAYPAL_/, "")}` : `PAYPAL_SANDBOX_${key.replace(/^PAYPAL_/, "")}`
  return process.env[prefixed] || process.env[key]
}

export function parsePaidPlanId(value: unknown): PaidPlanId | null {
  return isPaidPlan(String(value || "")) ? (value as PaidPlanId) : null
}
