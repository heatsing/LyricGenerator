import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, ArrowRight, Music2, Target, Award } from "lucide-react"
import LyricsGenerator from "@/components/lyrics-generator"
import FAQ from "@/components/faq"
import CustomerReviews from "@/components/customer-reviews"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ToolContentGuide } from "@/components/ToolContentGuide"

const genreData: Record<
  string,
  {
    name: string
    displayName: string
    description: string
    keywords: string[]
  }
> = {
  rnb: {
    name: "R&B",
    displayName: "R&B Lyrics Generator",
    description:
      "Create smooth, soulful R&B lyrics with AI. Perfect for rhythm and blues songs featuring emotional vocals, harmonies, and groove-oriented melodies.",
    keywords: ["R&B lyrics", "soul music", "rhythm and blues", "RnB songwriter", "smooth vocals"],
  },
  rock: {
    name: "Rock",
    displayName: "Rock Lyrics Generator",
    description:
      "Generate powerful rock lyrics with AI. Perfect for rock anthems featuring electric guitars, drums, and rebellious themes.",
    keywords: ["rock lyrics", "rock music", "guitar rock", "rock songwriter", "hard rock"],
  },
  pop: {
    name: "Pop",
    displayName: "Pop Lyrics Generator",
    description:
      "Create catchy pop lyrics with AI. Perfect for radio-friendly pop songs featuring memorable hooks and upbeat melodies.",
    keywords: ["pop lyrics", "pop music", "catchy songs", "pop songwriter", "top 40"],
  },
  rap: {
    name: "Hip Hop",
    displayName: "Rap Lyrics Generator",
    description:
      "Generate authentic rap lyrics with AI. Perfect for hip-hop tracks featuring rhythmic flow, wordplay, and urban storytelling.",
    keywords: ["rap lyrics", "hip hop", "rap songwriter", "freestyle rap", "urban music"],
  },
  "elementary-school-songs": {
    name: "Pop",
    displayName: "Elementary School Songs Generator",
    description:
      "Create fun, educational songs for elementary school kids with AI. Perfect for classroom sing-alongs, learning activities, and children's entertainment.",
    keywords: ["kids songs", "children's music", "educational songs", "elementary school", "kids lyrics"],
  },
  folk: {
    name: "Folk",
    displayName: "Folk Lyrics Generator",
    description:
      "Generate authentic folk lyrics with AI. Perfect for acoustic folk songs featuring storytelling, traditional themes, and organic sounds.",
    keywords: ["folk lyrics", "folk music", "acoustic songs", "folk songwriter", "traditional music"],
  },
  jazz: {
    name: "Jazz",
    displayName: "Jazz Lyrics Generator",
    description:
      "Create sophisticated jazz lyrics with AI. Perfect for jazz standards featuring complex harmonies, improvisation, and timeless elegance.",
    keywords: ["jazz lyrics", "jazz music", "jazz standards", "swing music", "jazz songwriter"],
  },
  kpop: {
    name: "K-Pop",
    displayName: "K-Pop Lyrics Generator",
    description:
      "Generate trendy K-Pop lyrics with AI. Perfect for Korean pop songs featuring catchy hooks, powerful performances, and global appeal.",
    keywords: ["K-Pop lyrics", "Korean pop", "Kpop songwriter", "Korean music", "K-Pop songs"],
  },
  country: {
    name: "Country",
    displayName: "Country Lyrics Generator",
    description:
      "Create authentic country lyrics with AI. Perfect for country songs featuring storytelling, heartfelt emotions, and rural themes.",
    keywords: ["country lyrics", "country music", "country songwriter", "Nashville", "country western"],
  },
  "diss-track": {
    name: "Hip Hop",
    displayName: "Diss Track Lyrics Generator",
    description:
      "Generate bold diss track lyrics with AI. Perfect for rap battles featuring clever wordplay, sharp disses, and competitive energy.",
    keywords: ["diss track", "rap battle", "diss lyrics", "battle rap", "beef tracks"],
  },
  edm: {
    name: "Electronic",
    displayName: "EDM Lyrics Generator",
    description:
      "Generate high-energy EDM lyrics with AI. Perfect for electronic dance music featuring pulsing beats, drops, and festival anthems.",
    keywords: ["EDM lyrics", "electronic dance music", "festival anthems", "DJ music", "dance lyrics"],
  },
  reggae: {
    name: "Reggae",
    displayName: "Reggae Lyrics Generator",
    description:
      "Create authentic reggae lyrics with AI. Perfect for reggae music featuring positive vibes, social messages, and island rhythms.",
    keywords: ["reggae lyrics", "reggae music", "island vibes", "roots reggae", "dancehall"],
  },
  blues: {
    name: "Blues",
    displayName: "Blues Lyrics Generator",
    description:
      "Generate soulful blues lyrics with AI. Perfect for blues music featuring emotional depth, storytelling, and classic 12-bar progressions.",
    keywords: ["blues lyrics", "blues music", "12-bar blues", "soul blues", "blues songwriter"],
  },
  metal: {
    name: "Metal",
    displayName: "Metal Lyrics Generator",
    description:
      "Create powerful metal lyrics with AI. Perfect for heavy metal music featuring intense themes, powerful vocals, and aggressive energy.",
    keywords: ["metal lyrics", "heavy metal", "metal music", "hard rock", "metal songwriter"],
  },
  indie: {
    name: "Indie",
    displayName: "Indie Lyrics Generator",
    description:
      "Generate authentic indie lyrics with AI. Perfect for indie music featuring introspective themes, unique perspectives, and alternative sounds.",
    keywords: ["indie lyrics", "indie music", "alternative rock", "indie songwriter", "indie pop"],
  },
  "love-song": {
    name: "Pop",
    displayName: "Love Song Lyrics Generator",
    description:
      "Create romantic love song lyrics with AI. Perfect for expressing feelings of love, relationships, and emotional connections through music.",
    keywords: ["love song lyrics", "romantic lyrics", "relationship songs", "love music", "romantic ballads"],
  },
  "christmas-song": {
    name: "Pop",
    displayName: "Christmas Song Generator",
    description:
      "Generate festive Christmas song lyrics with AI. Perfect for holiday music featuring joy, celebration, and seasonal themes.",
    keywords: ["christmas songs", "holiday lyrics", "festive music", "christmas carols", "holiday songs"],
  },
  "birthday-song": {
    name: "Pop",
    displayName: "Birthday Song Generator",
    description:
      "Create personalized birthday song lyrics with AI. Perfect for celebrating special days with custom, memorable birthday music.",
    keywords: ["birthday songs", "celebration lyrics", "party music", "birthday celebrations", "custom songs"],
  },
}

export async function generateStaticParams() {
  return Object.keys(genreData).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = genreData[slug]

  if (!data) {
    return {
      title: "Genre Not Found | AI Lyrics Generator",
      description: "The requested genre page could not be found. Return to homepage to explore all available genres.",
    }
  }

  return {
    title: `${data.displayName} | Free AI-Powered Song Lyrics | Create ${data.name} Music`,
    description: data.description,
    keywords: [...data.keywords, "AI lyrics generator", "free lyrics", "song writing", "music creation"].join(", "),
    openGraph: {
      title: `${data.displayName} - AI Lyrics Generator`,
      description: data.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.displayName}`,
      description: data.description,
    },
  }
}

export default async function GenrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = genreData[slug]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Genre Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

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
              <span className="text-sm text-muted-foreground">AI-Powered {data.name} Lyrics</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] break-words">
              <span className="block text-foreground">{data.displayName.split(' ')[0]}</span>
              <span className="block text-gradient mt-2">{data.displayName.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {data.description}
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
            Generate Your <span className="text-gradient">Perfect {data.name} Lyrics</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your mood and theme. Our AI will create unique, professional {data.name.toLowerCase()} lyrics in seconds.
          </p>
        </div>
        <LyricsGenerator presetGenre={data.name} />
      </section>

      <ToolContentGuide toolName={data.displayName} kind="lyrics" style={data.name} />

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-muted/20" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
              Why Use Our <span className="text-gradient">{data.name} Lyrics Generator</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful AI tools designed specifically for creating authentic {data.name.toLowerCase()} lyrics
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
                  Instant Generation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generate professional {data.name.toLowerCase()} lyrics in seconds with our advanced AI technology.
                </p>
              </div>
            </div>

            <div className="group relative rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  Genre-Specific
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tailored specifically for {data.name.toLowerCase()} music with authentic style and vocabulary.
                </p>
              </div>
            </div>

            <div className="group relative rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  100% Original
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every lyric is uniquely generated by AI, ensuring original content without copyright concerns.
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
            How to Generate <span className="text-gradient">{data.name} Lyrics</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create professional {data.name.toLowerCase()} lyrics in three simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: 1, title: "Select Preferences", desc: `Choose your preferred mood, theme, and any specific keywords for your ${data.name.toLowerCase()} lyrics`, icon: Sparkles },
            { step: 2, title: "Generate Instantly", desc: `Click generate and watch as our AI creates unique ${data.name.toLowerCase()} lyrics tailored to your specifications`, icon: Zap },
            { step: 3, title: "Edit & Export", desc: "Review your lyrics, make any edits, and export them for your music projects", icon: Music2 },
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
              Loved by <span className="text-gradient">{data.name} Musicians</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of {data.name.toLowerCase()} artists who trust our AI for their creative work
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
            Everything you need to know about our {data.name} lyrics generator
          </p>
        </div>
        <FAQ />
      </section>

      {/* Genre Quick Links Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-muted/30" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Explore
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
              Generate Lyrics by <span className="text-gradient">Genre</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our specialized AI generators for different music styles
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {Object.entries(genreData).map(([genreSlug, genreInfo]) => (
              <Link key={genreSlug} href={`/genre/${genreSlug}`}>
                <Button
                  variant="outline"
                  className={`w-full h-12 text-sm font-medium glass border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 ${
                    slug === genreSlug ? "bg-primary text-primary-foreground border-primary" : ""
                  }`}
                >
                  {genreInfo.name} Lyrics
                </Button>
              </Link>
            ))}
          </div>
        </div>
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
              Ready to Create Your <span className="text-gradient">Next {data.name} Hit?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Start writing amazing {data.name.toLowerCase()} lyrics today. Free, unlimited, and powered by AI.
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
