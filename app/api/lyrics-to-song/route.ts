import { NextResponse } from "next/server"
import { getSessionUser, forbidden, unauthorized } from "@/lib/session"
import { afterGeneration } from "@/lib/generation"

export async function POST(req: Request) {
  try {
    const session = await getSessionUser()
    if (!session) return unauthorized("Sign in to convert lyrics to song.")
    if (!session.entitlements.lyricsToSong) {
      return forbidden("Lyrics-to-song is a Pro feature. Upgrade to continue.")
    }

    const { lyrics, genre, mood } = await req.json()
    if (!lyrics || typeof lyrics !== "string") {
      return NextResponse.json({ error: "Lyrics are required." }, { status: 400 })
    }

    await new Promise((resolve) => setTimeout(resolve, 800))

    const sampleAudios = [
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    ]
    const audioUrl = sampleAudios[Math.floor(Math.random() * sampleAudios.length)]
    await afterGeneration({
      userId: session.user.id,
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
      action: "song",
      input: { genre, mood },
      output: audioUrl,
      historyLimit: session.entitlements.historyLimit,
    })

    return NextResponse.json({
      audioUrl,
      message: "Song generated successfully",
    })
  } catch (error) {
    console.error("[v0] Error in lyrics-to-song API:", error)
    return NextResponse.json({ error: "Failed to convert lyrics to song" }, { status: 500 })
  }
}
