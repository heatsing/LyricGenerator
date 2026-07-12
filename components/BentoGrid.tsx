"use client"

import {
  Zap,
  Sparkles,
  Music,
  Globe,
  Shield,
  Infinity,
  Palette,
  Languages,
  Download,
  Wand2
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { ReactNode } from "react"

type BentoItem = {
  id: number
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  size?: string
}

const defaultBentoItems: BentoItem[] = [
  {
    id: 1,
    title: "Lightning Fast",
    description: "Generate professional lyrics in under 5 seconds with our advanced AI engine",
    icon: Zap,
    gradient: "from-violet-500 to-purple-600",
    size: "normal",
  },
  {
    id: 2,
    title: "15+ Genres",
    description: "Pop, Rock, Rap, R&B, Country, Jazz, K-Pop, and more",
    icon: Music,
    gradient: "from-fuchsia-500 to-pink-600",
    size: "normal",
  },
  {
    id: 3,
    title: "AI-Powered",
    description: "Advanced language models trained on millions of songs",
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600",
    size: "normal",
  },
  {
    id: 4,
    title: "Customizable",
    description: "Control mood, theme, keywords, and structure",
    icon: Palette,
    gradient: "from-fuchsia-500 to-pink-600",
    size: "normal",
  },
  {
    id: 5,
    title: "7+ Languages",
    description: "Create lyrics in English, Spanish, French, German, Chinese, Japanese, Korean",
    icon: Languages,
    gradient: "from-violet-500 to-purple-600",
    size: "normal",
  },
  {
    id: 6,
    title: "100% Free",
    description: "No signup, no credit card, unlimited generations forever",
    icon: Shield,
    gradient: "from-fuchsia-500 to-pink-600",
    size: "normal",
  },
  {
    id: 7,
    title: "Export Options",
    description: "Copy, download as text, or save as image",
    icon: Download,
    gradient: "from-violet-500 to-purple-600",
    size: "normal",
  },
  {
    id: 8,
    title: "Unlimited Creations",
    description: "Generate as many lyrics as you want, anytime",
    icon: Infinity,
    gradient: "from-fuchsia-500 to-pink-600",
    size: "normal",
  },
]

interface BentoGridProps {
  items?: BentoItem[]
  title?: ReactNode
  lede?: string
}

export function BentoGrid(props: BentoGridProps = {}) {
  const { t } = useLanguage()
  const items = props.items || defaultBentoItems
  const title = props.title || <>Everything You Need to <span className="text-gradient">Create Amazing Lyrics</span></>
  const lede = props.lede || 'Powerful AI tools designed for songwriters, musicians, and creators of all levels'

  return (
    <section className="studio-benefits">
      <div className="studio-shell">
        <div className="studio-section-heading center">
          <span className="studio-eyebrow">FEATURES</span>
          <h2>{title}</h2>
          <p>{lede}</p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
          role="list"
          aria-label="Product features"
        >
          {items.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.id}
                className="group relative rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                role="listitem"
                aria-labelledby={`feature-title-${item.id}`}
              >
                <div className="absolute inset-0 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl" aria-hidden="true" />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} aria-hidden="true" />
                <div className={`absolute -inset-1 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`} aria-hidden="true" />

                <div className="relative h-full flex flex-col">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    aria-hidden="true"
                  >
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>

                  <h3
                    id={`feature-title-${item.id}`}
                    className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300"
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
