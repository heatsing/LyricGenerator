"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ResetForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token") || ""
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
        </Link>
        <Card className="p-8 border-2 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Choose a new password</h1>
          </div>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setLoading(true)
              setError("")
              const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
              })
              const data = await res.json()
              if (!res.ok) {
                setError(data.error || "Reset failed.")
                setLoading(false)
                return
              }
              router.push("/login")
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                minLength={8}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button className="w-full" disabled={loading || !token}>
              {loading ? "Saving..." : "Update password"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <ResetForm />
    </Suspense>
  )
}
