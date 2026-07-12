"use client"

import Link from "next/link"
import { ArrowDown, ArrowRight, Music, Sparkles } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BentoGrid } from "@/components/BentoGrid"
import { HowItWorks } from "@/components/HowItWorks"
import { CustomerReviews } from "@/components/customer-reviews"
import { FAQ } from "@/components/faq"
import LyricsGenerator from "@/components/lyrics-generator"
import GenreGuide from "@/components/genre-guide"
import GoogleOneTap from "@/components/GoogleOneTap"

export default function HomePageClient() {
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
            <div className="studio-kicker"><span /> AI-powered lyrics generation</div>
            <h1>Free AI Lyrics Generator Online</h1>
            <p className="studio-lede">The best free lyric generator online. Use our AI lyrics generator to create original, professional-quality song lyrics for any genre — quickly, effortlessly, and with no signup required.</p>
            <div className="studio-actions">
              <Link href="#generator" className="studio-button studio-button-primary">Start Creating Free <ArrowRight size={18} /></Link>
              <Link href="#how-it-works" className="studio-button studio-button-quiet">How It Works <ArrowDown size={17} /></Link>
            </div>
            <div className="studio-trust-pills">
              <span className="hero-pill">Free</span>
              <span className="hero-pill">No sign-up</span>
              <span className="hero-pill">Diverse Styles</span>
            </div>
          </div>
        </div>
      </section>

      <section id="generator" className="studio-generator">
        <div className="studio-shell">
          <div className="studio-section-heading center">
            <span className="studio-eyebrow">START CREATING</span>
            <h2>Generate Your Perfect Lyrics</h2>
            <p>Choose your genre, mood, and theme. Our AI will create unique, professional lyrics in seconds.</p>
          </div>
          <LyricsGenerator />
        </div>
      </section>

      <BentoGrid />
      <HowItWorks />
      <GenreGuide />

      <section className="studio-testimonials">
        <div className="studio-shell">
          <div className="studio-section-heading center"><span className="studio-eyebrow">TESTIMONIALS</span><h2>Loved by 500K+ Creators</h2><p>Join thousands of songwriters, musicians, and content creators who trust our AI.</p></div>
          <CustomerReviews />
        </div>
      </section>

      <section id="faq" className="studio-faq">
        <div className="studio-shell">
          <div className="studio-section-heading center">
            <span className="studio-eyebrow">FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our AI lyrics generator.</p>
          </div>
          <FAQ />
        </div>
      </section>

      <section className="studio-genres">
        <div className="studio-shell">
          <div className="studio-section-heading center"><span className="studio-eyebrow">EXPLORE</span><h2>Generate Lyrics by Genre</h2><p>Explore our specialized AI generators for different music styles and occasions.</p></div>
          <div className="genre-marquee">{[
            ["R&B Lyrics", "rnb"], ["Rock Lyrics", "rock"], ["Pop Lyrics", "pop"], ["Rap Lyrics", "rap"],
            ["Country Lyrics", "country"], ["Jazz Lyrics", "jazz"], ["K-Pop Lyrics", "k-pop"], ["Folk Lyrics", "folk"],
            ["EDM Lyrics", "edm"], ["Metal Lyrics", "metal"], ["Blues Lyrics", "blues"], ["Indie Lyrics", "indie"],
            ["Love Song", "love-song"], ["Christmas Song", "christmas-song"], ["Birthday Song", "birthday-song"], ["Diss Track", "diss-track"],
          ].map(([name, slug]) => <Link key={slug} href={`/genre/${slug}`}>{name}</Link>)}</div>
        </div>
      </section>

      <section className="studio-testimonials" style={{ background: "var(--soft)" }}>
        <div className="studio-shell">
          <div className="studio-section-heading center">
            <span className="studio-eyebrow">SPECIALIZED TOOLS</span>
            <h2>Explore Our Lyric Generators</h2>
            <p>From AI lyrics generation to rap verses, freestyle bars, and lyric videos — find the perfect tool for your creative needs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {[
              ["AI Lyrics Generator", "ai-lyrics-generator"],
              ["Song Lyrics Generator", "song-lyrics-generator"],
              ["Rap Lyrics Generator", "rap-lyrics-generator"],
              ["Freestyle Lyrics Generator", "freestyle-lyrics-generator"],
              ["Free Lyrics Generator", "free-lyrics-generator"],
              ["Random Lyrics Generator", "random-lyrics-generator"],
              ["Rhyme Lyrics Generator", "rhyme-lyrics-generator"],
              ["Lyric Video Generator", "lyric-video-generator"],
              ["Metal Lyrics Generator", "metal-lyrics-generator"],
              ["Country Lyrics Generator", "country-lyrics-generator"],
              ["K-Pop Lyrics Generator", "kpop-lyrics-generator"],
              ["R&B Lyrics Generator", "rb-lyrics-generator"],
              ["Music Lyrics Generator", "music-lyrics-generator"],
              ["Best AI Lyrics Generator", "best-ai-lyrics-generator"],
              ["Lyrics to Song Generator", "lyrics-to-song-generator"],
              ["Lyrics from Audio", "lyrics-generator-from-audio"],
            ].map(([name, slug]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="block px-4 py-3 rounded-xl border border-border bg-card/50 hover:bg-primary/10 hover:border-primary/30 transition-all text-sm font-medium text-center"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-final"><div className="studio-final-card"><span>START CREATING FREE</span><h2>Ready to Create Your Next Hit?</h2><p className="mx-auto mb-8 max-w-2xl text-lg">Join over 500,000 creators who use our AI to write amazing lyrics. Start for free, no signup required.</p><Link href="#generator" className="studio-button studio-button-light">Start Creating Free <Sparkles size={18} /></Link></div></section>
      <Footer />
    </main>
  )
}
