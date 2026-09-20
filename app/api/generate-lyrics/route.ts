import { afterGeneration, deepseekKey, withGenerationGuard } from "@/lib/generation"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const guard = await withGenerationGuard(req, "lyrics")
    if (!guard.ok) return guard.response

    const { genre, mood, theme, topic, length, language } = await req.json()

    const lengthInstructions = {
      short: "1 verse and 1 chorus",
      medium: "2 verses, 1 chorus (repeated after each verse), and possibly a pre-chorus",
      long: "3 verses, 1 chorus (repeated after each verse), 1 bridge, and possibly a pre-chorus and outro",
    }

    const prompt = `You are a professional songwriter and lyricist with expertise in ${genre} music. Generate original and creative song lyrics with the following specifications:

Genre: ${genre}
Mood: ${mood}
Theme: ${theme}
${topic ? `Additional Topic/Keywords: ${topic}` : ""}
Length: ${lengthInstructions[length as keyof typeof lengthInstructions]}
Language: ${language}

CRITICAL FORMATTING REQUIREMENTS:
- MUST use clear section labels in square brackets: [Verse 1], [Chorus], [Verse 2], [Bridge], [Pre-Chorus], [Outro]
- Each section MUST be separated by blank lines for readability
- The [Chorus] MUST be IDENTICAL each time it repeats (copy exact same lyrics)
- Use proper ${genre} song structure with genre-appropriate verse/chorus patterns
- Label each section clearly - this is MANDATORY for professional presentation

Genre-Specific Guidelines for ${genre}:
${genre === "Hip Hop" || genre === "Rap" ? "- Focus on wordplay, internal rhymes, and flow\n- Use 16-bar verses with strong punchlines\n- Include metaphors and vivid imagery" : ""}
${genre === "Pop" ? "- Create catchy, memorable hooks\n- Use simple, relatable language\n- Focus on emotional directness and singability" : ""}
${genre === "Rock" ? "- Use powerful, energetic language\n- Include rebellion or passion themes\n- Create anthemic choruses" : ""}
${genre === "Country" ? "- Tell a clear story with authentic emotions\n- Use down-to-earth language and imagery\n- Include relatable life experiences" : ""}
${genre === "R&B" ? "- Emphasize smooth, soulful expressions\n- Focus on love, relationships, or emotions\n- Use melodic phrasing" : ""}
- Write authentic, emotionally resonant lyrics that match the ${mood} mood
- Use vivid imagery and metaphors appropriate for ${genre} music
- Ensure natural flow with strong rhythm and rhyme scheme suitable for ${genre}
- Make the theme of "${theme}" central and meaningful throughout
- Be creative and original - avoid clichés and overused phrases
- Make it memorable, singable, and emotionally engaging
- Include storytelling elements that create an emotional journey

REQUIRED OUTPUT FORMAT EXAMPLE:
[Verse 1]
(4-8 lines of lyrics here)

[Pre-Chorus] (optional, if appropriate for genre)
(2-4 lines of lyrics here)

[Chorus]
(4-8 lines of lyrics here - make this the most memorable part)

[Verse 2]
(4-8 lines of lyrics here - continue the story)

[Chorus]
(repeat EXACT same chorus lyrics from above)

[Bridge] (if length is long)
(4-6 lines of lyrics here - provide contrast or new perspective)

[Chorus]
(repeat EXACT same chorus lyrics one final time)

[Outro] (optional)
(2-4 lines to close the song)

Generate the complete song lyrics now with proper structure labels and formatting:`

    const apiKey = deepseekKey()

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "You are a professional songwriter and lyricist who creates structured, well-formatted lyrics with clear section labels. You ALWAYS use proper formatting with [Verse 1], [Chorus], [Bridge] labels.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.9,
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error("[generate-lyrics] DeepSeek", response.status, detail.slice(0, 180))
      if (response.status === 402) {
        return Response.json({ error: "Lyric generation is temporarily unavailable." }, { status: 503 })
      }
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    const lyrics = data.choices[0].message.content
    await afterGeneration({
      userId: guard.session?.user.id ?? null,
      ip: guard.ip,
      action: "lyrics",
      input: { genre, mood, theme, topic, length, language },
      output: lyrics,
      historyLimit: guard.entitlements.historyLimit,
    })

    return Response.json({ lyrics })
  } catch (error) {
    console.error("[v0] Error in generate-lyrics API:", error)
    return Response.json({ error: "Failed to generate lyrics" }, { status: 500 })
  }
}
