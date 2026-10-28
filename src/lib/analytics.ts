import { track } from '@vercel/analytics'
import type { ALLOWED_ROLES, WAITLIST_PLACEMENTS } from '@/utils/constants'

type Placement = (typeof WAITLIST_PLACEMENTS)[number]

// One place for custom event names and their properties, so dashboards stay consistent.
// Vercel records custom events only on Pro/Enterprise; on Hobby these calls are no-ops,
// and signups are still counted per placement / role / UTM in the database.
type Events = {
  waitlist_signup: { placement: Placement; role: (typeof ALLOWED_ROLES)[number]; source: string }
  waitlist_error: { placement: Placement; error: string }
  cta_click: { cta: 'platform' }
  discord_click: { placement: 'footer' | 'success' }
  referral_share: { method: 'share' | 'copy' }
}

export function trackEvent<K extends keyof Events>(name: K, props: Events[K]) {
  try {
    track(name, props as Record<string, string>)
  } catch {
    // analytics must never break the page
  }
}
