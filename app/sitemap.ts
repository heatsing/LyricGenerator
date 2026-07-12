import type { MetadataRoute } from "next"
import { getLandingPageSlugs } from "@/data/landing-pages"

const seoPages = [
  {
    id: 1,
    slug: "happy-pop-lyrics",
  },
  {
    id: 2,
    slug: "sad-pop-lyrics",
  },
  {
    id: 3,
    slug: "romantic-pop-lyrics",
  },
  {
    id: 4,
    slug: "energetic-pop-lyrics",
  },
  {
    id: 5,
    slug: "happy-rock-lyrics",
  },
  {
    id: 6,
    slug: "sad-rap-lyrics",
  },
  {
    id: 7,
    slug: "romantic-rnb-lyrics",
  },
  {
    id: 8,
    slug: "energetic-edm-lyrics",
  },
  {
    id: 9,
    slug: "party-edm-lyrics",
  },
  {
    id: 10,
    slug: "love-pop-lyrics",
  },
  {
    id: 11,
    slug: "breakup-pop-lyrics",
  },
  {
    id: 12,
    slug: "party-rap-lyrics",
  },
  {
    id: 13,
    slug: "inspirational-rock-lyrics",
  },
  {
    id: 14,
    slug: "chill-rnb-lyrics",
  },
  {
    id: 15,
    slug: "dark-rap-lyrics",
  },
  {
    id: 16,
    slug: "nostalgic-country-lyrics",
  },
  {
    id: 17,
    slug: "happy-jazz-lyrics",
  },
  {
    id: 18,
    slug: "romantic-kpop-lyrics",
  },
  {
    id: 19,
    slug: "melancholic-folk-lyrics",
  },
  {
    id: 20,
    slug: "angry-metal-lyrics",
  },
  {
    id: 21,
    slug: "diss-track-lyrics",
  },
  {
    id: 22,
    slug: "love-song-lyrics-for-her",
  },
  {
    id: 23,
    slug: "breakup-song-lyrics",
  },
  {
    id: 24,
    slug: "birthday-song-lyrics",
  },
  {
    id: 25,
    slug: "christmas-song-lyrics",
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lyricgenerator.cc"

  const genres = [
    "rnb",
    "rock",
    "pop",
    "rap",
    "elementary-school-songs",
    "folk",
    "jazz",
    "kpop",
    "country",
    "diss-track",
    "edm",
    "reggae",
    "blues",
    "metal",
    "indie",
    "love-song",
    "christmas-song",
    "birthday-song",
  ]

  const seoSlugs = [
    "happy-pop-lyrics",
    "sad-pop-lyrics",
    "romantic-pop-lyrics",
    "energetic-pop-lyrics",
    "happy-rock-lyrics",
    "sad-rap-lyrics",
    "romantic-rnb-lyrics",
    "energetic-edm-lyrics",
    "party-edm-lyrics",
    "love-pop-lyrics",
    "breakup-pop-lyrics",
    "party-rap-lyrics",
    "inspirational-rock-lyrics",
    "chill-rnb-lyrics",
    "dark-rap-lyrics",
    "nostalgic-country-lyrics",
    "happy-jazz-lyrics",
    "romantic-kpop-lyrics",
    "melancholic-folk-lyrics",
    "angry-metal-lyrics",
    "diss-track-lyrics",
    "love-song-lyrics-for-her",
    "breakup-song-lyrics",
    "birthday-song-lyrics",
    "christmas-song-lyrics",
  ]

  const landingSlugs = getLandingPageSlugs()

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/poem-generator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/story-generator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...landingSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...genres.map((slug) => ({
      url: `${baseUrl}/genre/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...seoSlugs.map((slug) => ({
      url: `${baseUrl}/generator/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ]
}
