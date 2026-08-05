import type { Locale } from '@/i18n/routing'
import type { LegalDocKey, LegalDocument } from './types'
import { termsPl } from './pl/terms'
import { privacyPl } from './pl/privacy'
import { cookiesPl } from './pl/cookies'
import { contactPl } from './pl/contact'
import { termsEn } from './en/terms'
import { privacyEn } from './en/privacy'
import { cookiesEn } from './en/cookies'
import { contactEn } from './en/contact'

const documents: Record<Locale, Record<LegalDocKey, LegalDocument>> = {
  pl: {
    terms: termsPl,
    privacy: privacyPl,
    cookies: cookiesPl,
    contact: contactPl,
  },
  en: {
    terms: termsEn,
    privacy: privacyEn,
    cookies: cookiesEn,
    contact: contactEn,
  },
}

export function getLegalDocument(locale: Locale, key: LegalDocKey): LegalDocument {
  return documents[locale][key]
}
