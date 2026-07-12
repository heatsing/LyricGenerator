import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import { SessionProvider } from "@/components/session-provider"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "AI-powered Lyrics Generator - Create Song Lyrics Online | Free",
    template: "%s | AI Lyrics Generator",
  },
  description:
    "Generate original song lyrics for any genre with our AI-powered lyrics generator. 100% free, no sign-up required. Create professional lyrics for pop, rock, rap, R&B, country & 15+ genres.",
  keywords: [
    "AI song lyrics generator",
    "generate lyrics",
    "music lyric generator",
    "free lyrics",
    "ai lyrics generator",
    "song lyrics generator free",
    "lyric maker",
    "ai songwriting",
    "automatic lyrics generator",
    "write song lyrics",
    "rap lyrics generator",
    "pop lyrics maker",
    "free songwriting software",
    "ai music lyrics",
    "songwriter helper",
    "create song lyrics online",
    "lyrics generator tool",
  ],
  authors: [{ name: "AI Lyrics Generator" }],
  creator: "AI Lyrics Generator",
  publisher: "AI Lyrics Generator",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lyricgenerator.cc"),
  openGraph: {
    title: "AI-powered Lyrics Generator - Create Song Lyrics Online",
    description: "Generate original song lyrics for any genre with our AI-powered lyrics generator. 100% free, no sign-up required.",
    type: "website",
    siteName: "AI Lyrics Generator",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Lyrics Generator - Create Original Song Lyrics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-powered Lyrics Generator - Create Song Lyrics Online",
    description: "Generate original song lyrics for any genre. 100% free, no sign-up required.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/icon-v2.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon-v2.svg?v=2", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json?v=2",
  category: "Music",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AI Lyrics Generator",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1247",
                bestRating: "5",
                worstRating: "1",
              },
              description:
                "Free AI-powered lyrics generator that creates original song lyrics for any genre including Pop, Rock, Hip Hop, R&B, Country, and 15+ more styles. Perfect for songwriters, musicians, and content creators. No sign-up required, 100% copyright-free lyrics.",
              featureList: [
                "AI-powered lyric generation using advanced language models",
                "Support for 15+ music genres including Pop, Rock, Hip Hop, R&B, Country, Jazz, Blues, EDM, Folk",
                "Customizable mood, theme, and keywords",
                "Multi-language support for global creators",
                "Instant generation in 3-10 seconds",
                "100% original, copyright-free lyrics",
                "No sign-up or registration required",
                "Unlimited free generations",
                "Professional song structure with verse, chorus, bridge labels",
                "Export options: copy, download text, download image",
                "Mobile-friendly responsive design",
              ],
              screenshot: "/og-image.png",
              softwareVersion: "2.0",
              datePublished: "2024-01-01",
              dateModified: "2024-01-01",
              author: {
                "@type": "Organization",
                name: "AI Lyrics Generator",
              },
              provider: {
                "@type": "Organization",
                name: "AI Lyrics Generator",
              },
              applicationSubCategory: "Music Creation Tool, Songwriting Software, Lyric Writer",
              keywords:
                "AI lyrics generator, song lyrics creator, free lyric maker, AI songwriting, automatic lyrics, rap generator, pop lyrics, songwriter tool",
            }),
          }}
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BHYYG5JT2R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BHYYG5JT2R');
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased`}>
        <SessionProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
