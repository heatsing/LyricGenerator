"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Me = {
  user: {
    id: string
    email: string
    name: string | null
    createdAt: number
    accountStatus: string
    plan: string
    entitlementStatus: string
    emailVerifiedAt: number | null
  }
  entitlements: {
    isPaid: boolean
    lyricsToSong: boolean
    dailyGenerationLimit: number | null
    commercialUse: boolean
  }
  subscription: { status: string; currentPeriodEnd: number | null; planId: string } | null
}

export default function AccountPage() {
  const [me, setMe] = useState<Me | null>(null)
  const [history, setHistory] = useState<Array<{ id: string; type: string; createdAt: number; output: string }>>([])

  useEffect(() => {
    fetch("/api/account/me")
      .then((r) => r.json())
      .then(setMe)
    fetch("/api/account/generations")
      .then((r) => r.json())
      .then((data) => setHistory(data.items || []))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">Your account</h1>
        {!me?.user ? (
          <p>Loading...</p>
        ) : (
          <>
            <Card className="p-6 space-y-2">
              <p>
                <strong>Email:</strong> {me.user.email}
              </p>
              <p>
                <strong>User ID:</strong> {me.user.id}
              </p>
              <p>
                <strong>Created:</strong> {new Date(me.user.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Account status:</strong> {me.user.accountStatus}
              </p>
              <p>
                <strong>Plan:</strong> {me.user.plan}
              </p>
              <p>
                <strong>Subscription status:</strong> {me.user.entitlementStatus}
              </p>
              <p>
                <strong>Paid access:</strong> {me.entitlements.isPaid ? "Yes" : "No"}
              </p>
              <p>
                <strong>Lyrics-to-song:</strong> {me.entitlements.lyricsToSong ? "Included" : "Pro only"}
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link href="/pricing">
                  <Button>{me.entitlements.isPaid ? "Change plan" : "Upgrade to Pro"}</Button>
                </Link>
                <Link href="/account/billing">
                  <Button variant="outline">Billing</Button>
                </Link>
                <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
                  Log out
                </Button>
              </div>
            </Card>
            <Card className="p-6 space-y-3">
              <h2 className="text-xl font-semibold">Recent generations</h2>
              {history.length === 0 ? (
                <p className="text-muted-foreground text-sm">Nothing saved yet. Generate lyrics while signed in.</p>
              ) : (
                <ul className="space-y-3">
                  {history.map((item) => (
                    <li key={item.id} className="text-sm border-b border-border pb-3">
                      <div className="font-medium">
                        {item.type} · {new Date(item.createdAt).toLocaleString()}
                      </div>
                      <pre className="whitespace-pre-wrap text-muted-foreground mt-1 line-clamp-6">{item.output}</pre>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
