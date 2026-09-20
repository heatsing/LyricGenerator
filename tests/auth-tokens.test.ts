import { beforeAll, describe, expect, it } from "vitest"

describe("auth tokens", () => {
  beforeAll(async () => {
    const { migrate } = await import("@/lib/db/migrate")
    await migrate()
  })

  it("creates and consumes a one-time reset token", async () => {
    const { consumeAuthToken, createAuthToken, createUser } = await import("@/lib/users")
    const user = await createUser({ email: `reset-${Date.now()}@example.com`, password: "password12" })
    const token = await createAuthToken(user.id, "password_reset", 60_000)
    const first = await consumeAuthToken(token, "password_reset")
    const second = await consumeAuthToken(token, "password_reset")
    expect(first?.userId).toBe(user.id)
    expect(second).toBeNull()
  })
})
