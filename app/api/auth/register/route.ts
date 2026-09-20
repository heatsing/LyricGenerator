import { NextResponse } from "next/server"
import { createAuthToken, createUser, findUserByEmail } from "@/lib/users"
import { sendVerificationEmail } from "@/lib/email"
import { validateEmail, validatePassword } from "@/lib/password"
import { hashIp } from "@/lib/crypto"

const recent = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000
  const key = hashIp(ip)
  const times = (recent.get(key) || []).filter((t) => now - t < windowMs)
  if (times.length >= 8) {
    recent.set(key, times)
    return true
  }
  times.push(now)
  recent.set(key, times)
  return false
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many registration attempts. Try later." }, { status: 429 })
    }

    const body = await req.json()
    const email = validateEmail(String(body.email || ""))
    const password = String(body.password || "")
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : ""
    const passwordError = validatePassword(password)

    if (!email) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 })
    if (passwordError) return NextResponse.json({ error: passwordError }, { status: 400 })

    const existing = await findUserByEmail(email)
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 })
    }

    const user = await createUser({ email, password, name: name || email.split("@")[0] })
    const token = await createAuthToken(user.id, "email_verify", 24 * 60 * 60 * 1000)
    try {
      await sendVerificationEmail(email, token)
    } catch (error) {
      console.error("verify email send failed", error)
    }

    return NextResponse.json({ ok: true, userId: user.id })
  } catch (error) {
    console.error("register failed", error)
    return NextResponse.json({ error: "Registration failed." }, { status: 500 })
  }
}
