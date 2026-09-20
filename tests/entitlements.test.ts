import { describe, expect, it } from "vitest"
import { resolveEntitlements } from "@/lib/entitlements"

describe("resolveEntitlements", () => {
  it("treats guests as free with the anonymous cap", () => {
    const result = resolveEntitlements(null)
    expect(result.isPaid).toBe(false)
    expect(result.lyricsToSong).toBe(false)
    expect(result.commercialUse).toBe(false)
    expect(result.dailyGenerationLimit).toBe(10)
  })

  it("keeps Basic after cancel until the period ends", () => {
    const result = resolveEntitlements({
      plan: "basic_monthly",
      entitlementStatus: "canceled",
      currentPeriodEnd: Date.now() + 86_400_000,
      updatedAt: Date.now(),
    })
    expect(result.isPaid).toBe(true)
    expect(result.lyricsToSong).toBe(true)
    expect(result.commercialUse).toBe(false)
    expect(result.dailyGenerationLimit).toBe(40)
  })

  it("gives commercial rights only on yearly plans", () => {
    const yearly = resolveEntitlements({
      plan: "premium_yearly",
      entitlementStatus: "active",
      currentPeriodEnd: Date.now() + 86_400_000,
      updatedAt: Date.now(),
    })
    expect(yearly.isPaid).toBe(true)
    expect(yearly.commercialUse).toBe(true)
    expect(yearly.dailyGenerationLimit).toBe(120)
  })

  it("expires paid access after the period ends", () => {
    const result = resolveEntitlements({
      plan: "basic_monthly",
      entitlementStatus: "canceled",
      currentPeriodEnd: Date.now() - 1000,
      updatedAt: Date.now() - 1000,
    })
    expect(result.isPaid).toBe(false)
    expect(result.lyricsToSong).toBe(false)
  })

  it("keeps past_due access during the grace window", () => {
    const result = resolveEntitlements({
      plan: "premium_yearly",
      entitlementStatus: "past_due",
      currentPeriodEnd: Date.now() + 1000,
      updatedAt: Date.now(),
    })
    expect(result.isPaid).toBe(true)
  })
})
