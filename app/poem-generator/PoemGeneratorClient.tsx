"use client"

import PoemGenerator from "@/components/poem-generator"
import SubPageShell from "@/components/SubPageShell"
import type { DemoItem } from "@/components/genre-guide"
import {
  Zap,
  Feather,
  Sparkles,
  Palette,
  Languages,
  Shield,
  Download,
  Infinity as InfinityIcon,
  Sliders,
} from "lucide-react"

const poemDemos: DemoItem[] = [
  {
    id: 1,
    title: "Ocean Whispers",
    genre: "Haiku · Nature",
    lyrics: `[Verse 1]
Waves kiss the shore
Salt-laced breeze whispers low
Sun dips to sleep

[Verse 2]
Moonlight on foam
Tide pulls the heart outward
Night sings soft and deep`,
  },
  {
    id: 2,
    title: "City of Stars",
    genre: "Free Verse · Urban",
    lyrics: `[Verse 1]
Neon bleeds into puddles
and the rain doesn't care
that it's Tuesday

[Chorus]
We are all walking
toward something
we can't name yet

[Verse 2]
The train hums a note
that sounds like almost home
almost`,
  },
  {
    id: 3,
    title: "Love's Geometry",
    genre: "Sonnet · Romantic",
    lyrics: `[Verse 1]
Two lines that crossed in distant space and time
Now parallel, they walk the same sweet way
Your hand in mine, a rhythm and a rhyme

[Chorus]
For every angle love has turned to see
It finds its center always back in thee`,
  },
]

const bentoItems = [
  {
    id: 1,
    title: "Lightning Fast",
    description: "Generate beautiful poems in under 5 seconds",
    icon: Zap,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 2,
    title: "20+ Poem Forms",
    description: "Haiku, sonnet, free verse, limerick, ode, and more",
    icon: Feather,
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    id: 3,
    title: "AI-Powered",
    description: "Advanced language models trained on classic and contemporary poetry",
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    title: "Customizable",
    description: "Control form, mood, theme, and imagery",
    icon: Palette,
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    id: 5,
    title: "7+ Languages",
    description: "Write poems in English, Spanish, French, German, Chinese, Japanese, Korean",
    icon: Languages,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 6,
    title: "100% Free",
    description: "No signup, no credit card, unlimited poems forever",
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
    title: "Unlimited Poems",
    description: "Generate as many poems as you want, anytime",
    icon: InfinityIcon,
    gradient: "from-fuchsia-500 to-pink-600",
  },
]

const howItWorksSteps = [
  {
    step: 1,
    title: "Choose Your Form",
    description:
      "Select from 20+ poem forms like haiku, sonnet, free verse, limerick, ode, and more. Pick a mood and theme that matches your vision.",
    icon: Feather,
    color: "from-violet-500 to-purple-600",
  },
  {
    step: 2,
    title: "Customize Details",
    description:
      "Add keywords, topics, or phrases. Choose your preferred language and poem length to fine-tune the output.",
    icon: Sliders,
    color: "from-primary to-accent",
  },
  {
    step: 3,
    title: "Generate with AI",
    description:
      "Our AI creates unique, original poems in seconds. Watch as beautiful verses come to life.",
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
    name: "Emma Carter",
    role: "Poet",
    avatar: "EC",
    rating: 5,
    review:
      "This AI poem generator unlocked a whole new world of imagery for me. I draft a haiku every morning now. It's become my favorite creative ritual.",
  },
  {
    name: "Daniel Park",
    role: "English Teacher",
    avatar: "DP",
    rating: 5,
    review:
      "I use this tool in my creative writing classes to show students different poetic forms. The sonnets it generates are genuinely impressive teaching material.",
  },
  {
    name: "Olivia Brennan",
    role: "Spoken Word Artist",
    avatar: "OB",
    rating: 5,
    review:
      "Before performances, I warm up by generating three poems on a theme. The variety of voices and metaphors this AI produces is remarkable.",
  },
  {
    name: "Raj Mehta",
    role: "Blogger",
    avatar: "RM",
    rating: 5,
    review:
      "I use the poems as intros for my blog posts. Readers love them, and it saves me hours of staring at a blank page every week.",
  },
  {
    name: "Sophia Liu",
    role: "Greeting Card Writer",
    avatar: "SL",
    rating: 5,
    review:
      "My job demands fresh, heartfelt verses daily. This tool doesn't replace my craft, but it's an incredible brainstorming partner.",
  },
  {
    name: "Marcus Webb",
    role: "Literature Student",
    avatar: "MW",
    rating: 5,
    review:
      "Studying poetry structure finally clicked when I could generate examples on demand. The free verse and ode outputs are surprisingly nuanced.",
  },
]

const faqItems = [
  {
    question: "What is an AI Poem Generator and How Does It Work?",
    answer:
      "An AI poem generator uses natural language processing and machine learning to create original poetry. Our generator analyzes thousands of poems across forms like haiku, sonnet, free verse, and ode to understand meter, imagery, and structure. Simply choose your form, mood, and theme, and the AI produces unique verses tailored to your input in seconds.",
  },
  {
    question: "Is the AI Poem Generator Completely Free?",
    answer:
      "Yes! Our poem generator is 100% free with no hidden costs or subscriptions. You can create unlimited poems in any form without creating an account. We believe creative tools should be accessible to everyone — from published poets to students and hobbyists.",
  },
  {
    question: "Can I Use Generated Poems Commercially?",
    answer:
      "All poems created by our AI are 100% original and yours to use freely. Publish them, include them in books, share on social media, use in greeting cards — no attribution required. The AI generates unique content every time, ensuring your poems are original.",
  },
  {
    question: "What Poem Forms Are Supported?",
    answer:
      "Our AI supports 20+ poetic forms including haiku, sonnet, free verse, limerick, ode, tanka, acrostic, ballad, villanelle, and more. Each form follows its traditional structure — syllable counts for haiku, rhyme schemes for sonnets — while letting the AI craft fresh imagery within those constraints.",
  },
  {
    question: "How Long Does It Take to Generate a Poem?",
    answer:
      "Poem generation is instant! Our AI typically completes a poem in 3-8 seconds depending on length and complexity. No waiting, no processing queue — just immediate results. Regenerate as many times as you like to explore different metaphors and directions.",
  },
]

const genresLinks: [string, string][] = [
  ["Haiku Poems", "haiku"],
  ["Sonnet Poems", "sonnet"],
  ["Free Verse", "free-verse"],
  ["Limerick", "limerick"],
  ["Ode Poems", "ode"],
  ["Tanka Poems", "tanka"],
  ["Acrostic", "acrostic"],
  ["Ballad Poems", "ballad"],
  ["Villanelle", "villanelle"],
  ["Love Poems", "love-poems"],
  ["Nature Poems", "nature-poems"],
  ["Sad Poems", "sad-poems"],
  ["Inspirational", "inspirational"],
  ["Funny Poems", "funny-poems"],
  ["Birthday Poems", "birthday-poems"],
  ["Friendship", "friendship-poems"],
]

export default function PoemGeneratorClient() {
  return (
    <SubPageShell
      heroKicker="AI-powered poetry generation"
      heroTitle="Free AI Poem Generator Online"
      heroLede="A free AI poem generator that helps you create beautiful, original poems in any style — haiku, sonnet, free verse, and more."
      generatorTitle="Generate Your Perfect Poem"
      generatorLede="Choose your style, mood, and theme. Our AI will create unique, professional poems in seconds."
      generator={<PoemGenerator />}
      demoTitle="Poem Generator Demo"
      demoDescription="Real examples generated by our AI — explore the quality and structure for yourself"
      demos={poemDemos}
      bentoItems={bentoItems}
      bentoTitle={
        <>
          Everything You Need to <span className="text-gradient">Create Beautiful Poetry</span>
        </>
      }
      bentoLede="Powerful AI tools designed for poets, writers, and language lovers of all levels"
      howItWorksSteps={howItWorksSteps}
      howItWorksTitle={
        <>
          Write Poems in <span className="text-gradient">4 Simple Steps</span>
        </>
      }
      howItWorksLede="Our intuitive process makes poetry writing easy for everyone, from beginners to published poets"
      reviews={reviews}
      testimonialsTitle="Loved by 200K+ Poets & Writers"
      testimonialsLede="Join thousands of poets, students, teachers, and language lovers who trust our AI."
      faqItems={faqItems}
      faqTitle="Frequently Asked Questions"
      faqLede="Everything you need to know about our AI poem generator."
      genresTitle="Generate Poems by Form"
      genresLede="Explore our specialized AI generators for different poetic forms and styles."
      genresLinks={genresLinks}
      finalTitle="Ready to Write Your Next Poem?"
      finalLede="Join over 200,000 poets and writers who use our AI to craft beautiful verses. Start for free, no signup required."
    />
  )
}
