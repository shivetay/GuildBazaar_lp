'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher')
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <nav
      className="border-border bg-background/80 fixed top-4 right-4 z-50 flex items-center gap-1 rounded-sm border p-1 backdrop-blur-sm"
      aria-label={t('label')}
    >
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc as Locale}
          hrefLang={loc}
          rel={locale === loc ? undefined : 'alternate'}
          aria-current={locale === loc ? 'page' : undefined}
          className={cn(
            'font-display rounded-sm px-2.5 py-1 text-xs tracking-wider uppercase transition-colors',
            locale === loc
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {t(loc)}
        </Link>
      ))}
    </nav>
  )
}
