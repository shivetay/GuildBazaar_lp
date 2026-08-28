import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPathname } from '@/i18n/navigation'
import { type Locale, type Pathnames, routing } from '@/i18n/routing'

export const SITE_URL = 'https://guildbazaar.com'
export const SITE_NAME = 'Guild Bazaar'

const ogLocale: Record<Locale, string> = {
  pl: 'pl_PL',
  en: 'en_US',
}

export function toLocale(locale: string): Locale {
  return routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale
}

export function getLocalizedPath(href: Pathnames, locale: Locale) {
  return getPathname({ locale, href })
}

export function getLocalizedUrl(href: Pathnames, locale: Locale) {
  return `${SITE_URL}${getLocalizedPath(href, locale)}`
}

export function languageAlternates(href: Pathnames) {
  const languages: Record<string, string> = {
    'x-default': getLocalizedPath(href, routing.defaultLocale),
  }

  for (const locale of routing.locales) {
    languages[locale] = getLocalizedPath(href, locale)
  }

  return languages
}

export function generateLocalizedMetadata({
  locale,
  href,
  title,
  description,
}: {
  locale: string
  href: Pathnames
  title: string
  description: string
}): Metadata {
  const resolvedLocale = toLocale(locale)
  const url = getLocalizedPath(href, resolvedLocale)
  const alternateLocale = routing.locales
    .filter((item) => item !== resolvedLocale)
    .map((item) => ogLocale[item])

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(href),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale[resolvedLocale],
      alternateLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export async function generateLegalMetadata(
  params: Promise<{ locale: string }>,
  href: Pathnames,
  key: 'terms' | 'privacy' | 'cookies' | 'contact',
): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Legal' })

  return generateLocalizedMetadata({
    locale,
    href,
    title: t(`meta.${key}`),
    description: t(`meta.${key}Description`),
  })
}
