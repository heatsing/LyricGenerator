import { forbidden, getSessionUser, unauthorized } from "@/lib/session"
import { latestSubscription } from "@/lib/users"

export async function GET() {
  const session = await getSessionUser()
  if (!session) return unauthorized()
  const subscription = await latestSubscription(session.user.id)
  return Response.json({
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
      createdAt: session.user.createdAt,
      accountStatus: session.user.accountStatus,
      plan: session.user.plan,
      entitlementStatus: session.user.entitlementStatus,
      emailVerifiedAt: session.user.emailVerifiedAt,
    },
    entitlements: session.entitlements,
    subscription: subscription
      ? {
          id: subscription.id,
          paypalSubscriptionId: subscription.paypalSubscriptionId,
          planId: subscription.planId,
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd,
          cancelAtPeriodEnd: Boolean(subscription.cancelAtPeriodEnd),
        }
      : null,
  })
}

export async function POST() {
  return forbidden("Use GET")
}
