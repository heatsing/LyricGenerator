import { NextResponse } from "next/server"
import { createAuthToken, findUserByEmail } from "@/lib/users"
import { sendPasswordResetEmail } from "@/lib/email"
import { validateEmail } from "@/lib/password"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = validateEmail(String(body.email || ""))
    if (!email) {
      return NextResponse.json({ ok: true })
    }
    const user = await findUserByEmail(email)
    if (user?.passwordHash && user.accountStatus === "active") {
      const token = await createAuthToken(user.id, "password_reset", 60 * 60 * 1000)
      try {
        await sendPasswordResetEmail(email, token)
      } catch (error) {
        console.error("reset email send failed", error)
      }
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("forgot-password failed", error)
    return NextResponse.json({ ok: true })
  }
}
