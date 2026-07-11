"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import PoemGenerator from "@/components/poem-generator"
import { BookOpen, Sparkles, Zap, ArrowRight, Feather, Heart, PenTool } from "lucide-react"
import FAQ from "@/components/faq"
import CustomerReviews from "@/components/customer-reviews"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ToolContentGuide } from "@/components/ToolContentGuide"

export default function PoemGeneratorClient() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Global background effects */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-white/10 shadow-lg">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Free
              </span>
              <span className="text-sm text-muted-foreground">AI-powered poetry generation</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="block text-foreground">Create Beautiful</span>
              <span className="block text-gradient mt-2">Poems with AI</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Generate original poems instantly. Perfect for haikus, sonnets, free verse, limericks, and more. 100% free, no signup required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="#generator">
                <Button size="lg" className="h-14 px-8 text-base bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/25 group">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Start Creating
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
            Generate Your <span className="text-gradient">Perfect Poem</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your style, mood, and theme. Our AI will create unique, beautiful poetry in seconds.
          </p>
        </div>
        <PoemGenerator />
      </section>

      <ToolContentGuide toolName="AI Poem Generator" kind="poem" />

      {/* Features Section - Bento Style */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-muted/20" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
              Why Choose Our <span className="text-gradient">Poem Generator</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful AI tools designed for poets, students, and creative writers of all levels
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  Instant Creation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generate beautiful poems in seconds with our advanced AI technology. No waiting, no limits.
                </p>
              </div>
            </div>

            <div className="group relative rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Feather className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  Multiple Styles
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create haikus, sonnets, free verse, limericks, acrostic poems, and many other poetic forms.
                </p>
              </div>
            </div>

            <div className="group relative rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  100% Original
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every poem is uniquely generated by AI, ensuring original content for your creative projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
            Create Poems in <span className="text-gradient">3 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our intuitive process makes poetry creation easy for everyone
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: 1, title: "Choose Style", desc: "Select your preferred poetry style - haiku, sonnet, free verse, or more", icon: PenTool },
            { step: 2, title: "Set Theme", desc: "Pick a mood and theme, add optional keywords or topics", icon: Sparkles },
            { step: 3, title: "Generate", desc: "Click generate and get your unique poem instantly", icon: BookOpen },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.step} className="relative group">
                <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 h-full shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-primary z-10">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-6 mt-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-muted/20" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
              Loved by <span className="text-gradient">Poets Worldwide</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of writers and poets who trust our AI for their creative work
            </p>
          </div>
          <CustomerReviews />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about our AI poem generator
          </p>
        </div>
        <FAQ />
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Ready to Create Your <span className="text-gradient">Masterpiece?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Start writing beautiful poetry today. Free, unlimited, and powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#generator">
                <Button size="lg" className="h-14 px-8 text-base bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/25 group">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
