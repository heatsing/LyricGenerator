import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { consumeAuthToken } from "@/lib/users"
import { getDb } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { hashPassword, validatePassword } from "@/lib/password"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const token = String(body.token || "")
    const password = String(body.password || "")
    const passwordError = validatePassword(password)
    if (!token) return NextResponse.json({ error: "Reset token is required." }, { status: 400 })
    if (passwordError) return NextResponse.json({ error: passwordError }, { status: 400 })

    const row = await consumeAuthToken(token, "password_reset")
    if (!row) return NextResponse.json({ error: "This reset link is invalid or expired." }, { status: 400 })

    await getDb()
      .update(users)
      .set({ passwordHash: await hashPassword(password), updatedAt: Date.now() })
      .where(eq(users.id, row.userId))

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("reset-password failed", error)
    return NextResponse.json({ error: "Password reset failed." }, { status: 500 })
  }
}
