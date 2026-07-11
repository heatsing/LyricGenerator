"use client"

import Link from "next/link"
import { ArrowDown, ArrowRight, Check, Download, Feather, Music2, SlidersHorizontal, Sparkles } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FAQ } from "@/components/faq"
import LyricsGenerator from "@/components/lyrics-generator"
import GoogleOneTap from "@/components/GoogleOneTap"

const benefits = [
  { icon: SlidersHorizontal, title: "Make it sound like you", text: "Shape the genre, mood, theme, language and length before the first line is written." },
  { icon: Feather, title: "Start with a real idea", text: "Give the generator a scene, phrase or story. It turns the seed into a complete song structure." },
  { icon: Download, title: "Keep every good line", text: "Edit in place, regenerate, copy your lyrics, or export them as text and an image." },
]

const steps = [
  ["Set the direction", "Choose a genre, mood and theme."],
  ["Add your spark", "Describe the story or phrase you want in the song."],
  ["Generate & refine", "Get structured lyrics, then edit or regenerate any time."],
]

export default function HomePageClient() {
  return (
    <main className="studio-page min-h-screen">
      <GoogleOneTap />
      <Header />

      <section className="studio-hero">
        <div className="studio-shell studio-hero-grid">
          <div className="studio-hero-copy">
            <div className="studio-kicker"><span /> AI songwriting studio · free to use</div>
            <h1>Turn a feeling<span className="mobile-break"><br /></span> into <em>lyrics worth<span className="mobile-break"><br /></span> singing.</em></h1>
            <p className="studio-lede">Choose the sound. Set the mood. Give us one honest idea—and get a complete, editable song in seconds.</p>
            <div className="studio-actions">
              <Link href="#generator" className="studio-button studio-button-primary">Write my song <ArrowRight size={18} /></Link>
              <Link href="#how-it-works" className="studio-button studio-button-quiet">See how it works <ArrowDown size={17} /></Link>
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
            <div><span className="studio-eyebrow">THE WRITING ROOM</span><h2>Your idea in.<br/>A full song out.</h2></div>
            <p>Build the brief on the left. Your lyrics arrive on the right, ready to edit, save and turn into a song.</p>
          </div>
          <LyricsGenerator />
        </div>
      </section>

      <section className="studio-benefits">
        <div className="studio-shell">
          <div className="studio-section-heading"><span className="studio-eyebrow">BUILT FOR THE FIRST DRAFT</span><h2>Less blank page.<br/>More point of view.</h2></div>
          <div className="benefit-grid">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="benefit-card"><div className="benefit-number">0{index + 1}</div><Icon size={25} /><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="studio-process">
        <div className="studio-shell process-grid">
          <div className="process-intro"><span className="studio-eyebrow">HOW IT WORKS</span><h2>From rough thought to finished structure.</h2><p>No prompt-writing expertise required. Use the controls you already understand as a songwriter.</p></div>
          <ol className="process-list">
            {steps.map(([title, text], index) => <li key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="studio-genres">
        <div className="studio-shell">
          <div className="studio-section-heading split"><div><span className="studio-eyebrow">FIND YOUR SOUND</span><h2>One studio.<br/>Every kind of song.</h2></div><p>Start with a familiar genre, then bend the mood and story until it feels like yours.</p></div>
          <div className="genre-marquee">{["Pop", "Rap", "R&B", "Rock", "Country", "Indie", "K-Pop", "Jazz", "Folk", "EDM", "Blues", "Metal"].map((genre) => <Link key={genre} href={`/genre/${genre.toLowerCase().replace("&", "n").replace("-", "-")}`}>{genre}<Music2 size={15} /></Link>)}</div>
        </div>
      </section>

      <section id="faq" className="studio-faq">
        <div className="studio-shell faq-grid"><div className="studio-section-heading"><span className="studio-eyebrow">QUESTIONS, ANSWERED</span><h2>Before you press generate.</h2><p>Everything you need to know about creating, editing and using your lyrics.</p></div><FAQ /></div>
      </section>

      <section className="studio-final"><div className="studio-shell"><div className="studio-final-card"><span>YOUR NEXT SONG STARTS HERE</span><h2>Give the blank page<br/>something to work with.</h2><Link href="#generator" className="studio-button studio-button-light">Start writing free <Sparkles size={18} /></Link></div></div></section>
      <Footer />
    </main>
  )
}
