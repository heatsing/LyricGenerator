import HomePageClient from "./HomePageClient"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lyricgenerator.cc"

export const metadata: Metadata = {
  title: "Free AI Lyrics Generator | Create Song Lyrics Online", // 55 chars
  description:
    "Generate unique song lyrics instantly with our free AI lyrics generator. Create professional lyrics for pop, rap, rock, country & more. No signup required.", // 158 chars
  keywords: [
    // Primary keywords
    "lyric generator",
    "lyrics generator",
    "ai lyrics generator",
    "free lyrics generator",
    "song lyrics generator",
    "lyrics maker online",
    // Long-tail keywords
    "generate song lyrics free",
    "ai songwriting tool",
    "create lyrics online",
    "automatic lyrics writer",
    // Genre keywords
    "rap lyrics generator",
    "pop lyrics maker",
    "rock lyrics creator",
    "country lyrics generator",
    // Intent keywords
    "lyrics generator no signup",
    "free lyric creator",
    "song lyrics tool",
    "music lyrics generator",
  ].join(", "),
  openGraph: {
    title: "Free AI Lyrics Generator | Create Song Lyrics Instantly",
    description:
      "Generate professional song lyrics in seconds. Free AI tool for pop, rap, rock, country & 15+ genres. Join 500K+ songwriters!",
    type: "website",
    url: siteUrl,
    siteName: "LyricGenerator.cc",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI Lyrics Generator - Create Original Song Lyrics",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Lyrics Generator | Create Songs Instantly",
    description: "Generate professional lyrics in seconds. 500K+ users trust us.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "es-ES": `${siteUrl}/es`,
      "fr-FR": `${siteUrl}/fr`,
      "de-DE": `${siteUrl}/de`,
      "ja-JP": `${siteUrl}/ja`,
      "ko-KR": `${siteUrl}/ko`,
      "zh-CN": `${siteUrl}/zh`,
    },
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
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "LyricGenerator.cc",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
          width: 512,
          height: 512,
        },
        description: "Leading free AI-powered lyrics generation platform",
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@lyricgenerator.cc",
        },
      },
      // Website Schema
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "LyricGenerator.cc",
        description: "Free AI Lyrics Generator - Create Song Lyrics Online",
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/generator/{search_term_string}-lyrics`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      // WebPage Schema
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Free AI Lyrics Generator | Create Song Lyrics Online",
        description:
          "Generate unique song lyrics instantly with our free AI lyrics generator. Create professional lyrics for pop, rap, rock, country & more.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#webapp` },
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        inLanguage: "en-US",
      },
      // SoftwareApplication Schema
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#webapp`,
        name: "AI Lyrics Generator",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "AI-powered lyrics generation",
          "15+ music genres supported",
          "Multiple mood and theme options",
          "Multi-language support",
          "Instant generation",
          "No registration required",
          "Completely free",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "12547",
          bestRating: "5",
          worstRating: "1",
        },
      },
      // FAQ Schema
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Is the AI lyrics generator completely free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our AI lyrics generator is 100% free to use with unlimited generations. No signup, no credit card, no hidden fees.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use the generated lyrics commercially?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all lyrics generated by our AI are original and can be used for commercial purposes. We recommend a similarity check before release.",
            },
          },
          {
            "@type": "Question",
            name: "What music genres are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We support 15+ genres including Pop, Rock, Rap, Hip-Hop, R&B, Country, Jazz, EDM, K-Pop, Folk, Metal, Blues, Indie, Reggae, and more.",
            },
          },
          {
            "@type": "Question",
            name: "How does the AI lyrics generator work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our AI analyzes your inputs (genre, mood, theme, keywords) and generates unique lyrics using advanced language models trained on millions of songs.",
            },
          },
          {
            "@type": "Question",
            name: "Can I generate lyrics in different languages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our generator supports 20+ languages including English, Spanish, French, German, Chinese, Japanese, Korean, and more.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to create an account?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No account or signup required. Start generating lyrics immediately without any registration process.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take to generate lyrics?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Lyrics are generated instantly, typically within 2-5 seconds depending on the selected length and complexity.",
            },
          },
          {
            "@type": "Question",
            name: "Can I customize the generated lyrics?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can specify genre, mood, theme, keywords, song length, and language. You can also regenerate or edit the output.",
            },
          },
          {
            "@type": "Question",
            name: "Are the generated lyrics unique?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, each generation produces unique, original lyrics. The AI creates new content every time based on your specific inputs.",
            },
          },
          {
            "@type": "Question",
            name: "What is the structure of generated lyrics?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Generated lyrics include proper song structure with labeled sections: [Verse 1], [Chorus], [Verse 2], [Bridge], etc.",
            },
          },
        ],
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePageClient />
    </>
  )
}
