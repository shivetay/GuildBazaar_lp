'use server'

import { createClient } from '@/utils/supabase/server'

const ALLOWED_ROLES = [
  'participant',
  'reconstructor',
  'larp',
  'cosplayer',
  'artisan',
  'vendor',
  'association',
  'organizer',
] as const

type Role = (typeof ALLOWED_ROLES)[number]

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: 'validation' | 'duplicate' | 'server' }

function isRole(value: string): value is Role {
  return (ALLOWED_ROLES as readonly string[]).includes(value)
}

export async function submitWaitlist(input: {
  name: string
  email: string
  role: string
  message?: string
  locale?: string
  website?: string
}): Promise<WaitlistResult> {
  if (input.website && input.website.trim().length > 0) {
    return { ok: true }
  }

  const name = input.name?.trim() ?? ''
  const email = input.email?.trim().toLowerCase() ?? ''
  const role = input.role?.trim() ?? ''
  const message = input.message?.trim() || null
  const locale = input.locale?.trim() || null

  if (
    name.length < 2 ||
    name.length > 120 ||
    email.length < 3 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !isRole(role) ||
    (message !== null && message.length > 2000)
  ) {
    return { ok: false, error: 'validation' }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.from('waitlist_signups').insert({
      name,
      email,
      role,
      message,
      locale,
    })

    if (error) {
      if (error.code === '23505') {
        return { ok: false, error: 'duplicate' }
      }
      console.error('waitlist insert failed', error.message)
      return { ok: false, error: 'server' }
    }

    return { ok: true }
  } catch (err) {
    console.error('waitlist unexpected error', err)
    return { ok: false, error: 'server' }
  }
}
