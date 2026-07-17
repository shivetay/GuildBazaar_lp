'use client'

export function OrnamentalBg({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="oklch(0.58 0.12 148)"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern id="diamond" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M40 0 L80 40 L40 80 L0 40 Z"
              fill="none"
              stroke="oklch(0.58 0.12 148)"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#diamond)" opacity="0.5" />
      </svg>

      <svg
        className="absolute top-0 left-0 h-48 w-48 opacity-[0.06]"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="oklch(0.65 0.1 80)" strokeWidth="1.2">
          <path d="M0 0 Q100 0 100 100" />
          <path d="M0 0 Q130 0 130 130" />
          <path d="M0 0 Q160 0 160 160" />
          <line x1="0" y1="0" x2="80" y2="80" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="12" strokeWidth="1" />
          <circle cx="0" cy="0" r="24" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="3" fill="oklch(0.65 0.1 80)" />
          <circle cx="130" cy="130" r="2" fill="oklch(0.65 0.1 80)" />
          <line x1="44" y1="38" x2="44" y2="50" strokeWidth="1.5" />
          <line x1="38" y1="44" x2="50" y2="44" strokeWidth="1.5" />
        </g>
      </svg>

      <svg
        className="absolute top-0 right-0 h-48 w-48 scale-x-[-1] opacity-[0.06]"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="oklch(0.65 0.1 80)" strokeWidth="1.2">
          <path d="M0 0 Q100 0 100 100" />
          <path d="M0 0 Q130 0 130 130" />
          <path d="M0 0 Q160 0 160 160" />
          <line x1="0" y1="0" x2="80" y2="80" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="12" strokeWidth="1" />
          <circle cx="0" cy="0" r="24" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="3" fill="oklch(0.65 0.1 80)" />
          <circle cx="130" cy="130" r="2" fill="oklch(0.65 0.1 80)" />
          <line x1="44" y1="38" x2="44" y2="50" strokeWidth="1.5" />
          <line x1="38" y1="44" x2="50" y2="44" strokeWidth="1.5" />
        </g>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="h-[600px] w-[600px] opacity-[0.025]"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" stroke="oklch(0.58 0.12 148)" strokeWidth="0.8">
            <circle cx="200" cy="200" r="180" />
            <circle cx="200" cy="200" r="175" strokeWidth="0.3" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180
              const x1 = 200 + 175 * Math.cos(rad)
              const y1 = 200 + 175 * Math.sin(rad)
              return <line key={angle} x1="200" y1="200" x2={x1} y2={y1} strokeWidth="0.5" />
            })}
            <polygon
              points="200,50 283,82 340,150 340,250 283,318 200,350 117,318 60,250 60,150 117,82"
              strokeWidth="0.6"
            />
            <line x1="200" y1="140" x2="200" y2="260" strokeWidth="1.5" />
            <line x1="140" y1="200" x2="260" y2="200" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="20" strokeWidth="1" />
            <circle cx="200" cy="200" r="8" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      <div className="via-primary/10 absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent to-transparent" />
      <div className="via-primary/10 absolute inset-y-0 right-6 w-px bg-gradient-to-b from-transparent to-transparent" />
    </div>
  )
}

export function SectionDivider({ symbol = '✦' }: { symbol?: string }) {
  return (
    <div aria-hidden="true" className="flex items-center gap-4 py-2 opacity-[0.55]">
      <div className="via-primary/75 to-primary/35 h-px flex-1 bg-gradient-to-r from-transparent" />
      <div className="text-primary/90 flex items-center gap-2 text-xs">
        <span>◆</span>
        <span className="font-display text-[10px] tracking-[0.3em] uppercase">{symbol}</span>
        <span>◆</span>
      </div>
      <div className="via-primary/75 to-primary/35 h-px flex-1 bg-gradient-to-l from-transparent" />
    </div>
  )
}

export function OrnamentalFrame({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {(
        [
          'top-0 left-0',
          'top-0 right-0 rotate-90',
          'bottom-0 right-0 rotate-180',
          'bottom-0 left-0 -rotate-90',
        ] as const
      ).map((pos, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className={`absolute ${pos} text-primary/25 h-6 w-6`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M0 12 L0 0 L12 0" />
          <circle cx="0" cy="0" r="2.5" fill="currentColor" />
        </svg>
      ))}
      {children}
    </div>
  )
}
