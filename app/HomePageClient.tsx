"use client"

import Link from "next/link"
import { ArrowDown, ArrowRight, Check, Sparkles } from "lucide-react"
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
        <div className="studio-shell studio-hero-grid">
          <div className="studio-hero-copy">
            <div className="studio-kicker"><span /> AI-powered lyrics generation</div>
            <h1>Free AI Lyrics <em>Generator Online</em></h1>
            <p className="studio-lede">A free AI song lyrics generator that helps songwriters and musicians create original, professional-quality lyrics quickly and effortlessly.</p>
            <div className="studio-actions">
              <Link href="#generator" className="studio-button studio-button-primary">Start Creating Free <ArrowRight size={18} /></Link>
              <Link href="#how-it-works" className="studio-button studio-button-quiet">How It Works <ArrowDown size={17} /></Link>
            </div>
            <div className="studio-trust">
              <span><Check size={15} /> No sign-up</span>
              <span><Check size={15} /> 15+ genres</span>
              <span><Check size={15} /> Edit & export</span>
            </div>
          </div>

          <div className="lyric-sheet" aria-label="Example generated lyric">
            <div className="lyric-sheet-head"><span>NOW WRITING</span><span>POP · NOSTALGIC</span></div>
            <div className="lyric-sheet-title">Polaroid Summer</div>
            <div className="lyric-rule"><span>VERSE 01</span></div>
            <p>We left our names in the boardwalk grain<br/>Danced through the salt and a midnight rain</p>
            <div className="lyric-rule coral"><span>CHORUS</span></div>
            <p className="lyric-chorus">If the summer fades,<br/>let the colors stay—<br/>I still see us in the light.</p>
            <div className="lyric-wave" aria-hidden="true">▂▄▆▃▇▅▂▆▄▇▃▅▂▄▆▃▇▅</div>
            <Sparkles className="lyric-spark" size={22} />
          </div>
        </div>
      </section>

      <section id="generator" className="studio-generator">
        <div className="studio-shell">
          <div className="studio-section-heading split">
            <div><span className="studio-eyebrow">START CREATING</span><h2>Generate Your<br/>Perfect Lyrics</h2></div>
            <p>Choose your genre, mood, and theme. Our AI will create unique, professional lyrics in seconds.</p>
          </div>
          <LyricsGenerator />
        </div>
      </section>

      <BentoGrid />
      <HowItWorks />
      <GenreGuide />

      <section className="studio-benefits">
        <div className="studio-shell">
          <div className="studio-section-heading split"><div><span className="studio-eyebrow">TESTIMONIALS</span><h2>Loved by<br/>500K+ Creators</h2></div><p>Join thousands of songwriters, musicians, and content creators who trust our AI.</p></div>
          <CustomerReviews />
        </div>
      </section>

      <section id="faq" className="studio-faq">
        <div className="studio-shell faq-grid"><div className="studio-section-heading"><span className="studio-eyebrow">FAQ</span><h2>Frequently Asked Questions</h2><p>Everything you need to know about our AI lyrics generator.</p></div><FAQ /></div>
      </section>

      <section className="studio-genres">
        <div className="studio-shell">
          <div className="studio-section-heading split"><div><span className="studio-eyebrow">EXPLORE</span><h2>Generate Lyrics<br/>by Genre</h2></div><p>Explore our specialized AI generators for different music styles and occasions.</p></div>
          <div className="genre-marquee">{[
            ["R&B Lyrics", "rnb"], ["Rock Lyrics", "rock"], ["Pop Lyrics", "pop"], ["Rap Lyrics", "rap"],
            ["Country Lyrics", "country"], ["Jazz Lyrics", "jazz"], ["K-Pop Lyrics", "k-pop"], ["Folk Lyrics", "folk"],
            ["EDM Lyrics", "edm"], ["Metal Lyrics", "metal"], ["Blues Lyrics", "blues"], ["Indie Lyrics", "indie"],
            ["Love Song", "love-song"], ["Christmas Song", "christmas-song"], ["Birthday Song", "birthday-song"], ["Diss Track", "diss-track"],
          ].map(([name, slug]) => <Link key={slug} href={`/genre/${slug}`}>{name}</Link>)}</div>
        </div>
      </section>

      <section className="studio-final"><div className="studio-shell"><div className="studio-final-card"><span>START CREATING FREE</span><h2>Ready to Create Your<br/>Next Hit?</h2><p className="mx-auto mb-8 max-w-2xl text-lg">Join over 500,000 creators who use our AI to write amazing lyrics. Start for free, no signup required.</p><Link href="#generator" className="studio-button studio-button-light">Start Creating Free <Sparkles size={18} /></Link></div></div></section>
      <Footer />
    </main>
  )
}
