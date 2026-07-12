"use client"

import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

type Review = {
  name: string
  role: string
  avatar: string
  rating: number
  review: string
}

const defaultReviews: Review[] = [
  {
    name: "Sarah Johnson",
    role: "Independent Musician",
    avatar: "SJ",
    rating: 5,
    review:
      "This AI lyrics generator has been a game-changer for my songwriting process. I can quickly generate ideas and refine them into amazing songs. Highly recommended!",
  },
  {
    name: "Marcus Chen",
    role: "Music Producer",
    avatar: "MC",
    rating: 5,
    review:
      "The generator creates professional-quality lyrics that I can use in my productions. It's like having a songwriting assistant available 24/7.",
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    avatar: "ER",
    rating: 5,
    review:
      "I use the lyrics generator for my YouTube videos and podcasts. The quality is incredible and it saves me so much time on music creation!",
  },
  {
    name: "David Kim",
    role: "Songwriter",
    avatar: "DK",
    rating: 5,
    review:
      "As a professional songwriter, I was skeptical at first. But this tool has become essential in my creative workflow. The lyrics are surprisingly good!",
  },
  {
    name: "Lisa Thompson",
    role: "Music Teacher",
    avatar: "LT",
    rating: 5,
    review:
      "I use this with my students to teach song structure and lyric writing. It's an amazing educational tool that makes learning fun and interactive.",
  },
  {
    name: "James Wilson",
    role: "Indie Artist",
    avatar: "JW",
    rating: 5,
    review:
      "The lyrics generator is mind-blowing. I've created several tracks with these lyrics that I'm actually releasing. The quality is surprisingly high!",
  },
]

interface CustomerReviewsProps {
  reviews?: Review[]
}

export function CustomerReviews(props: CustomerReviewsProps = {}) {
  const reviews = props.reviews || defaultReviews
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 3) % reviews.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const visibleReviews = [
    reviews[currentIndex % reviews.length],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {visibleReviews.map((review, index) => (
            <Card
              key={`${currentIndex}-${index}`}
              className="p-6 border border-border animate-in fade-in-0 slide-in-from-right-5 duration-500"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">{review.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{review.review}</p>
            </Card>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1].map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentIndex(page * 3)
                setIsAutoPlaying(false)
              }}
              className={`h-2 rounded-full transition-all ${
                Math.floor(currentIndex / 3) === page ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
              aria-label={`Go to page ${page + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10">
          <Star className="w-5 h-5 fill-primary text-primary" />
          <span className="font-semibold">4.9/5</span>
          <span className="text-muted-foreground">from over 10,000+ reviews</span>
        </div>
      </div>
    </div>
  )
}

export default CustomerReviews
