import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Account",
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  return children
}
