import { type NextRequest, NextResponse } from "next/server"
import { afterGeneration, deepseekKey, withGenerationGuard } from "@/lib/generation"

export async function POST(request: NextRequest) {
  try {
    const guard = await withGenerationGuard(request, "poem")
    if (!guard.ok) return guard.response

    const body = await request.json()
    const { style, theme, mood, keywords } = body

    const apiKey = deepseekKey()

    const prompt = `Write a ${style} poem about ${theme} with a ${mood} mood. ${
      keywords ? `Include these keywords: ${keywords}.` : ""
    } Make it beautiful, evocative, and emotionally resonant.`

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
            content: "You are a talented poet who creates beautiful, original poetry in various styles.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.9,
      }),
    })

    const data = await response.json()
    const poem = data.choices[0].message.content
    await afterGeneration({
      userId: guard.session?.user.id ?? null,
      ip: guard.ip,
      action: "poem",
      input: { style, theme, mood, keywords },
      output: poem,
      historyLimit: guard.entitlements.historyLimit,
    })

    return NextResponse.json({ poem })
  } catch (error) {
    console.error("Error generating poem:", error)
    return NextResponse.json({ error: "Failed to generate poem" }, { status: 500 })
  }
}
