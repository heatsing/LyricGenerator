import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GeneratorClient } from "@/components/GeneratorClient"
import { CustomerReviews } from "@/components/customer-reviews"
import { FAQ } from "@/components/faq"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import seoPages from "@/data/seo_pages.json"
import { ToolContentGuide } from "@/components/ToolContentGuide"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lyricgenerator.cc"

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

  const genreDescriptions: Record<string, string> = {
    Pop: "Pop music features catchy melodies and relatable lyrics. Our AI creates radio-ready pop songs with memorable hooks.",
    Rap: "Rap lyrics combine rhythm, wordplay, and storytelling. Generate hard-hitting bars with clever metaphors instantly.",
    Rock: "Rock music embodies energy and raw emotion. Create powerful lyrics with strong imagery and anthemic choruses.",
    "R&B":
      "R&B combines soulful vocals with smooth grooves. Generate romantic and emotionally rich lyrics effortlessly.",
    EDM: "EDM lyrics are energetic and uplifting. Create festival anthems that match the high-energy electronic vibe.",
    Country:
      "Country music tells stories of life and love. Generate authentic lyrics with vivid Nashville storytelling.",
    Jazz: "Jazz lyrics are sophisticated and poetic. Create smooth, introspective lyrics with a timeless feel.",
    "K-Pop": "K-Pop blends catchy hooks with dynamic energy. Generate trendy lyrics with global appeal.",
    Folk: "Folk music features acoustic storytelling. Create introspective lyrics with organic, traditional sounds.",
    Metal:
      "Metal lyrics are intense and powerful. Generate aggressive, emotionally charged lyrics with strong imagery.",
  }

  const genreDescription =
    genreDescriptions[page.preset.genre || ""] || "Our AI creates professional, unique lyrics in seconds."

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
          `${page.preset.genre} lyrics generation`,
          `${page.preset.mood || "Multiple"} mood options`,
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
            name: `How do I generate ${page.preset.genre || ""} ${page.preset.mood || ""} lyrics?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Simply select your preferences and click Generate. Our AI will create unique ${page.preset.genre || ""} lyrics with ${page.preset.mood || "your chosen"} mood instantly.`,
            },
          },
          {
            "@type": "Question",
            name: `Is the ${page.preset.genre || ""} lyrics generator free?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our generator is 100% free with unlimited generations. No signup or payment required.",
            },
          },
          {
            "@type": "Question",
            name: `Can I use generated ${page.preset.genre || ""} lyrics commercially?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all generated lyrics are original and can be used commercially. We recommend a similarity check before release.",
            },
          },
          {
            "@type": "Question",
            name: `What makes good ${page.preset.genre || ""} lyrics?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Great ${page.preset.genre || ""} lyrics feature ${page.preset.genre === "Rap" ? "strong flow, wordplay, and storytelling" : page.preset.genre === "Pop" ? "catchy hooks and relatable themes" : page.preset.genre === "Rock" ? "powerful imagery and emotional intensity" : "authentic expression and genre-appropriate style"}.`,
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
      <Header />
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto text-center">
            <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-2">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/#popular-generators" className="hover:text-foreground transition-colors">
                    Generators
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground font-medium">
                  {page.preset.genre} {page.preset.mood}
                </li>
              </ol>
            </nav>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">{page.h1}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">{page.description}</p>
          </div>
        </section>

        {/* Generator Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <GeneratorClient preset={page.preset} />
          </div>
        </section>

        <ToolContentGuide toolName={page.title} kind="lyrics" style={page.preset.genre} />

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About {page.title}</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{genreDescription}</p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you're a professional songwriter or creative enthusiast, our {page.title.toLowerCase()} provides
              instant inspiration and professional results. Generate {page.preset.genre ? `${page.preset.genre}` : ""}{" "}
              {page.preset.mood ? `${page.preset.mood.toLowerCase()}` : ""} lyrics that match your artistic vision.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Why Use Our {page.preset.genre} Lyrics Generator?</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>
                  <strong>AI-Powered Creativity</strong> - Advanced models create authentic, genre-specific lyrics
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>
                  <strong>Instant Results</strong> - Generate complete song lyrics in seconds, not hours
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>
                  <strong>100% Free</strong> - No subscriptions, no hidden fees, unlimited generations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">4.</span>
                <span>
                  <strong>Professional Quality</strong> - Structured output with verses, choruses, and bridges
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">How to Create {page.preset.genre || "Perfect"} Lyrics</h3>
            <ol className="space-y-3 mb-8 list-decimal list-inside">
              <li>
                <strong>Set Your Style</strong> - Choose from {page.preset.genre || "various genres"} and customize the
                mood
              </li>
              <li>
                <strong>Define Your Theme</strong> - Add specific topics or keywords to guide the AI
              </li>
              <li>
                <strong>Choose Song Length</strong> - Select short, medium, or long format
              </li>
              <li>
                <strong>Generate & Refine</strong> - Click generate and regenerate until perfect
              </li>
              <li>
                <strong>Download & Use</strong> - Copy or download your lyrics immediately
              </li>
            </ol>

            {page.preset.genre && (
              <>
                <h3 className="text-2xl font-semibold mb-4">Tips for Writing Great {page.preset.genre} Lyrics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When creating {page.preset.genre.toLowerCase()} lyrics, focus on{" "}
                  {page.preset.genre === "Rap"
                    ? "rhythm, flow, and wordplay. Use internal rhymes and clever metaphors to create memorable bars."
                    : page.preset.genre === "Pop"
                      ? "catchy hooks and relatable themes. Keep verses simple and make choruses memorable and singable."
                      : page.preset.genre === "Rock"
                        ? "powerful imagery and emotional intensity. Build energy through strong verbs and anthemic choruses."
                        : page.preset.genre === "R&B"
                          ? "emotional depth and smooth phrasing. Focus on love, relationships, and personal experiences."
                          : page.preset.genre === "Country"
                            ? "storytelling and authentic emotion. Paint vivid pictures of life, love, and heartache."
                            : page.preset.genre === "EDM"
                              ? "energy and repetition. Create simple, catchy phrases that work with electronic beats."
                              : "authentic expression and genre-appropriate language that resonates with listeners."}
                </p>
              </>
            )}
          </div>
        </section>

        <CustomerReviews />
        <FAQ />

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Related Lyrics Generators</h2>
            <p className="text-center text-muted-foreground mb-8">
              Explore more AI-powered lyrics generators for different genres and moods
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {seoPages
                .filter((p) => p.slug !== slug)
                .slice(0, 12)
                .map((relatedPage) => (
                  <Link
                    key={relatedPage.id}
                    href={`/generator/${relatedPage.slug}`}
                    className="p-4 bg-card rounded-lg hover:shadow-md hover:bg-card/80 transition-all text-center border border-border/50"
                  >
                    <span className="text-sm font-medium">
                      {relatedPage.h1.replace("Free ", "").replace("AI ", "")}
                    </span>
                  </Link>
                ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/" className="text-primary hover:underline font-medium">
                View All Lyrics Generators →
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
