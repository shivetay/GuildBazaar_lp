import 'server-only'

import { createClient } from '@supabase/supabase-js'

// Server-only client with the secret key: bypasses RLS. Never import it from client code.
export function createAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error('createAdminClient must only run on the server')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !secretKey) {
    return null
  }

  return createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
