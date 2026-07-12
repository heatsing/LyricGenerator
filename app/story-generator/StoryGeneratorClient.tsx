"use client"

import StoryGenerator from "@/components/story-generator"
import SubPageShell from "@/components/SubPageShell"
import type { DemoItem } from "@/components/genre-guide"
import {
  Zap,
  BookOpen,
  Sparkles,
  Palette,
  Languages,
  Shield,
  Download,
  Infinity as InfinityIcon,
  Sliders,
} from "lucide-react"

const storyDemos: DemoItem[] = [
  {
    id: 1,
    title: "The Lighthouse Keeper",
    genre: "Mystery · Atmospheric",
    lyrics: `[Opening]
The storm had been raging for three nights when Elias first saw the light — not from his lighthouse, but from the sea itself.

[Conflict]
A boat, empty save for a lantern still burning, washed ashore at dawn. Inside, a journal bound in oilskin, its pages filled with coordinates that pointed to nowhere on any map.

[Resolution]
Elias followed the coordinates into the fog, and what he found beneath the waves would change the meaning of "keeping the light" forever.`,
  },
  {
    id: 2,
    title: "Pixels of the Past",
    genre: "Sci-Fi · Reflective",
    lyrics: `[Opening]
The last archive on Earth wasn't made of paper or stone — it was a single crystal, no larger than a thimble, holding every story humanity had ever told.

[Conflict]
Mira's job was to read them, one by one, before the sun swallowed the planet. Today she found a story that hadn't been written by any human hand.

[Resolution]
It was written by the archive itself — a final story about what it meant to remember, and what it cost to be the last one listening.`,
  },
  {
    id: 3,
    title: "The Midnight Bakery",
    genre: "Fantasy · Whimsical",
    lyrics: `[Opening]
Only those who were truly lost could find the bakery that opened at midnight and closed at dawn.

[Conflict]
Lina stumbled in after a terrible day, ordered a loaf of "courage," and was handed a warm, golden bread that glowed faintly in her hands.

[Resolution]
One bite, and the fears she'd carried for years turned into moths — fluttering out of her chest and toward the moon, never to return.`,
  },
]

const bentoItems = [
  {
    id: 1,
    title: "Lightning Fast",
    description: "Generate complete short stories in under 10 seconds",
    icon: Zap,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 2,
    title: "15+ Genres",
    description: "Fantasy, mystery, romance, sci-fi, horror, literary, and more",
    icon: BookOpen,
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    id: 3,
    title: "AI-Powered",
    description: "Advanced language models trained on storytelling craft",
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    title: "Customizable",
    description: "Control genre, tone, length, characters, and theme",
    icon: Palette,
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    id: 5,
    title: "7+ Languages",
    description: "Write stories in English, Spanish, French, German, Chinese, Japanese, Korean",
    icon: Languages,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 6,
    title: "100% Free",
    description: "No signup, no credit card, unlimited stories forever",
    icon: Shield,
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    id: 7,
    title: "Export Options",
    description: "Copy, download as text, or save as image",
    icon: Download,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 8,
    title: "Unlimited Stories",
    description: "Generate as many stories as you want, anytime",
    icon: InfinityIcon,
    gradient: "from-fuchsia-500 to-pink-600",
  },
]

const howItWorksSteps = [
  {
    step: 1,
    title: "Choose Your Genre",
    description:
      "Select from 15+ genres like fantasy, mystery, romance, sci-fi, horror, and more. Pick a tone and theme that matches your vision.",
    icon: BookOpen,
    color: "from-violet-500 to-purple-600",
  },
  {
    step: 2,
    title: "Customize Details",
    description:
      "Add characters, settings, or plot points. Choose your preferred language and story length to fine-tune the output.",
    icon: Sliders,
    color: "from-primary to-accent",
  },
  {
    step: 3,
    title: "Generate with AI",
    description:
      "Our AI creates unique, original stories in seconds. Watch as vivid narratives come to life.",
    icon: Sparkles,
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    step: 4,
    title: "Export & Use",
    description:
      "Copy to clipboard, download as text, or save as image. Edit directly in the app and regenerate unlimited times.",
    icon: Download,
    color: "from-emerald-500 to-teal-600",
  },
]

const reviews = [
  {
    name: "Alex Rivera",
    role: "Novelist",
    avatar: "AR",
    rating: 5,
    review:
      "When I'm stuck on a plot point, I generate three versions with this tool and pick the direction that sparks. It's like having a brainstorming partner who never gets tired.",
  },
  {
    name: "Nina Patel",
    role: "Screenwriter",
    avatar: "NP",
    rating: 5,
    review:
      "I use the story generator to explore character backstories and alternative scenes. The sci-fi and mystery outputs are genuinely surprising — in a good way.",
  },
  {
    name: "Tom Henderson",
    role: "Blogger",
    avatar: "TH",
    rating: 5,
    review:
      "Every week I need a fresh short story for my newsletter. This tool saves me hours and the quality is consistently better than what I could draft alone.",
  },
  {
    name: "Jessica Wong",
    role: "Creative Writing Student",
    avatar: "JW",
    rating: 5,
    review:
      "Studying narrative structure finally made sense when I could generate examples on demand. The way it handles conflict and resolution is remarkably taught.",
  },
  {
    name: "Marcus Cole",
    role: "Game Designer",
    avatar: "MC",
    rating: 5,
    review:
      "I prototype lore and side-quest narratives with this AI daily. It gives me a foundation to build on rather than starting from a blank page every time.",
  },
  {
    name: "Priya Sharma",
    role: "Children's Author",
    avatar: "PS",
    rating: 5,
    review:
      "The fantasy outputs are perfect inspiration for my children's books. I don't use them verbatim, but they spark ideas I'd never have found alone.",
  },
]

const faqItems = [
  {
    question: "What is an AI Story Generator and How Does It Work?",
    answer:
      "An AI story generator uses natural language processing and machine learning to craft original short stories. Our generator analyzes thousands of narratives across genres like fantasy, mystery, romance, and sci-fi to understand plot structure, character development, and pacing. Provide your genre, tone, and theme, and the AI produces a unique story in seconds.",
  },
  {
    question: "Is the AI Story Generator Completely Free?",
    answer:
      "Yes! Our story generator is 100% free with no hidden costs. You can create unlimited stories in any genre without signing up. We believe creative tools should be accessible to everyone — from published novelists to hobbyists and students.",
  },
  {
    question: "Can I Use Generated Stories Commercially?",
    answer:
      "All stories created by our AI are 100% original and yours to use freely. Publish them, include them in anthologies, post on your blog, use in games — no attribution required. The AI generates unique content every time, ensuring your stories are original.",
  },
  {
    question: "What Story Genres Are Supported?",
    answer:
      "Our AI supports 15+ genres including fantasy, mystery, romance, sci-fi, horror, literary fiction, thriller, historical, adventure, comedy, drama, and more. Each genre is optimized with appropriate conventions, vocabulary, and narrative arcs authentic to that style.",
  },
  {
    question: "How Long Does It Take to Generate a Story?",
    answer:
      "Story generation takes just 5-10 seconds depending on length and complexity. No waiting list, no processing delays — immediate results. Regenerate as many times as you want to explore different plot directions and character choices.",
  },
]

const genresLinks: [string, string][] = [
  ["Fantasy Stories", "fantasy"],
  ["Mystery Stories", "mystery"],
  ["Romance Stories", "romance"],
  ["Sci-Fi Stories", "sci-fi"],
  ["Horror Stories", "horror"],
  ["Thriller", "thriller"],
  ["Adventure", "adventure"],
  ["Literary", "literary"],
  ["Historical", "historical"],
  ["Comedy", "comedy"],
  ["Drama", "drama"],
  ["Children", "children"],
  ["Young Adult", "young-adult"],
  ["Crime", "crime"],
  ["Western", "western"],
  ["Fairy Tale", "fairy-tale"],
]

export default function StoryGeneratorClient() {
  return (
    <SubPageShell
      heroKicker="AI-powered story generation"
      heroTitle="Free AI Story Generator Online"
      heroLede="A free AI story generator that helps you craft original, engaging short stories in any genre — fantasy, mystery, romance, sci-fi, and more."
      generatorTitle="Generate Your Perfect Story"
      generatorLede="Choose your genre, tone, and theme. Our AI will create unique, captivating stories in seconds."
      generator={<StoryGenerator />}
      demoTitle="Story Generator Demo"
      demoDescription="Real examples generated by our AI — explore the quality and creativity for yourself"
      demos={storyDemos}
      bentoItems={bentoItems}
      bentoTitle={
        <>
          Everything You Need to <span className="text-gradient">Craft Amazing Stories</span>
        </>
      }
      bentoLede="Powerful AI tools designed for writers, novelists, and storytellers of all levels"
      howItWorksSteps={howItWorksSteps}
      howItWorksTitle={
        <>
          Write Stories in <span className="text-gradient">4 Simple Steps</span>
        </>
      }
      howItWorksLede="Our intuitive process makes storytelling easy for everyone, from beginners to published authors"
      reviews={reviews}
      testimonialsTitle="Loved by 150K+ Writers & Storytellers"
      testimonialsLede="Join thousands of novelists, bloggers, students, and storytellers who trust our AI."
      faqItems={faqItems}
      faqTitle="Frequently Asked Questions"
      faqLede="Everything you need to know about our AI story generator."
      genresTitle="Generate Stories by Genre"
      genresLede="Explore our specialized AI generators for different story genres and styles."
      genresLinks={genresLinks}
      finalTitle="Ready to Write Your Next Story?"
      finalLede="Join over 150,000 writers and storytellers who use our AI to craft amazing narratives. Start for free, no signup required."
    />
  )
}
