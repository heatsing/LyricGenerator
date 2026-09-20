"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type BillingStatus = {
  entitlements?: {
    isPaid?: boolean
    plan?: string
    entitlementStatus?: string
  }
  subscription?: {
    planId?: string
    status?: string
    currentPeriodEnd?: number | null
  }
}

export default function BillingPage() {
  const [data, setData] = useState<BillingStatus | null>(null)
  const [message, setMessage] = useState("")
  const [busy, setBusy] = useState(false)

  async function refresh() {
    const res = await fetch("/api/billing/status")
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    refresh()
    const params = new URLSearchParams(window.location.search)
    if (params.get("paypal") === "return") {
      setMessage("PayPal checkout finished. Access is confirmed by webhook, not this page. Refreshing status...")
      const timer = setInterval(refresh, 2500)
      setTimeout(() => clearInterval(timer), 20000)
    }
    if (params.get("paypal") === "cancel") {
      setMessage("PayPal checkout was cancelled. No charge was applied.")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">Billing</h1>
        {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
        <Card className="p-6 space-y-3">
          <p>
            <strong>Paid access:</strong> {data?.entitlements?.isPaid ? "Active" : "Free"}
          </p>
          <p>
            <strong>Plan:</strong> {data?.entitlements?.plan || data?.subscription?.planId || "free"}
          </p>
          <p>
            <strong>Status:</strong> {data?.entitlements?.entitlementStatus || "free"}
          </p>
          {data?.subscription?.currentPeriodEnd ? (
            <p>
              <strong>Current period ends:</strong> {new Date(data.subscription.currentPeriodEnd).toLocaleString()}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/pricing">
              <Button>Choose a plan</Button>
            </Link>
            {data?.entitlements?.isPaid ? (
              <Button
                variant="outline"
                disabled={busy}
                onClick={async () => {
                  setBusy(true)
                  await fetch("/api/billing/cancel", { method: "POST" })
                  await refresh()
                  setBusy(false)
                  setMessage("Cancellation requested. Access continues until the period ends.")
                }}
              >
                Cancel subscription
              </Button>
            ) : null}
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
