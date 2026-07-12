"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Copy, RotateCw, Download, Loader2, Music2, ImageIcon, Pause, Play, Volume2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

const GENRES = [
  "Pop",
  "Rock",
  "Hip Hop",
  "R&B",
  "Country",
  "Jazz",
  "Electronic",
  "Folk",
  "Metal",
  "Indie",
  "Blues",
  "Reggae",
  "Classical",
  "Latin",
  "K-Pop",
]

const MOODS = [
  "Happy",
  "Sad",
  "Energetic",
  "Calm",
  "Romantic",
  "Angry",
  "Melancholic",
  "Uplifting",
  "Dark",
  "Nostalgic",
  "Playful",
  "Intense",
  "Peaceful",
  "Mysterious",
]

const THEMES = [
  "Love",
  "Heartbreak",
  "Party",
  "Success",
  "Struggle",
  "Dreams",
  "Freedom",
  "Friendship",
  "Nature",
  "Life",
  "Hope",
  "Loss",
  "Adventure",
  "Motivation",
  "Reflection",
]

const LENGTHS = [
  { value: "short", label: "Short (1 verse + chorus)" },
  { value: "medium", label: "Medium (2 verses + chorus)" },
  { value: "long", label: "Long (3 verses + chorus + bridge)" },
]

interface LyricsGeneratorProps {
  presetGenre?: string
}

export default function LyricsGenerator({ presetGenre }: LyricsGeneratorProps) {
  const [genre, setGenre] = useState(presetGenre || "Pop")
  const [mood, setMood] = useState("Happy")
  const [theme, setTheme] = useState("Love")
  const [topic, setTopic] = useState("")
  const [length, setLength] = useState("medium")
  const [language, setLanguage] = useState("English")
  const [lyrics, setLyrics] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { toast } = useToast()
  const { t } = useLanguage()
  const [generationProgress, setGenerationProgress] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleEnded = () => setIsPlaying(false)
      audio.addEventListener("ended", handleEnded)
      return () => audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const handleGenerate = async () => {
    setIsGenerating(true)
    setLyrics("")
    setAudioUrl("")

    // Show progress messages for better UX
    const progressMessages = [
      "Analyzing your preferences...",
      "Finding the perfect rhyme scheme...",
      "Crafting your verses...",
      "Polishing the chorus...",
      "Almost there...",
    ]

    let messageIndex = 0
    const progressInterval = setInterval(() => {
      setGenerationProgress(progressMessages[messageIndex])
      messageIndex = (messageIndex + 1) % progressMessages.length
    }, 1500)

    try {
      const response = await fetch("/api/generate-lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre,
          mood,
          theme,
          topic,
          length,
          language,
        }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error("Failed to generate lyrics")
      }

      const data = await response.json()
      setLyrics(data.lyrics)

      toast({
        title: "Success!",
        description: "Your lyrics have been generated.",
      })
    } catch (error) {
      console.error("[v0] Error generating lyrics:", error)
      clearInterval(progressInterval)
      toast({
        title: "Error",
        description: "Failed to generate lyrics. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      setGenerationProgress("")
    }
  }

  const handleConvertToSong = async () => {
    if (!lyrics) return

    setIsConverting(true)
    try {
      const response = await fetch("/api/lyrics-to-song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lyrics,
          genre,
          mood,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to convert to song")
      }

      const data = await response.json()
      setAudioUrl(data.audioUrl)

      toast({
        title: "Song Created!",
        description: "Your lyrics have been converted to a complete song.",
      })
    } catch (error) {
      console.error("[v0] Error converting to song:", error)
      toast({
        title: "Error",
        description: "Failed to convert lyrics to song. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConverting(false)
    }
  }

  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
          setIsPlaying(false)
        } else {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        // Ignore AbortError when play is interrupted by pause
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("[v0] Audio playback error:", error)
          toast({
            title: "Playback Error",
            description: "Failed to play audio. Please try again.",
            variant: "destructive",
          })
        }
      }
    }
  }

  const handleDownloadAudio = () => {
    if (!audioUrl) return

    const a = document.createElement("a")
    a.href = audioUrl
    a.download = `song-${Date.now()}.mp3`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    toast({
      title: "Downloaded!",
      description: "Song saved to your device.",
    })
  }

  const handleCopy = async () => {
    if (!lyrics) return

    try {
      await navigator.clipboard.writeText(lyrics)
      toast({
        title: "Copied!",
        description: "Lyrics copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy lyrics.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    if (!lyrics) return

    const blob = new Blob([lyrics], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lyrics-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "Lyrics saved to your device.",
    })
  }

  const handleDownloadImage = async () => {
    if (!lyrics) return

    try {
      // Dynamically import html2canvas only when needed
      const html2canvas = (await import("html2canvas")).default

      // Create a temporary container for the lyrics card
      const container = document.createElement("div")
      container.style.position = "fixed"
      container.style.left = "-9999px"
      container.style.width = "800px"
      container.style.padding = "60px"
      container.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      container.style.borderRadius = "24px"
      container.style.fontFamily = "system-ui, -apple-system, sans-serif"

      container.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); padding: 40px; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
            <div>
              <h2 style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin: 0;">AI Lyrics Generator</h2>
              <p style="font-size: 14px; color: #666; margin: 0;">${genre} • ${mood} • ${theme}</p>
            </div>
          </div>
          <div style="white-space: pre-wrap; font-size: 16px; line-height: 1.8; color: #2a2a2a; font-family: 'Georgia', serif;">${lyrics}</div>
        </div>
      `

      document.body.appendChild(container)

      const canvas = await html2canvas(container, {
        scale: 2,
        backgroundColor: null,
      })

      document.body.removeChild(container)

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `lyrics-${Date.now()}.png`
          a.click()
          URL.revokeObjectURL(url)

          toast({
            title: "Downloaded!",
            description: "Lyrics card saved as image.",
          })
        }
      })
    } catch (error) {
      console.error("[v0] Error creating image:", error)
      toast({
        title: "Error",
        description: "Failed to create image. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
      {/* Left Panel - Input Form */}
      <Card className="p-6 lg:p-8 space-y-6 border border-border/50 shadow-soft card-hover bg-card/80 backdrop-blur-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center shadow-lg shadow-[#8b5cf6]/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-balance">{t.generator.customize}</h2>
              <p className="text-sm text-muted-foreground text-pretty">{t.generator.customizeDesc}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="genre">{t.generator.genre}</Label>
              {mounted ? (
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger id="genre" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="h-9 rounded-md border border-input px-3 flex items-center text-sm bg-background truncate">
                  {genre}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mood">{t.generator.mood}</Label>
              {mounted ? (
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger id="mood" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MOODS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="h-9 rounded-md border border-input px-3 flex items-center text-sm bg-background truncate">
                  {mood}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">{t.generator.theme}</Label>
              {mounted ? (
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {THEMES.map((th) => (
                      <SelectItem key={th} value={th}>
                        {th}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="h-9 rounded-md border border-input px-3 flex items-center text-sm bg-background truncate">
                  {theme}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">{t.generator.topic}</Label>
            <Input
              id="topic"
              placeholder={t.generator.topicPlaceholder}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">{t.generator.length}</Label>
            {mounted ? (
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger id="length">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LENGTHS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="h-9 rounded-md border border-input px-3 flex items-center text-sm bg-background truncate">
                {LENGTHS.find((l) => l.value === length)?.label || length}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">{t.generator.language}</Label>
            <Input id="language" placeholder="English" value={language} onChange={(e) => setLanguage(e.target.value)} />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:opacity-90 text-white shadow-lg shadow-[#8b5cf6]/25 btn-shine transition-all duration-300"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {t.generator.generating}
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              {t.generator.generate}
            </>
          )}
        </Button>
      </Card>

      {/* Right Panel - Generated Lyrics */}
      <Card className="p-6 lg:p-8 space-y-4 border border-border/50 shadow-soft bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <Music2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-balance">{t.generator.yourLyrics}</h2>
          </div>
          {lyrics && (
            <div className="flex gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm" title="Copy to clipboard">
                <Copy className="w-4 h-4" />
                <span className="sr-only">Copy lyrics</span>
              </Button>
              <Button onClick={handleDownloadImage} variant="outline" size="sm" title="Download as image">
                <ImageIcon className="w-4 h-4" />
                <span className="sr-only">Download as image</span>
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm" title="Download as text">
                <Download className="w-4 h-4" />
                <span className="sr-only">Download lyrics</span>
              </Button>
              <Button onClick={handleGenerate} variant="outline" size="sm" disabled={isGenerating} title="Regenerate">
                <RotateCw className="w-4 h-4" />
                <span className="sr-only">Regenerate lyrics</span>
              </Button>
            </div>
          )}
        </div>

        <div className="min-h-[500px]">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full py-16">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#8b5cf6] animate-spin" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-2 rounded-full bg-card" />
                <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-primary animate-spin" />
              </div>
              <p className="text-foreground text-center font-medium mt-6">{generationProgress}</p>
              <p className="text-sm text-muted-foreground mt-2">This usually takes 3-5 seconds</p>
              <div className="flex gap-1 mt-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          ) : lyrics ? (
            <div className="space-y-4">
              <Textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="min-h-[450px] font-mono text-sm leading-relaxed resize-none"
                placeholder="Your generated lyrics will appear here..."
              />
              {!audioUrl ? (
                <Button
                  onClick={handleConvertToSong}
                  disabled={isConverting}
                  className="w-full"
                  size="lg"
                  variant="secondary"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Converting to Song...
                    </>
                  ) : (
                    <>
                      <Music2 className="w-5 h-5 mr-2" />
                      Convert Lyrics to Song
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-border/50">
                    <div className="flex items-center gap-4">
                      <Button onClick={togglePlayPause} size="lg" className="w-14 h-14 rounded-full flex-shrink-0">
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                      </Button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Volume2 className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: isPlaying ? "60%" : "0%" }}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {genre} • {mood} • AI Generated Song
                        </p>
                      </div>

                      <Button onClick={handleDownloadAudio} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleConvertToSong}
                    disabled={isConverting}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Regenerate Song
                  </Button>

                  <audio ref={audioRef} src={audioUrl} className="hidden" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <div className="lyric-plain" aria-label="Example generated lyrics">
                <p>[Verse 1]</p>
                <p>We left our names in the boardwalk grain</p>
                <p>Danced through the salt and a midnight rain</p>
                <p>Counted the stars as they fell in line</p>
                <p>Every wish was yours and mine</p>
                <p>&nbsp;</p>
                <p>[Chorus]</p>
                <p>If the summer fades, let the colors stay</p>
                <p>Hold the golden hour one more day</p>
                <p>When the music stops, I'll still hear the tune</p>
                <p>Dancing in the light of a fading moon</p>
                <p>&nbsp;</p>
                <p>[Verse 2]</p>
                <p>Photographs fade but the feeling's loud</p>
                <p>Every heartbeat says it out loud</p>
                <p>Under the neon, under the pines</p>
                <p>You were the poem between the lines</p>
                <p>&nbsp;</p>
                <p>[Bridge]</p>
                <p>And if the morning comes too fast</p>
                <p>I'll freeze the clock, make the moment last</p>
                <p>&nbsp;</p>
                <p>[Outro]</p>
                <p>I still see us in the light</p>
                <p>Burning bright into the night</p>
              </div>
              <p className="text-lg font-medium text-foreground mt-8 mb-2">Ready to Create</p>
              <p className="text-muted-foreground text-balance max-w-xs">{t.generator.createPrompt}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function Music({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}
