export function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      role="img"
      aria-label="Lyric Generator.cc - AI-powered Lyrics Generator"
    >
      {/* Logo Icon */}
      <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <svg
          className="w-10 h-10"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Wave lines (gray) */}
          <path
            d="M10 52c8-4 16 2 24-2s16-6 24-2 12 6 18 2"
            stroke="currentColor"
            className="text-muted-foreground/40"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M10 58c8-4 16 2 24-2s16-6 24-2 12 6 18 2"
            stroke="currentColor"
            className="text-muted-foreground/30"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14 64c6-3 12 1 18-1s12-4 18-1 10 4 14 1"
            stroke="currentColor"
            className="text-muted-foreground/20"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Equalizer bars (purple) */}
          <rect x="18" y="32" width="4" height="8" rx="1" fill="#8b5cf6" />
          <rect x="24" y="26" width="4" height="14" rx="1" fill="#8b5cf6" />
          <rect x="30" y="20" width="4" height="20" rx="1" fill="#8b5cf6" />
          <rect x="36" y="14" width="4" height="26" rx="1" fill="#8b5cf6" />

          {/* Stem line (gray) */}
          <line x1="46" y1="8" x2="46" y2="52" stroke="currentColor" className="text-muted-foreground/50" strokeWidth="2" strokeLinecap="round" />

          {/* Flag (purple) */}
          <path d="M46 8l12 5-12 5z" fill="#8b5cf6" />

          {/* Circular note head (purple) */}
          <circle cx="40" cy="52" r="8" stroke="#8b5cf6" strokeWidth="2.5" fill="none" />

          {/* Swoosh curve (purple) */}
          <path
            d="M48 48c6-8 14-10 20-6"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Text Logo */}
      <div className="flex items-baseline gap-0.5 leading-none">
        <span className="text-xl font-bold tracking-tight text-foreground">Lyric Generator</span>
        <span className="text-xl font-bold text-[#8b5cf6]">.cc</span>
      </div>
    </div>
  )
}

// Compact version for mobile
export function LogoCompact({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="img"
      aria-label="Lyric Generator.cc - AI Lyrics Generator"
    >
      <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <svg
          className="w-8 h-8"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Wave lines (gray) */}
          <path
            d="M10 52c8-4 16 2 24-2s16-6 24-2 12 6 18 2"
            stroke="currentColor"
            className="text-muted-foreground/40"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M10 58c8-4 16 2 24-2s16-6 24-2 12 6 18 2"
            stroke="currentColor"
            className="text-muted-foreground/30"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14 64c6-3 12 1 18-1s12-4 18-1 10 4 14 1"
            stroke="currentColor"
            className="text-muted-foreground/20"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Equalizer bars (purple) */}
          <rect x="18" y="32" width="4" height="8" rx="1" fill="#8b5cf6" />
          <rect x="24" y="26" width="4" height="14" rx="1" fill="#8b5cf6" />
          <rect x="30" y="20" width="4" height="20" rx="1" fill="#8b5cf6" />
          <rect x="36" y="14" width="4" height="26" rx="1" fill="#8b5cf6" />

          {/* Stem line (gray) */}
          <line x1="46" y1="8" x2="46" y2="52" stroke="currentColor" className="text-muted-foreground/50" strokeWidth="2" strokeLinecap="round" />

          {/* Flag (purple) */}
          <path d="M46 8l12 5-12 5z" fill="#8b5cf6" />

          {/* Circular note head (purple) */}
          <circle cx="40" cy="52" r="8" stroke="#8b5cf6" strokeWidth="2.5" fill="none" />

          {/* Swoosh curve (purple) */}
          <path
            d="M48 48c6-8 14-10 20-6"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      <div className="flex items-baseline gap-0.5 leading-none">
        <span className="text-lg font-bold text-foreground">Lyric Gen</span>
        <span className="text-lg font-bold text-[#8b5cf6]">.cc</span>
      </div>
    </div>
  )
}
