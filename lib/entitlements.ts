import { ANONYMOUS_DAILY_LIMIT, PAST_DUE_GRACE_MS, PLANS, isPaidPlan, type EntitlementStatus, type PlanId } from "./plans"

export type EntitlementSnapshot = {
  plan: PlanId
  entitlementStatus: EntitlementStatus
  isPaid: boolean
  dailyGenerationLimit: number | null
  historyLimit: number | null
  lyricsToSong: boolean
  commercialUse: boolean
  variations: number
  currentPeriodEnd: number | null
}

export type EntitlementInput = {
  plan?: string | null
  entitlementStatus?: string | null
  currentPeriodEnd?: number | null
  updatedAt?: number | null
}

export function resolveEntitlements(input: EntitlementInput | null | undefined, now = Date.now()): EntitlementSnapshot {
  if (!input) {
    return {
      plan: "free",
      entitlementStatus: "free",
      isPaid: false,
      dailyGenerationLimit: ANONYMOUS_DAILY_LIMIT,
      historyLimit: 0,
      lyricsToSong: false,
      commercialUse: false,
      variations: 1,
      currentPeriodEnd: null,
    }
  }

  const plan = (isPaidPlan(input.plan) ? input.plan : "free") as PlanId
  const status = (input.entitlementStatus || "free") as EntitlementStatus
  const periodEnd = input.currentPeriodEnd ?? null
  const updatedAt = input.updatedAt ?? now
  const periodValid = typeof periodEnd === "number" && periodEnd > now
  const pastDueGrace = status === "past_due" && now - updatedAt < PAST_DUE_GRACE_MS

  const isPaid =
    isPaidPlan(plan) &&
    (status === "active" || (status === "canceled" && periodValid) || (status === "past_due" && (periodValid || pastDueGrace)))

  if (!isPaid) {
    const free = PLANS.free
    return {
      plan: status === "free" ? "free" : plan,
      entitlementStatus: status === "active" && !periodValid ? "expired" : status === "free" ? "free" : status,
      isPaid: false,
      dailyGenerationLimit: free.dailyGenerationLimit,
      historyLimit: free.historyLimit,
      lyricsToSong: false,
      commercialUse: false,
      variations: 1,
      currentPeriodEnd: periodEnd,
    }
  }

  const paid = PLANS[plan]
  return {
    plan,
    entitlementStatus: status,
    isPaid: true,
    dailyGenerationLimit: paid.dailyGenerationLimit,
    historyLimit: paid.historyLimit,
    lyricsToSong: paid.lyricsToSong,
    commercialUse: paid.commercialUse,
    variations: paid.variations,
    currentPeriodEnd: periodEnd,
  }
}

export function mapPaypalStatus(paypalStatus: string): EntitlementStatus {
  switch (paypalStatus.toUpperCase()) {
    case "ACTIVE":
    case "APPROVED":
      return "active"
    case "SUSPENDED":
      return "suspended"
    case "CANCELLED":
    case "CANCELED":
      return "canceled"
    case "EXPIRED":
      return "expired"
    default:
      return "free"
  }
}
