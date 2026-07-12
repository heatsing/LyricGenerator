"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export const faqData = [
  {
    question: "What is an AI Lyrics Generator and How Does It Work?",
    answer:
      "An AI lyrics generator is a sophisticated tool that uses artificial intelligence and natural language processing to create original song lyrics. Our generator analyzes thousands of successful songs across different genres to understand patterns, rhyme schemes, and lyrical structures. Simply input your preferences for genre, mood, theme, and any keywords, and the AI will instantly generate unique, creative lyrics tailored to your specifications. The technology behind it uses advanced machine learning models trained on diverse musical styles to ensure authenticity and creativity in every generation.",
  },
  {
    question: "Is the AI Lyrics Generator Completely Free?",
    answer:
      "Yes! Our AI lyrics generator is 100% free to use with no hidden costs or subscriptions required. You can generate unlimited lyrics for any genre, mood, or theme without creating an account or providing payment information. We believe in democratizing creativity and making songwriting tools accessible to everyone - from professional musicians to hobbyists and students. All generated lyrics are yours to use freely for personal or commercial projects.",
  },
  {
    question: "Can I Use Generated Lyrics for Commercial Music Projects?",
    answer:
      "All lyrics created by our AI generator are 100% original and copyright-free. You have full rights to use them for any purpose including recording songs, live performances, YouTube videos, streaming platforms, commercial releases, and more. No attribution is required, though we always appreciate it. The AI creates unique content every time, ensuring your lyrics are completely original and won't conflict with existing copyrighted material.",
  },
  {
    question: "What Music Genres and Styles Are Supported?",
    answer:
      "Our AI supports 15+ music genres including Pop, Rock, Hip Hop/Rap, R&B, Country, Jazz, Blues, EDM, Folk, Metal, Indie, Reggae, K-Pop, and more. Each genre is optimized with specific lyrical patterns, vocabulary, and themes authentic to that style. Whether you need catchy pop hooks, introspective indie lyrics, hard-hitting rap verses, or soulful R&B ballads, our AI understands the nuances of each genre and creates lyrics that sound professional and genre-appropriate.",
  },
  {
    question: "How Long Does It Take to Generate Lyrics?",
    answer:
      "Lyrics generation is instant! Our advanced AI typically generates complete, professional-quality lyrics in 3-10 seconds depending on your specified length and complexity. There's no waiting list, no processing delays - just immediate results. You can regenerate as many times as you want to explore different creative directions, making it perfect for brainstorming sessions or when you need quick inspiration.",
  },
]

// Generate FAQ structured data for SEO
export function generateFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function FAQ({ faqData: customFaqData }: { faqData?: { question: string; answer: string }[] } = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const data = customFaqData || faqData

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQStructuredData()),
        }}
      />

      <div className="max-w-3xl mx-auto space-y-3" role="list" aria-label="Frequently asked questions">
        {data.map((faq, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl overflow-hidden"
            role="listitem"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span className="font-semibold pr-8 text-pretty">{faq.question}</span>
              <ChevronDown
                className={cn("w-5 h-5 text-muted-foreground transition-transform flex-shrink-0", {
                  "transform rotate-180": openIndex === index,
                })}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={cn("overflow-hidden transition-all duration-300 ease-in-out", {
                "max-h-0": openIndex !== index,
                "max-h-[1000px]": openIndex === index,
              })}
              hidden={openIndex !== index}
            >
              <div className="px-5 pb-4 text-muted-foreground leading-relaxed text-pretty">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default FAQ
