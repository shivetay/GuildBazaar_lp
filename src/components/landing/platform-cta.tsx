'use client'

import { ChevronDown } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export function PlatformCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#platforma"
      onClick={() => trackEvent('cta_click', { cta: 'platform' })}
      className="font-display text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center gap-2 px-4 text-sm font-semibold tracking-wider transition-colors"
    >
      {children}
      <ChevronDown className="h-4 w-4" />
    </a>
  )
}
