import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LyricsGenerator from "@/components/lyrics-generator"
import SubPageShell from "@/components/SubPageShell"
import { genreDemos } from "@/data/genre-demos"

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
    <SubPageShell
      heroKicker={`AI-powered ${data.name} lyrics generation`}
      heroTitle={data.displayName}
      heroLede={data.description}
      generatorTitle={`Generate Your Perfect ${data.name} Lyrics`}
      generatorLede={`Choose your genre, mood, and theme. Our AI will create unique, professional ${data.name} lyrics in seconds.`}
      generator={<LyricsGenerator presetGenre={data.name} />}
      demos={genreDemos[slug] || genreDemos["pop"]}
      demoTitle={`${data.name} Lyrics Demo`}
      finalTitle={`Ready to Create Your Next ${data.name} Hit?`}
    />
  )
}
