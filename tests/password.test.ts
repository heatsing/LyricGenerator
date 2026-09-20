import { describe, expect, it } from "vitest"
import { hashPassword, validateEmail, validatePassword, verifyPassword } from "@/lib/password"

describe("password helpers", () => {
  it("rejects short passwords and invalid emails", () => {
    expect(validatePassword("123")).toBeTruthy()
    expect(validateEmail("not-an-email")).toBeNull()
    expect(validateEmail("  Owner@Example.com ")).toBe("owner@example.com")
  })

  it("hashes and verifies passwords", async () => {
    const hash = await hashPassword("correct-horse")
    expect(hash).not.toContain("correct-horse")
    expect(await verifyPassword("correct-horse", hash)).toBe(true)
    expect(await verifyPassword("wrong", hash)).toBe(false)
  })
})
