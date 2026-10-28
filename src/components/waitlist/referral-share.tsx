'use client'

import { Check, Share2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

// Tagged so referred signups show up as utm_source=referral in the database
function referralUrl(locale: string) {
  const params = new URLSearchParams({
    utm_source: 'referral',
    utm_medium: 'share',
    utm_campaign: 'waitlist',
  })
  return `${window.location.origin}/${locale}?${params}`
}

export function ReferralShare() {
  const t = useTranslations('Success')
  const locale = useLocale()
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = referralUrl(locale)
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Guild Bazaar', text: t('shareText'), url })
        trackEvent('referral_share', { method: 'share' })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      trackEvent('referral_share', { method: 'copy' })
    } catch {
      // share sheet dismissed or clipboard blocked: nothing to do
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="border-border font-display text-foreground hover:border-primary/50 inline-flex w-full items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold tracking-wider transition-all active:scale-95"
    >
      {copied ? <Check className="text-primary h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? t('copied') : t('share')}
    </button>
  )
}
