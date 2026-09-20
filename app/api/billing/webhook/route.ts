import { verifyPaypalWebhookSignature } from "@/lib/paypal"
import { handlePaypalWebhookEvent } from "@/lib/billing"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const raw = await req.text()
  let event: { id?: string; event_type?: string; resource?: Record<string, unknown> }
  try {
    event = JSON.parse(raw)
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const verified = await verifyPaypalWebhookSignature(
    {
      transmissionId: req.headers.get("paypal-transmission-id") || "",
      transmissionTime: req.headers.get("paypal-transmission-time") || "",
      certUrl: req.headers.get("paypal-cert-url") || "",
      authAlgo: req.headers.get("paypal-auth-algo") || "",
      transmissionSig: req.headers.get("paypal-transmission-sig") || "",
    },
    event,
  )

  if (!verified) {
    return Response.json({ error: "Invalid webhook signature" }, { status: 401 })
  }

  if (!event.id || !event.event_type) {
    return Response.json({ error: "Invalid event" }, { status: 400 })
  }

  const result = await handlePaypalWebhookEvent({
    id: event.id,
    event_type: event.event_type,
    resource: event.resource || {},
  })

  return Response.json(result)
}
