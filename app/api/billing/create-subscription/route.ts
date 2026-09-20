import { and, eq, gt } from "drizzle-orm"
import { getSessionUser, unauthorized } from "@/lib/session"
import { getDb } from "@/lib/db"
import { subscriptions } from "@/lib/db/schema"
import { approvalUrlFrom, createPaypalSubscription, paypalConfigured } from "@/lib/paypal"
import { upsertSubscriptionFromPaypal } from "@/lib/billing"
import { parsePaidPlanId } from "@/lib/plans"

export async function POST(req: Request) {
  const session = await getSessionUser()
  if (!session) return unauthorized()
  if (session.user.accountStatus !== "active") {
    return Response.json({ error: "Account is disabled." }, { status: 403 })
  }
  if (!paypalConfigured()) {
    return Response.json({ error: "PayPal is not configured.", code: "PAYPAL_NOT_CONFIGURED" }, { status: 503 })
  }

  const body = await req.json().catch(() => ({}))
  const planId = parsePaidPlanId(body.plan)
  if (!planId) return Response.json({ error: "Choose a valid plan." }, { status: 400 })

  if (session.entitlements.isPaid && session.user.plan === planId) {
    return Response.json({ error: "You already have this plan.", code: "ALREADY_SUBSCRIBED" }, { status: 409 })
  }

  const existing = await getDb()
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, session.user.id),
        eq(subscriptions.status, "APPROVAL_PENDING"),
        eq(subscriptions.planId, planId),
        gt(subscriptions.createdAt, Date.now() - 10 * 60 * 1000),
      ),
    )
    .limit(1)

  if (existing[0]?.approvalUrl) {
    return Response.json({
      approvalUrl: existing[0].approvalUrl,
      subscriptionId: existing[0].paypalSubscriptionId,
    })
  }

  const site = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  try {
    const paypal = await createPaypalSubscription({
      planId,
      userId: session.user.id,
      returnUrl: `${site}/account/billing?paypal=return`,
      cancelUrl: `${site}/account/billing?paypal=cancel`,
    })
    await upsertSubscriptionFromPaypal({
      userId: session.user.id,
      paypal,
      planId,
      approvalUrl: approvalUrlFrom(paypal) ?? null,
    })
    const approvalUrl = approvalUrlFrom(paypal)
    if (!approvalUrl) {
      return Response.json({ error: "PayPal did not return an approval URL." }, { status: 502 })
    }
    return Response.json({ approvalUrl, subscriptionId: paypal.id })
  } catch (error) {
    console.error("create-subscription failed", error)
    return Response.json({ error: "Could not start PayPal checkout." }, { status: 502 })
  }
}
