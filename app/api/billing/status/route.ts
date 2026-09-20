import { getSessionUser, unauthorized } from "@/lib/session"
import { latestSubscription } from "@/lib/users"
import { getPaypalSubscription, paypalConfigured } from "@/lib/paypal"
import { planFromPaypalPlanId, upsertSubscriptionFromPaypal } from "@/lib/billing"
import { parsePaidPlanId } from "@/lib/plans"

export async function GET() {
  const session = await getSessionUser()
  if (!session) return unauthorized()
  const sub = await latestSubscription(session.user.id)

  if (sub?.paypalSubscriptionId && paypalConfigured() && !session.entitlements.isPaid) {
    try {
      const paypal = await getPaypalSubscription(sub.paypalSubscriptionId)
      await upsertSubscriptionFromPaypal({
        userId: session.user.id,
        paypal,
        planId: parsePaidPlanId(sub.planId) ?? planFromPaypalPlanId(sub.paypalPlanId),
      })
    } catch (error) {
      console.error("billing status sync failed", error)
    }
  }

  const refreshed = await getSessionUser()
  return Response.json({
    entitlements: refreshed?.entitlements ?? session.entitlements,
    subscription: await latestSubscription(session.user.id),
  })
}
