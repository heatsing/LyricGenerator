"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { Logo } from "@/components/Logo"
import { Card } from "@/components/ui/card"

function Verify() {
  const token = useSearchParams().get("token") || ""
  const [state, setState] = useState<"working" | "ok" | "bad">("working")

  useEffect(() => {
    if (!token) {
      setState("bad")
      return
    }
    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).then(async (res) => {
      setState(res.ok ? "ok" : "bad")
    })
  }, [token])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
        </Link>
        <Card className="p-8 border-2 text-center space-y-4">
          <h1 className="text-3xl font-bold">Email verification</h1>
          <p>
            {state === "working" && "Verifying..."}
            {state === "ok" && "Your email is verified."}
            {state === "bad" && "This verification link is invalid or expired."}
          </p>
          <Link href="/login" className="text-primary hover:underline">
            Continue to login
          </Link>
        </Card>
      </div>
    </main>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <Verify />
    </Suspense>
  )
}
