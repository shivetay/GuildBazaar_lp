import type { MetadataRoute } from 'next'
import { type Pathnames, routing } from '@/i18n/routing'
import { getLocalizedUrl, languageAlternates, SITE_URL } from '@/lib/seo'

const routes: Pathnames[] = [
  '/',
  '/terms',
  '/privacy-policy',
  '/cookie-policy',
  '/contact',
]

function toAbsoluteLanguages(href: Pathnames) {
  const languages: Record<string, string> = {}

  for (const [lang, path] of Object.entries(languageAlternates(href))) {
    languages[lang] = `${SITE_URL}${path}`
  }

  return languages
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: getLocalizedUrl(href, locale),
      alternates: {
        languages: toAbsoluteLanguages(href),
      },
    })),
  )
}
