import { getSessionUser, unauthorized } from "@/lib/session"
import { latestSubscription, updateUserEntitlement } from "@/lib/users"
import { cancelPaypalSubscription, getPaypalSubscription, paypalConfigured } from "@/lib/paypal"
import { planFromPaypalPlanId, upsertSubscriptionFromPaypal } from "@/lib/billing"
import { parsePaidPlanId } from "@/lib/plans"

export async function POST() {
  const session = await getSessionUser()
  if (!session) return unauthorized()
  const sub = await latestSubscription(session.user.id)
  if (!sub?.paypalSubscriptionId) {
    return Response.json({ error: "No subscription to cancel." }, { status: 400 })
  }
  if (!paypalConfigured()) {
    return Response.json({ error: "PayPal is not configured." }, { status: 503 })
  }

  try {
    await cancelPaypalSubscription(sub.paypalSubscriptionId)
  } catch (error) {
    const status = (error as Error & { status?: number }).status
    if (status !== 204 && status !== 422) {
      console.error("paypal cancel failed", error)
    }
  }

  try {
    const paypal = await getPaypalSubscription(sub.paypalSubscriptionId)
    await upsertSubscriptionFromPaypal({
      userId: session.user.id,
      paypal: { ...paypal, status: paypal.status || "CANCELLED" },
      planId: parsePaidPlanId(sub.planId) ?? planFromPaypalPlanId(sub.paypalPlanId),
    })
  } catch {
    await updateUserEntitlement(session.user.id, {
      plan: parsePaidPlanId(sub.planId) ?? planFromPaypalPlanId(sub.paypalPlanId),
      entitlementStatus: "canceled",
    })
  }

  return Response.json({ ok: true })
}
