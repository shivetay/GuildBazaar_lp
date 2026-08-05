import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  pathnames: {
    '/': '/',
    '/terms': {
      pl: '/regulamin',
      en: '/terms',
    },
    '/privacy-policy': {
      pl: '/polityka-prywatnosci',
      en: '/privacy-policy',
    },
    '/cookie-policy': {
      pl: '/polityka-cookies',
      en: '/cookie-policy',
    },
    '/contact': {
      pl: '/kontakt',
      en: '/contact',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
export type Pathnames = keyof typeof routing.pathnames
