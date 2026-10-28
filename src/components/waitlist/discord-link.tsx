'use client'

import { MessageCircle } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { DISCORD_URL } from '@/utils/constants'

type Props = {
  placement: 'footer' | 'success'
  className?: string
  children: React.ReactNode
}

export function DiscordLink({ placement, className, children }: Props) {
  return (
    <a
      href={DISCORD_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('discord_click', { placement })}
      className={cn('inline-flex items-center gap-2', className)}
    >
      <MessageCircle className="h-4 w-4" />
      {children}
    </a>
  )
}
