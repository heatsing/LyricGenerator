import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GeneratorClient } from "@/components/GeneratorClient"
import SubPageShell from "@/components/SubPageShell"
import { genreDemos } from "@/data/genre-demos"
import seoPages from "@/data/seo_pages.json"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lyricgenerator.cc"

// Map SEO page preset genre (e.g. "R&B", "K-Pop") to genreDemos keys (e.g. "rnb", "kpop")
const genreToDemoKey: Record<string, string> = {
  Pop: "pop",
  Rock: "rock",
  Rap: "rap",
  "R&B": "rnb",
  Country: "country",
  Jazz: "jazz",
  EDM: "edm",
  "K-Pop": "kpop",
  Folk: "folk",
  Metal: "metal",
  Blues: "blues",
  Indie: "indie",
  Reggae: "reggae",
}

export async function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = seoPages.find((p) => p.slug === slug)

  if (!page) {
    return { title: "Page Not Found | LyricGenerator.cc" }
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url: `${siteUrl}/generator/${slug}`,
      siteName: "LyricGenerator.cc",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: `${siteUrl}/generator/${slug}`,
    },
  }
}

export default async function GeneratorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = seoPages.find((p) => p.slug === slug)

  if (!page) {
    notFound()
  }

  const genre = page.preset.genre || ""
  const mood = page.preset.mood || ""
  const genreLabel = genre || "your favorite"
  const moodLabel = mood ? mood.toLowerCase() : ""

  // Resolve demo items for this page's genre, falling back to pop
  const demoKey = genreToDemoKey[genre] || "pop"
  const demos = genreDemos[demoKey] || genreDemos["pop"]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/generator/${slug}#webpage`,
        url: `${siteUrl}/generator/${slug}`,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: { "@id": `${siteUrl}/generator/${slug}#breadcrumb` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/og-image.png` },
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/generator/${slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Generators", item: `${siteUrl}/generator` },
          { "@type": "ListItem", position: 3, name: page.h1, item: `${siteUrl}/generator/${slug}` },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: page.title,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        featureList: [
          `${genre} lyrics generation`,
          `${mood || "Multiple"} mood options`,
          "Instant AI generation",
          "Free unlimited use",
          "No signup required",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How do I generate ${genre} ${mood} lyrics?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Simply select your preferences and click Generate. Our AI will create unique ${genre} lyrics with ${mood || "your chosen"} mood instantly.`,
            },
          },
          {
            "@type": "Question",
            name: `Is the ${genre} lyrics generator free?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our generator is 100% free with unlimited generations. No signup or payment required.",
            },
          },
          {
            "@type": "Question",
            name: `Can I use generated ${genre} lyrics commercially?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all generated lyrics are original and can be used commercially. We recommend a similarity check before release.",
            },
          },
          {
            "@type": "Question",
            name: `What makes good ${genre} lyrics?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Great ${genre} lyrics feature ${genre === "Rap" ? "strong flow, wordplay, and storytelling" : genre === "Pop" ? "catchy hooks and relatable themes" : genre === "Rock" ? "powerful imagery and emotional intensity" : "authentic expression and genre-appropriate style"}.`,
            },
          },
          {
            "@type": "Question",
            name: "How long does generation take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Lyrics are generated instantly, typically within 2-5 seconds depending on length and complexity.",
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SubPageShell
        heroKicker="AI-powered lyrics generation"
        heroTitle={page.h1}
        heroLede={page.description}
        generatorEyebrow="START CREATING"
        generatorTitle="Generate Your Perfect Lyrics"
        generatorLede={`Choose your ${genreLabel} ${moodLabel ? `and ${moodLabel} ` : ""}vibe, then let our AI craft unique, professional lyrics in seconds — free, no signup required.`}
        generator={<GeneratorClient preset={page.preset} />}
        demoEyebrow="LISTEN & LEARN"
        demoTitle={genre ? `${genre} Lyrics Examples & Inspiration` : "Lyrics Examples & Inspiration"}
        demoDescription={`Explore sample ${genreLabel} lyrics generated by our AI to spark your creativity and see what's possible.`}
        demos={demos}
        finalTitle="Ready to Create Your Next Hit?"
        finalLede="Join over 500,000 creators who use our AI to write amazing lyrics. Start for free, no signup required."
      />
    </>
  )
}
