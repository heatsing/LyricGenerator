"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { languages } from "@/lib/i18n"
import { useEffect, useState } from "react"

function LanguageSwitcherInner() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">{languages[language].name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, { name, flag }]) => (
          <DropdownMenuItem key={code} onClick={() => setLanguage(code as keyof typeof languages)} className="gap-2">
            <span>{flag}</span>
            <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { LanguageSwitcher }
export default function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="gap-2" suppressHydrationWarning>
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">English</span>
      </Button>
    )
  }
  return <LanguageSwitcherInner />
}
