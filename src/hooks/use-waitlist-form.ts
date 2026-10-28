'use client'

import { useLocale } from 'next-intl'
import { useEffect, useRef, useState, useTransition } from 'react'
import { submitWaitlist, type WaitlistResult } from '@/app/actions/waitlist'
import { trackEvent } from '@/lib/analytics'
import { type Attribution, captureAttribution } from '@/lib/attribution'
import type { ALLOWED_ROLES, WAITLIST_PLACEMENTS } from '@/utils/constants'

type Role = (typeof ALLOWED_ROLES)[number]
type Placement = (typeof WAITLIST_PLACEMENTS)[number]
export type WaitlistError = Extract<WaitlistResult, { ok: false }>['error']

// Form state, anti-spam fields, attribution and submit for one waitlist form on the page
export function useWaitlistForm(placement: Placement) {
  const locale = useLocale()
  const [pending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<WaitlistError | null>(null)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  // Honeypot value and mount time, checked by the server action
  const [website, setWebsite] = useState('')
  const startedAt = useRef(0)
  const attribution = useRef<Attribution>({})

  useEffect(() => {
    startedAt.current = Date.now()
    attribution.current = captureAttribution()
  }, [])

  function fail(reason: WaitlistError) {
    setError(reason)
    trackEvent('waitlist_error', { placement, error: reason })
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        const result = await submitWaitlist({
          email,
          role,
          message,
          locale,
          website,
          startedAt: startedAt.current,
          attribution: attribution.current,
          consent,
          placement,
        })
        if (!result.ok) return fail(result.error)

        setSent(true)
        trackEvent('waitlist_signup', {
          placement,
          role: role as Role,
          source: attribution.current.utmSource ?? attribution.current.referrer ?? 'direct',
        })
      } catch {
        fail('server')
      }
    })
  }

  return {
    pending,
    sent,
    error,
    submit,
    fields: {
      email,
      setEmail,
      role,
      setRole,
      message,
      setMessage,
      consent,
      setConsent,
      website,
      setWebsite,
    },
  }
}
