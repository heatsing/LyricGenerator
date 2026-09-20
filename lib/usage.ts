import { and, eq, gte, or, sql } from "drizzle-orm"
import { hashIp, newId } from "./crypto"
import { ensureMigrated, getDb, getTables } from "./db"
import { ANONYMOUS_DAILY_LIMIT } from "./plans"
import type { EntitlementSnapshot } from "./entitlements"

function dayStart(now = Date.now()) {
  const date = new Date(now)
  date.setUTCHours(0, 0, 0, 0)
  return date.getTime()
}

export function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]!.trim()
  return req.headers.get("x-real-ip") || "unknown"
}

export async function countTodayUsage(userId: string | null, ip: string) {
  await ensureMigrated()
  const start = dayStart()
  const ipHash = hashIp(ip)
  const { usageEvents } = getTables()
  const rows = await getDb()
    .select({ count: sql<number>`count(*)` })
    .from(usageEvents)
    .where(
      and(
        gte(usageEvents.createdAt, start),
        userId ? or(eq(usageEvents.userId, userId), eq(usageEvents.ipHash, ipHash)) : eq(usageEvents.ipHash, ipHash),
      ),
    )
  return Number(rows[0]?.count || 0)
}

export async function recordUsage(userId: string | null, ip: string, action: string) {
  await ensureMigrated()
  const { usageEvents } = getTables()
  await getDb().insert(usageEvents).values({
    id: newId(),
    userId,
    ipHash: hashIp(ip),
    action,
    createdAt: Date.now(),
  })
}

export async function assertGenerationQuota(opts: {
  userId: string | null
  ip: string
  entitlements: EntitlementSnapshot
}) {
  if (opts.entitlements.isPaid) {
    return { allowed: true as const, remaining: null as number | null, limit: null as number | null }
  }
  const limit = opts.userId ? opts.entitlements.dailyGenerationLimit ?? 50 : ANONYMOUS_DAILY_LIMIT
  const used = await countTodayUsage(opts.userId, opts.ip)
  if (used >= limit) {
    return { allowed: false as const, remaining: 0, limit }
  }
  return { allowed: true as const, remaining: limit - used - 1, limit }
}
