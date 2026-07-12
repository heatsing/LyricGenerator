"use client"

import Link from "next/link"
import { ArrowRight, Music, Sparkles } from "lucide-react"
import type { ReactNode } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BentoGrid } from "@/components/BentoGrid"
import { HowItWorks } from "@/components/HowItWorks"
import { FAQ } from "@/components/faq"
import CustomerReviews from "@/components/customer-reviews"
import GenreGuide, { type DemoItem } from "@/components/genre-guide"
import GoogleOneTap from "@/components/GoogleOneTap"

type BentoItem = { id: number; title: string; description: string; icon: any; gradient: string; size?: string }
type HowItWorksStep = { step: number; title: string; description: string; icon: any; color: string }
type Review = { name: string; role: string; avatar: string; rating: number; review: string }

interface SubPageShellProps {
  heroKicker: string
  heroTitle: string
  heroLede: string
  heroPills?: string[]
  generatorEyebrow?: string
  generatorTitle: string
  generatorLede: string
  generator: ReactNode
  demoEyebrow?: string
  demoTitle?: string
  demoDescription?: string
  demos?: DemoItem[]
  testimonialsTitle?: string
  testimonialsLede?: string
  faqTitle?: string
  faqLede?: string
  finalTitle?: string
  finalLede?: string
  bentoItems?: BentoItem[]
  bentoTitle?: ReactNode
  bentoLede?: string
  howItWorksSteps?: HowItWorksStep[]
  howItWorksTitle?: ReactNode
  howItWorksLede?: string
  reviews?: Review[]
  faqItems?: { question: string; answer: string }[]
  genresTitle?: string
  genresLede?: string
  genresLinks?: [string, string][]
}

const genreLinks: [string, string][] = [
  ["R&B Lyrics", "rnb"], ["Rock Lyrics", "rock"], ["Pop Lyrics", "pop"], ["Rap Lyrics", "rap"],
  ["Country Lyrics", "country"], ["Jazz Lyrics", "jazz"], ["K-Pop Lyrics", "k-pop"], ["Folk Lyrics", "folk"],
  ["EDM Lyrics", "edm"], ["Metal Lyrics", "metal"], ["Blues Lyrics", "blues"], ["Indie Lyrics", "indie"],
  ["Love Song", "love-song"], ["Christmas Song", "christmas-song"], ["Birthday Song", "birthday-song"], ["Diss Track", "diss-track"],
]

export default function SubPageShell({
  heroKicker,
  heroTitle,
  heroLede,
  heroPills = ["Free", "No sign-up", "Diverse Styles"],
  generatorEyebrow = "START CREATING",
  generatorTitle,
  generatorLede,
  generator,
  demoEyebrow,
  demoTitle,
  demoDescription,
  demos,
  testimonialsTitle = "Loved by 500K+ Creators",
  testimonialsLede = "Join thousands of songwriters, musicians, and content creators who trust our AI.",
  faqTitle = "Frequently Asked Questions",
  faqLede = "Everything you need to know about our AI lyrics generator.",
  finalTitle = "Ready to Create Your Next Hit?",
  finalLede = "Join over 500,000 creators who use our AI to write amazing lyrics. Start for free, no signup required.",
  bentoItems,
  bentoTitle,
  bentoLede,
  howItWorksSteps,
  howItWorksTitle,
  howItWorksLede,
  reviews,
  faqItems,
  genresTitle,
  genresLede,
  genresLinks,
}: SubPageShellProps) {
  return (
    <main className="studio-page min-h-screen">
      <GoogleOneTap />
      <Header />

      <section className="studio-hero">
        <div className="hero-decor" aria-hidden="true">
          <Music className="hero-bg-icon" size={460} strokeWidth={1} />
          <span className="hero-x x1">×</span>
          <span className="hero-x x2">×</span>
          <span className="hero-x x3">×</span>
          <span className="hero-x x4">×</span>
          <span className="hero-x x5">×</span>
          <span className="hero-x x6">×</span>
        </div>
        <div className="studio-shell studio-hero-grid">
          <div className="studio-hero-copy">
            <div className="studio-kicker"><span /> {heroKicker}</div>
            <h1>{heroTitle}</h1>
            <p className="studio-lede">{heroLede}</p>
            <div className="studio-actions">
              <Link href="#generator" className="studio-button studio-button-primary">Start Creating Free <ArrowRight size={18} /></Link>
            </div>
            <div className="studio-trust-pills">
              {heroPills.map((pill) => (
                <span key={pill} className="hero-pill">{pill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="generator" className="studio-generator">
        <div className="studio-shell">
          <div className="studio-section-heading center">
            <span className="studio-eyebrow">{generatorEyebrow}</span>
            <h2>{generatorTitle}</h2>
            <p>{generatorLede}</p>
          </div>
          {generator}
        </div>
      </section>

      <BentoGrid items={bentoItems} title={bentoTitle} lede={bentoLede} />
      <HowItWorks steps={howItWorksSteps} title={howItWorksTitle} lede={howItWorksLede} />
      <GenreGuide
        eyebrow={demoEyebrow}
        title={demoTitle}
        description={demoDescription}
        demos={demos}
      />

      <section className="studio-testimonials">
        <div className="studio-shell">
          <div className="studio-section-heading center">
            <span className="studio-eyebrow">TESTIMONIALS</span>
            <h2>{testimonialsTitle}</h2>
            <p>{testimonialsLede}</p>
          </div>
          <CustomerReviews reviews={reviews} />
        </div>
      </section>

      <section id="faq" className="studio-faq">
        <div className="studio-shell">
          <div className="studio-section-heading center">
            <span className="studio-eyebrow">FAQ</span>
            <h2>{faqTitle}</h2>
            <p>{faqLede}</p>
          </div>
          <FAQ faqData={faqItems} />
        </div>
      </section>

      <section className="studio-genres">
        <div className="studio-shell">
          <div className="studio-section-heading center">
            <span className="studio-eyebrow">EXPLORE</span>
            <h2>{genresTitle || 'Generate Lyrics by Genre'}</h2>
            <p>{genresLede || 'Explore our specialized AI generators for different music styles and occasions.'}</p>
          </div>
          <div className="genre-marquee">
            {(genresLinks || genreLinks).map(([name, slug]) => (
              <Link key={slug} href={`/genre/${slug}`}>{name}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-final">
        <div className="studio-final-card">
          <span>START CREATING FREE</span>
          <h2>{finalTitle}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">{finalLede}</p>
          <Link href="#generator" className="studio-button studio-button-light">Start Creating Free <Sparkles size={18} /></Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
