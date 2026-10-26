// Where a visitor came from (UTM tags + external referrer), saved with the signup.
// Kept in sessionStorage so it survives a detour to the legal pages.

export type Attribution = {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
}

const STORAGE_KEY = 'gb_attribution'
const MAX_LEN = 200

function clean(value: string | null | undefined): string | undefined {
  const v = value?.trim().slice(0, MAX_LEN)
  return v ? v : undefined
}

function externalReferrer(): string | undefined {
  if (!document.referrer) return undefined
  try {
    const url = new URL(document.referrer)
    // Host only: full referrer URLs can carry personal data in the path or query
    return url.host === window.location.host ? undefined : clean(url.host)
  } catch {
    return undefined
  }
}

export function captureAttribution(): Attribution {
  let stored: Attribution = {}
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {}

  const params = new URLSearchParams(window.location.search)
  const fresh: Attribution = {
    utmSource: clean(params.get('utm_source')),
    utmMedium: clean(params.get('utm_medium')),
    utmCampaign: clean(params.get('utm_campaign')),
    referrer: externalReferrer(),
  }

  // First touch in this session wins; new UTM tags replace it
  const result =
    fresh.utmSource || fresh.utmMedium || fresh.utmCampaign ? fresh : { ...fresh, ...stored }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result))
  } catch {}
  return result
}

export function sanitizeAttribution(input: Attribution | undefined): Attribution {
  return {
    utmSource: clean(input?.utmSource),
    utmMedium: clean(input?.utmMedium),
    utmCampaign: clean(input?.utmCampaign),
    referrer: clean(input?.referrer),
  }
}
