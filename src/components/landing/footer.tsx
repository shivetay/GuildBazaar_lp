import { Sword } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const legalLinks = [
  { href: '/terms' as const, key: 'terms' as const },
  { href: '/privacy-policy' as const, key: 'privacy' as const },
  { href: '/cookie-policy' as const, key: 'cookies' as const },
  { href: '/contact' as const, key: 'contact' as const },
]

export async function LandingFooter() {
  const t = await getTranslations('Footer')
  const tCommon = await getTranslations('Common')

  return (
    <footer className="border-border bg-card/40 border-t px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Sword className="text-primary h-4 w-4" />
          <span className="font-display text-foreground text-lg font-semibold tracking-wider">
            {tCommon('brand')}
          </span>
        </div>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">{t('description')}</p>
        <nav
          aria-label={t('navLabel')}
          className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs"
        >
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground underline-offset-4 transition-colors hover:underline"
            >
              {t(`links.${link.key}`)}
            </Link>
          ))}
        </nav>
        <div className="text-muted-foreground/60 flex items-center gap-6 text-xs">
          <span>{t('copyright')}</span>
          <span>•</span>
          <span>{t('beta')}</span>
        </div>
      </div>
    </footer>
  )
}
