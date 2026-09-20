import { eq } from "drizzle-orm"
import { newId } from "./crypto"
import { ensureMigrated, getDb, getTables } from "./db"
import { mapPaypalStatus } from "./entitlements"
import {
  approvalUrlFrom,
  getPaypalSubscription,
  periodEndFrom,
  type PaypalSubscription,
} from "./paypal"
import { isPaidPlan, type PaidPlanId, type PlanId } from "./plans"
import { findUserById, updateUserEntitlement } from "./users"

const PAYPAL_PLAN_ENV: Array<[PaidPlanId, string]> = [
  ["basic_monthly", "PAYPAL_PLAN_BASIC_MONTHLY"],
  ["basic_yearly", "PAYPAL_PLAN_BASIC_YEARLY"],
  ["premium_monthly", "PAYPAL_PLAN_PREMIUM_MONTHLY"],
  ["premium_yearly", "PAYPAL_PLAN_PREMIUM_YEARLY"],
  ["basic_monthly", "PAYPAL_LIVE_PLAN_BASIC_MONTHLY"],
  ["basic_yearly", "PAYPAL_LIVE_PLAN_BASIC_YEARLY"],
  ["premium_monthly", "PAYPAL_LIVE_PLAN_PREMIUM_MONTHLY"],
  ["premium_yearly", "PAYPAL_LIVE_PLAN_PREMIUM_YEARLY"],
  ["basic_monthly", "PAYPAL_SANDBOX_PLAN_BASIC_MONTHLY"],
  ["basic_yearly", "PAYPAL_SANDBOX_PLAN_BASIC_YEARLY"],
  ["premium_monthly", "PAYPAL_SANDBOX_PLAN_PREMIUM_MONTHLY"],
  ["premium_yearly", "PAYPAL_SANDBOX_PLAN_PREMIUM_YEARLY"],
  ["basic_monthly", "PAYPAL_PLAN_MONTHLY"],
  ["basic_yearly", "PAYPAL_PLAN_YEARLY"],
]

export function planFromPaypalPlanId(paypalPlanId?: string | null): PaidPlanId {
  if (paypalPlanId) {
    for (const [planId, envKey] of PAYPAL_PLAN_ENV) {
      if (process.env[envKey] === paypalPlanId) return planId
    }
  }
  return "basic_monthly"
}

export async function upsertSubscriptionFromPaypal(input: {
  userId: string
  paypal: PaypalSubscription
  planId?: PaidPlanId
  approvalUrl?: string | null
}) {
  await ensureMigrated()
  const { subscriptions } = getTables()
  const db = getDb()
  const now = Date.now()
  const planId = input.planId || planFromPaypalPlanId(input.paypal.plan_id)
  const entitlementStatus = mapPaypalStatus(input.paypal.status)
  const periodStart = input.paypal.start_time ? Date.parse(input.paypal.start_time) || now : now
  const periodEnd = periodEndFrom(input.paypal, planId, now)

  const [existing] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.paypalSubscriptionId, input.paypal.id))
    .limit(1)

  const values = {
    userId: input.userId,
    paypalSubscriptionId: input.paypal.id,
    paypalPayerId: input.paypal.subscriber?.payer_id ?? null,
    paypalPlanId: input.paypal.plan_id ?? null,
    planId,
    status: input.paypal.status,
    approvalUrl: input.approvalUrl ?? approvalUrlFrom(input.paypal) ?? existing?.approvalUrl ?? null,
    currentPeriodStart: periodStart,
    currentPeriodEnd: periodEnd,
    cancelAtPeriodEnd: entitlementStatus === "canceled" ? 1 : 0,
    updatedAt: now,
  }

  if (existing) {
    await db.update(subscriptions).set(values).where(eq(subscriptions.id, existing.id))
  } else {
    await db.insert(subscriptions).values({ id: newId(), createdAt: now, ...values })
  }

  await updateUserEntitlement(input.userId, {
    plan: entitlementStatus === "free" ? "free" : planId,
    entitlementStatus: entitlementStatus === "free" && input.paypal.status === "APPROVAL_PENDING" ? "free" : entitlementStatus,
  })

  return values
}

export async function recordPayment(input: {
  userId: string
  subscriptionId?: string | null
  paypalSaleId?: string | null
  amount?: string | null
  currency?: string | null
  status: string
}) {
  await ensureMigrated()
  const { payments } = getTables()
  if (input.paypalSaleId) {
    const [dup] = await getDb().select().from(payments).where(eq(payments.paypalSaleId, input.paypalSaleId)).limit(1)
    if (dup) return dup
  }
  const row = {
    id: newId(),
    userId: input.userId,
    subscriptionId: input.subscriptionId ?? null,
    paypalSaleId: input.paypalSaleId ?? null,
    amount: input.amount ?? null,
    currency: input.currency ?? null,
    status: input.status,
    createdAt: Date.now(),
  }
  await getDb().insert(payments).values(row)
  return row
}

export async function claimWebhookEvent(id: string, eventType: string, payload: unknown) {
  await ensureMigrated()
  const { webhookEvents } = getTables()
  try {
    await getDb().insert(webhookEvents).values({
      id,
      eventType,
      payloadJson: JSON.stringify(payload),
      processedAt: Date.now(),
    })
    return { duplicate: false }
  } catch {
    return { duplicate: true }
  }
}

function resourceUserId(resource: Record<string, unknown>) {
  return typeof resource.custom_id === "string" ? resource.custom_id : null
}

export async function handlePaypalWebhookEvent(event: {
  id: string
  event_type: string
  resource: Record<string, unknown>
}) {
  const claimed = await claimWebhookEvent(event.id, event.event_type, event)
  if (claimed.duplicate) {
    return { ok: true, duplicate: true }
  }

  const resource = event.resource || {}
  const subscriptionId =
    (typeof resource.id === "string" && String(event.event_type).includes("SUBSCRIPTION") && resource.id) ||
    (typeof resource.billing_agreement_id === "string" && resource.billing_agreement_id) ||
    null

  if (subscriptionId) {
    let paypal: PaypalSubscription
    try {
      paypal = await getPaypalSubscription(subscriptionId)
    } catch {
      paypal = {
        id: subscriptionId,
        status: typeof resource.status === "string" ? resource.status : "ACTIVE",
        plan_id: typeof resource.plan_id === "string" ? resource.plan_id : undefined,
        custom_id: resourceUserId(resource) ?? undefined,
        subscriber: {
          payer_id: typeof resource.subscriber === "object" && resource.subscriber && "payer_id" in resource.subscriber
            ? String((resource.subscriber as { payer_id?: string }).payer_id || "")
            : undefined,
        },
      }
    }

    const userId = paypal.custom_id || resourceUserId(resource)
    if (userId && (await findUserById(userId))) {
      if (event.event_type === "BILLING.SUBSCRIPTION.PAYMENT.FAILED") {
        await upsertSubscriptionFromPaypal({ userId, paypal: { ...paypal, status: "SUSPENDED" } })
        await updateUserEntitlement(userId, {
          plan: planFromPaypalPlanId(paypal.plan_id),
          entitlementStatus: "past_due",
        })
      } else if (event.event_type === "BILLING.SUBSCRIPTION.CANCELLED") {
        await upsertSubscriptionFromPaypal({ userId, paypal: { ...paypal, status: "CANCELLED" } })
      } else if (event.event_type === "BILLING.SUBSCRIPTION.SUSPENDED") {
        await upsertSubscriptionFromPaypal({ userId, paypal: { ...paypal, status: "SUSPENDED" } })
        await updateUserEntitlement(userId, {
          plan: planFromPaypalPlanId(paypal.plan_id),
          entitlementStatus: "suspended",
        })
      } else if (event.event_type === "BILLING.SUBSCRIPTION.EXPIRED") {
        await upsertSubscriptionFromPaypal({ userId, paypal: { ...paypal, status: "EXPIRED" } })
        await updateUserEntitlement(userId, { plan: "free", entitlementStatus: "expired" })
      } else {
        await upsertSubscriptionFromPaypal({ userId, paypal })
      }
    }
  }

  if (event.event_type === "PAYMENT.SALE.COMPLETED" || event.event_type === "PAYMENT.SALE.DENIED") {
    const userId = resourceUserId(resource)
    const saleId = typeof resource.id === "string" ? resource.id : null
    const amountObj = resource.amount as { total?: string; currency?: string } | undefined
    if (userId) {
      await recordPayment({
        userId,
        subscriptionId,
        paypalSaleId: saleId,
        amount: amountObj?.total ?? null,
        currency: amountObj?.currency ?? null,
        status: event.event_type === "PAYMENT.SALE.COMPLETED" ? "completed" : "failed",
      })
      if (event.event_type === "PAYMENT.SALE.DENIED") {
        await updateUserEntitlement(userId, {
          plan: (await findUserById(userId))?.plan as PlanId | undefined,
          entitlementStatus: "past_due",
        })
      } else if (subscriptionId) {
        const user = await findUserById(userId)
        if (user && isPaidPlan(user.plan)) {
          await updateUserEntitlement(userId, { plan: user.plan, entitlementStatus: "active" })
        }
      }
    }
  }

  return { ok: true, duplicate: false }
}
