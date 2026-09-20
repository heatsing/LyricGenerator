import { beforeAll, describe, expect, it, vi } from "vitest"

vi.mock("@/lib/paypal", async () => {
  const actual = await vi.importActual<typeof import("@/lib/paypal")>("@/lib/paypal")
  return {
    ...actual,
    getPaypalSubscription: vi.fn(async (id: string) => ({
      id,
      status: "ACTIVE",
      custom_id: process.env.TEST_USER_ID,
      plan_id: process.env.PAYPAL_PLAN_MONTHLY,
      start_time: new Date().toISOString(),
      billing_info: { next_billing_time: new Date(Date.now() + 30 * 86400000).toISOString() },
    })),
  }
})

describe("PayPal webhook lifecycle", () => {
  beforeAll(async () => {
    const { migrate } = await import("@/lib/db/migrate")
    await migrate()
  })

  it("activates a user, ignores duplicate events, and honors cancel", async () => {
    const { createUser, findUserById, getUserEntitlements } = await import("@/lib/users")
    const { handlePaypalWebhookEvent } = await import("@/lib/billing")
    const user = await createUser({ email: `owner-${Date.now()}@example.com`, password: "password12" })
    process.env.TEST_USER_ID = user.id

    const first = await handlePaypalWebhookEvent({
      id: "WH-1",
      event_type: "BILLING.SUBSCRIPTION.ACTIVATED",
      resource: { id: "I-SUB-1", custom_id: user.id, status: "ACTIVE", plan_id: process.env.PAYPAL_PLAN_MONTHLY },
    })
    expect(first.duplicate).toBe(false)

    const replay = await handlePaypalWebhookEvent({
      id: "WH-1",
      event_type: "BILLING.SUBSCRIPTION.ACTIVATED",
      resource: { id: "I-SUB-1", custom_id: user.id, status: "ACTIVE" },
    })
    expect(replay.duplicate).toBe(true)

    const paid = await findUserById(user.id)
    const entitlements = await getUserEntitlements(paid)
    expect(entitlements.isPaid).toBe(true)
    expect(entitlements.lyricsToSong).toBe(true)

    await handlePaypalWebhookEvent({
      id: "WH-2",
      event_type: "BILLING.SUBSCRIPTION.CANCELLED",
      resource: { id: "I-SUB-1", custom_id: user.id, status: "CANCELLED" },
    })
    const canceled = await findUserById(user.id)
    expect(canceled?.entitlementStatus).toBe("canceled")
    const stillPaid = await getUserEntitlements(canceled)
    expect(stillPaid.isPaid).toBe(true)
  })
})
