import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { consumeAuthToken } from "@/lib/users"
import { getDb } from "@/lib/db"
import { users } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const token = String(body.token || "")
    if (!token) return NextResponse.json({ error: "Token is required." }, { status: 400 })
    const row = await consumeAuthToken(token, "email_verify")
    if (!row) return NextResponse.json({ error: "This verification link is invalid or expired." }, { status: 400 })
    await getDb().update(users).set({ emailVerifiedAt: Date.now(), updatedAt: Date.now() }).where(eq(users.id, row.userId))
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("verify-email failed", error)
    return NextResponse.json({ error: "Verification failed." }, { status: 500 })
  }
}
