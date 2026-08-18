import { getTranslations } from 'next-intl/server'
import type { Pathnames } from '@/i18n/routing'
import { getLocalizedUrl, SITE_NAME, SITE_URL, toLocale } from '@/lib/seo'

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

type SiteJsonLdProps = {
  locale: string
}

export async function SiteJsonLd({ locale }: SiteJsonLdProps) {
  const resolvedLocale = toLocale(locale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'Metadata' })
  const pageUrl = getLocalizedUrl('/', resolvedLocale)

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: pageUrl,
            inLanguage: resolvedLocale,
            description: t('description'),
            publisher: {
              '@id': `${SITE_URL}/#organization`,
            },
          },
          {
            '@type': 'WebApplication',
            '@id': `${SITE_URL}/#app`,
            name: SITE_NAME,
            url: pageUrl,
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'Web',
            inLanguage: ['pl', 'en'],
            description: t('description'),
            publisher: {
              '@id': `${SITE_URL}/#organization`,
            },
          },
        ],
      }}
    />
  )
}

type LegalJsonLdProps = {
  locale: string
  href: Pathnames
  name: string
}

export function LegalJsonLd({ locale, href, name }: LegalJsonLdProps) {
  const resolvedLocale = toLocale(locale)
  const homeUrl = getLocalizedUrl('/', resolvedLocale)
  const pageUrl = getLocalizedUrl(href, resolvedLocale)

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: SITE_NAME,
            item: homeUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name,
            item: pageUrl,
          },
        ],
      }}
    />
  )
}
