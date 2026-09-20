import { getServerSession } from "next-auth"
import { authOptions } from "@/auth.config"
import { findUserById, getUserEntitlements } from "./users"

export async function getSessionUser() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) return null
  const user = await findUserById(userId)
  if (!user || user.accountStatus !== "active") return null
  const entitlements = await getUserEntitlements(user)
  return { user, entitlements, session }
}

export function unauthorized(message = "Sign in required") {
  return Response.json({ error: message, code: "UNAUTHENTICATED" }, { status: 401 })
}

export function forbidden(message = "Paid plan required") {
  return Response.json({ error: message, code: "PAYMENT_REQUIRED" }, { status: 402 })
}

export function tooMany(message: string, limit: number) {
  return Response.json({ error: message, code: "RATE_LIMITED", limit }, { status: 429 })
}
