import { getSessionUser, unauthorized } from "@/lib/session"
import { listGenerations } from "@/lib/users"

export async function GET() {
  const session = await getSessionUser()
  if (!session) return unauthorized()
  const items = await listGenerations(session.user.id, session.entitlements.historyLimit ?? 50)
  return Response.json({ items })
}
