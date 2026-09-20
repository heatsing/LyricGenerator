"use client"

import Link from "next/link"
import { useState } from "react"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
        </Link>
        <Card className="p-8 border-2 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Reset password</h1>
            <p className="text-muted-foreground">We will email a reset link if the account exists.</p>
          </div>
          {sent ? (
            <p className="text-sm text-center">If that email is registered, a reset link is on its way. Check your inbox or the server log in development.</p>
          ) : (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)
                await fetch("/api/auth/forgot-password", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                })
                setSent(true)
                setLoading(false)
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          )}
          <p className="text-center text-sm">
            <Link href="/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </p>
        </Card>
      </div>
    </main>
  )
}
