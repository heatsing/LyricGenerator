"use client"

import Link from "next/link"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useState, useEffect } from "react"
import { Logo, LogoCompact } from "@/components/Logo"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#f7f5ef]/92 dark:bg-[#101d28]/92 backdrop-blur-xl border-b border-[#152b3a]/10'
        : 'bg-[#f7f5ef] dark:bg-[#101d28] border-b border-[#152b3a]/10'
    }`}>
      <div className="studio-shell py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity group">
          {/* Desktop logo */}
          <div className="hidden sm:block">
            <Logo />
          </div>
          {/* Mobile logo - more compact */}
          <div className="block sm:hidden">
            <LogoCompact />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="relative px-4 py-2 text-sm font-semibold text-foreground hover:text-[#ef634c] transition-colors"
          >
            Lyric Generator
          </Link>
          <Link
            href="/poem-generator"
            className="relative px-4 py-2 text-sm text-muted-foreground hover:text-[#ef634c] transition-colors"
          >
            Poem Generator
          </Link>
          <Link
            href="/story-generator"
            className="relative px-4 py-2 text-sm text-muted-foreground hover:text-[#ef634c] transition-colors"
          >
            Short Story Generator
          </Link>
          <div className="w-px h-6 bg-border mx-2" />
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/login" className="ml-2">
            <Button size="sm" className="rounded-full bg-[#152b3a] hover:bg-[#ef634c] text-white px-5 shadow-none">
              <Sparkles className="w-4 h-4 mr-1.5" />
              Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-primary/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
          <Link
            href="/"
            className="text-base font-medium text-foreground py-3 px-4 min-h-[44px] flex items-center rounded-xl hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Lyric Generator
          </Link>
          <Link
            href="/poem-generator"
            className="text-base text-muted-foreground hover:text-foreground py-3 px-4 min-h-[44px] flex items-center rounded-xl hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Poem Generator
          </Link>
          <Link
            href="/story-generator"
            className="text-base text-muted-foreground hover:text-foreground py-3 px-4 min-h-[44px] flex items-center rounded-xl hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Short Story Generator
          </Link>
          <div className="h-px bg-border my-2" />
          <div className="flex items-center gap-4 px-4 py-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="mt-2">
            <Button size="lg" className="w-full min-h-[44px] bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25">
              <Sparkles className="w-4 h-4 mr-2" />
              Login
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
