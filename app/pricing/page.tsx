"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PLANS, type PaidPlanId } from "@/lib/plans"

export default function PricingPage() {
  const { status } = useSession()
  const router = useRouter()
  const [interval, setInterval] = useState<"month" | "year">("month")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState<string | null>(null)

  async function checkout(plan: PaidPlanId) {
    setError("")
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=/pricing`)
      return
    }
    setBusy(plan)
    const res = await fetch("/api/billing/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Checkout failed.")
      setBusy(null)
      return
    }
    window.location.href = data.approvalUrl
  }

  const basic = interval === "year" ? PLANS.basic_yearly : PLANS.basic_monthly
  const premium = interval === "year" ? PLANS.premium_yearly : PLANS.premium_monthly

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Plans for songwriters</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Public lyric pages stay free to try. Paid plans follow GSong-style quotas: Basic for individuals, Premium
            for teams, and yearly billing unlocks commercial rights.
          </p>
          <div className="inline-flex rounded-full border border-border p-1">
            <button
              type="button"
              className={`px-4 py-1.5 text-sm rounded-full ${interval === "month" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setInterval("month")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-4 py-1.5 text-sm rounded-full ${interval === "year" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setInterval("year")}
            >
              Annual · save 50%
            </button>
          </div>
        </div>
        {error ? <p className="text-center text-sm text-destructive">{error}</p> : null}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">{PLANS.free.tagline}</p>
            <h2 className="text-2xl font-semibold">{PLANS.free.name}</h2>
            <p className="text-3xl font-bold">$0</p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>10 lyric generations / day</li>
              <li>Public generators stay open, no login required to try</li>
              <li>10 saved drafts</li>
              <li>Personal use only</li>
              <li className="line-through">Lyrics-to-song</li>
              <li className="line-through">Commercial license</li>
            </ul>
            <Button variant="outline" className="w-full" onClick={() => router.push("/login")}>
              Create free account
            </Button>
          </Card>
          <Card className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">{basic.tagline}</p>
            <h2 className="text-2xl font-semibold">{basic.name}</h2>
            <p className="text-3xl font-bold">
              ${basic.interval === "year" ? "4.85" : "9.70"}
              <span className="text-base font-normal">/month</span>
            </p>
            {basic.interval === "year" ? <p className="text-sm text-muted-foreground">$58.20 billed yearly</p> : null}
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>40 lyric generations / day</li>
              <li>Lyrics-to-song conversion</li>
              <li>90 saved drafts</li>
              <li>{basic.commercialUse ? "Commercial license included" : "Personal use on monthly billing"}</li>
            </ul>
            <Button className="w-full" disabled={busy !== null} onClick={() => checkout(basic.id)}>
              {busy === basic.id ? "Redirecting..." : `Choose ${basic.name}`}
            </Button>
          </Card>
          <Card className="p-6 space-y-4 border-2 border-primary">
            <p className="text-sm text-muted-foreground">{premium.tagline}</p>
            <h2 className="text-2xl font-semibold">{premium.name}</h2>
            <p className="text-3xl font-bold">
              ${premium.interval === "year" ? "8.00" : "16.00"}
              <span className="text-base font-normal">/month</span>
            </p>
            {premium.interval === "year" ? <p className="text-sm text-muted-foreground">$96 billed yearly</p> : null}
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>120 lyric generations / day · 3× Basic</li>
              <li>Lyrics-to-song conversion</li>
              <li>Unlimited history</li>
              <li>Up to 3 devices on one account</li>
              <li>{premium.commercialUse ? "Commercial license included" : "Commercial license on annual billing"}</li>
            </ul>
            <Button className="w-full" disabled={busy !== null} onClick={() => checkout(premium.id)}>
              {busy === premium.id ? "Redirecting..." : `Choose ${premium.name}`}
            </Button>
          </Card>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Annual billing includes commercial rights. Monthly billing is for personal use, matching GSong’s monthly vs
          annual split.
        </p>
      </main>
      <Footer />
    </div>
  )
}
