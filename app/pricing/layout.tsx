import type { Metadata } from "next"
import type { ReactNode } from "react"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lyricgenerator.cc"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free lyric generation stays public. Basic and Premium plans add higher quotas, lyrics-to-song, and yearly commercial rights.",
  alternates: { canonical: `${siteUrl}/pricing` },
}

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children
}
