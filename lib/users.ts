import { and, desc, eq, gt, isNull } from "drizzle-orm"
import { ensureMigrated, getDb } from "./db"
import { authTokens, generations, subscriptions, users } from "./db/schema"
import { newId, newToken, sha256 } from "./crypto"
import { hashPassword } from "./password"
import { resolveEntitlements, type EntitlementSnapshot } from "./entitlements"
import type { EntitlementStatus, PlanId } from "./plans"

export type UserRow = typeof users.$inferSelect
export type SubscriptionRow = typeof subscriptions.$inferSelect

export async function findUserByEmail(email: string) {
  await ensureMigrated()
  const db = getDb()
  const [row] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  return row ?? null
}

export async function findUserById(id: string) {
  await ensureMigrated()
  const db = getDb()
  const [row] = await db.select().from(users).where(eq(users.id, id)).limit(1)
  return row ?? null
}

export async function createUser(input: {
  email: string
  name?: string | null
  image?: string | null
  password?: string
  emailVerifiedAt?: number | null
}) {
  await ensureMigrated()
  const db = getDb()
  const now = Date.now()
  const row = {
    id: newId(),
    email: input.email,
    name: input.name ?? null,
    image: input.image ?? null,
    passwordHash: input.password ? await hashPassword(input.password) : null,
    emailVerifiedAt: input.emailVerifiedAt ?? null,
    accountStatus: "active",
    plan: "free",
    entitlementStatus: "free",
    createdAt: now,
    updatedAt: now,
  }
  await db.insert(users).values(row)
  return row
}

export async function upsertGoogleUser(input: { email: string; name?: string | null; image?: string | null }) {
  const existing = await findUserByEmail(input.email)
  const now = Date.now()
  if (existing) {
    await getDb()
      .update(users)
      .set({
        name: input.name ?? existing.name,
        image: input.image ?? existing.image,
        emailVerifiedAt: existing.emailVerifiedAt ?? now,
        updatedAt: now,
      })
      .where(eq(users.id, existing.id))
    return (await findUserById(existing.id))!
  }
  return createUser({
    email: input.email,
    name: input.name,
    image: input.image,
    emailVerifiedAt: now,
  })
}

export async function latestSubscription(userId: string) {
  await ensureMigrated()
  const [row] = await getDb()
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .orderBy(desc(subscriptions.updatedAt))
    .limit(1)
  return row ?? null
}

export async function getUserEntitlements(user: UserRow | null): Promise<EntitlementSnapshot> {
  if (!user) return resolveEntitlements(null)
  const sub = await latestSubscription(user.id)
  return resolveEntitlements({
    plan: user.plan,
    entitlementStatus: user.entitlementStatus,
    currentPeriodEnd: sub?.currentPeriodEnd ?? null,
    updatedAt: user.updatedAt,
  })
}

export async function updateUserEntitlement(
  userId: string,
  patch: {
    plan?: PlanId
    entitlementStatus?: EntitlementStatus
  },
) {
  await ensureMigrated()
  await getDb()
    .update(users)
    .set({
      ...patch,
      updatedAt: Date.now(),
    })
    .where(eq(users.id, userId))
}

export async function createAuthToken(userId: string, type: "email_verify" | "password_reset", ttlMs: number) {
  await ensureMigrated()
  const token = newToken()
  const now = Date.now()
  await getDb().insert(authTokens).values({
    id: newId(),
    userId,
    type,
    tokenHash: sha256(token),
    expiresAt: now + ttlMs,
    usedAt: null,
    createdAt: now,
  })
  return token
}

export async function consumeAuthToken(token: string, type: "email_verify" | "password_reset") {
  await ensureMigrated()
  const db = getDb()
  const now = Date.now()
  const [row] = await db
    .select()
    .from(authTokens)
    .where(and(eq(authTokens.tokenHash, sha256(token)), eq(authTokens.type, type), isNull(authTokens.usedAt), gt(authTokens.expiresAt, now)))
    .limit(1)
  if (!row) return null
  await db.update(authTokens).set({ usedAt: now }).where(eq(authTokens.id, row.id))
  return row
}

export async function saveGeneration(userId: string, type: string, input: unknown, output: string, historyLimit: number | null) {
  await ensureMigrated()
  const db = getDb()
  await db.insert(generations).values({
    id: newId(),
    userId,
    type,
    inputJson: JSON.stringify(input ?? {}),
    output,
    createdAt: Date.now(),
  })
  if (historyLimit !== null) {
    const rows = await db
      .select({ id: generations.id })
      .from(generations)
      .where(eq(generations.userId, userId))
      .orderBy(desc(generations.createdAt))
    const extra = rows.slice(historyLimit)
    for (const row of extra) {
      await db.delete(generations).where(eq(generations.id, row.id))
    }
  }
}

export async function listGenerations(userId: string, limit = 20) {
  await ensureMigrated()
  return getDb()
    .select()
    .from(generations)
    .where(eq(generations.userId, userId))
    .orderBy(desc(generations.createdAt))
    .limit(limit)
}
