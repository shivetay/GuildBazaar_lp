import { createHash, randomBytes } from 'node:crypto'
import { headers } from 'next/headers'
import { type Locale, routing } from '@/i18n/routing'
import { getLocalizedPath, SITE_URL } from '@/lib/seo'
import { createAdminClient } from '@/utils/supabase/admin'

// Bump when the consent wording in messages/*.json (Form.consentLabel) changes
export const CONSENT_VERSION = '2026-10-26'

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000
const RESEND_COOLDOWN_MS = 10 * 60 * 1000
const FROM = 'Guild Bazaar <noreply@guildbazaar.com>'
// Template aliases created in Resend
const TEMPLATES: Record<Locale, string> = {
  pl: 'waitlist-confirm-pl',
  en: 'waitlist-confirm-en',
}

export type ConfirmState = 'pending' | 'confirmed' | 'already' | 'invalid'

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

function toLocale(value: string | null | undefined): Locale {
  return routing.locales.includes(value as Locale) ? (value as Locale) : routing.defaultLocale
}

// Link points at the deployment that served the form (preview or prod), never an arbitrary host
async function getBaseUrl() {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? ''
  if (host.startsWith('localhost:')) return `http://${host}`
  if (host === 'guildbazaar.com' || host.endsWith('.vercel.app')) return `https://${host}`
  return SITE_URL
}

async function sendConfirmationEmail(to: string, name: string, locale: Locale, confirmUrl: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('waitlist confirmation skipped: RESEND_API_KEY not set')
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      template: {
        id: TEMPLATES[locale],
        variables: { NAME: name, CONFIRM_URL: confirmUrl },
      },
    }),
  })

  if (!res.ok) {
    console.error('waitlist confirmation email failed', res.status, await res.text())
  }
}

/**
 * Issues a fresh token for an unconfirmed signup and e-mails the link.
 * No-op for confirmed addresses or within the resend cooldown, so the caller
 * can always answer the same way (no e-mail enumeration).
 */
export async function issueConfirmation(email: string) {
  const supabase = createAdminClient()
  if (!supabase) {
    console.warn('waitlist confirmation skipped: SUPABASE_SECRET_KEY not set')
    return
  }

  const token = randomBytes(32).toString('base64url')
  const cooldownStart = new Date(Date.now() - RESEND_COOLDOWN_MS).toISOString()

  const { data, error } = await supabase
    .from('waitlist_signups')
    .update({
      confirm_token_hash: hashToken(token),
      confirm_sent_at: new Date().toISOString(),
      // re-submitting the form renews consent with the current wording
      consent_version: CONSENT_VERSION,
      consent_at: new Date().toISOString(),
    })
    .eq('email', email)
    .is('confirmed_at', null)
    .or(`confirm_sent_at.is.null,confirm_sent_at.lt."${cooldownStart}"`)
    .select('name, locale')
    .maybeSingle()

  if (error) {
    console.error('waitlist confirmation token update failed', error.message)
    return
  }
  if (!data) return

  const locale = toLocale(data.locale)
  const confirmUrl = `${await getBaseUrl()}${getLocalizedPath('/confirm', locale)}?token=${token}`
  await sendConfirmationEmail(email, data.name, locale, confirmUrl)
}

async function findByToken(token: string) {
  const supabase = createAdminClient()
  if (!supabase || !token) return { supabase, row: null }

  const { data } = await supabase
    .from('waitlist_signups')
    .select('id, confirmed_at, confirm_sent_at')
    .eq('confirm_token_hash', hashToken(token))
    .maybeSingle()

  return { supabase, row: data }
}

function isExpired(sentAt: string | null) {
  return !sentAt || Date.now() - new Date(sentAt).getTime() > TOKEN_TTL_MS
}

// Read-only check for the confirm page; the actual confirmation needs a click (POST),
// so link scanners that prefetch e-mail links cannot confirm on the user's behalf
export async function getConfirmState(token: string): Promise<ConfirmState> {
  const { row } = await findByToken(token)
  if (!row) return 'invalid'
  if (row.confirmed_at) return 'already'
  return isExpired(row.confirm_sent_at) ? 'invalid' : 'pending'
}

export async function confirmSignup(token: string): Promise<ConfirmState> {
  const { supabase, row } = await findByToken(token)
  if (!supabase || !row) return 'invalid'
  if (row.confirmed_at) return 'already'
  if (isExpired(row.confirm_sent_at)) return 'invalid'

  const { error } = await supabase
    .from('waitlist_signups')
    .update({ confirmed_at: new Date().toISOString() })
    .eq('id', row.id)
    .is('confirmed_at', null)

  if (error) {
    console.error('waitlist confirmation failed', error.message)
    return 'invalid'
  }
  return 'confirmed'
}
