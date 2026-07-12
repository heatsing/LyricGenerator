"use client"

import { Music, Sliders, Sparkles, Download, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

type HowItWorksStep = {
  step: number
  title: string
  description: string
  icon: LucideIcon
  color: string
}

const defaultSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Choose Your Style",
    description: "Select from 15+ genres like Pop, Rock, Rap, R&B, Country, and more. Pick a mood and theme that matches your vision.",
    icon: Music,
    color: "from-violet-500 to-purple-600",
  },
  {
    step: 2,
    title: "Customize Details",
    description: "Add keywords, topics, or phrases. Choose your preferred language and song length to fine-tune the output.",
    icon: Sliders,
    color: "from-primary to-accent",
  },
  {
    step: 3,
    title: "Generate with AI",
    description: "Our AI creates unique, original lyrics in seconds. Watch as professional song structures come to life.",
    icon: Sparkles,
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    step: 4,
    title: "Export & Use",
    description: "Copy to clipboard, download as text, or save as image. Edit directly in the app and regenerate unlimited times.",
    icon: Download,
    color: "from-emerald-500 to-teal-600",
  },
]

interface HowItWorksProps {
  steps?: HowItWorksStep[]
  title?: ReactNode
  lede?: string
}

export function HowItWorks(props: HowItWorksProps = {}) {
  const steps = props.steps || defaultSteps
  const title = props.title || <>Create Lyrics in <span className="text-gradient">4 Simple Steps</span></>
  const lede = props.lede || 'Our intuitive process makes songwriting easy for everyone, from beginners to professionals'

  return (
    <section id="how-it-works" className="py-14 md:py-20 relative overflow-hidden" style={{ background: "var(--soft)" }}>
      {/* Background */}
      <div className="absolute inset-0 -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {lede}
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connection line - desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0" aria-hidden="true" />

            <ol
              className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6"
              role="list"
              aria-label="Steps to create lyrics"
            >
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <li key={step.step} className="relative group">
                    {/* Card */}
                    <article
                      className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 h-full shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-2"
                      aria-labelledby={`step-title-${step.step}`}
                    >
                      {/* Step number badge */}
                      <div
                        className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-primary z-10"
                        aria-hidden="true"
                      >
                        {step.step}
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mt-2 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        aria-hidden="true"
                      >
                        <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>

                      {/* Content */}
                      <h3
                        id={`step-title-${step.step}`}
                        className="text-xl font-bold mb-3 group-hover:text-primary transition-colors"
                      >
                        <span className="sr-only">Step {step.step}: </span>
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </article>

                    {/* Arrow - desktop */}
                    {index < steps.length - 1 && (
                      <div
                        className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-background border border-border items-center justify-center"
                        aria-hidden="true"
                      >
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">Ready to create your first song?</p>
            <Button asChild className="rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:opacity-90 text-white px-6 shadow-lg shadow-[#8b5cf6]/25">
              <a href="#generator" className="inline-flex items-center gap-2 group">
                Start generating now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
