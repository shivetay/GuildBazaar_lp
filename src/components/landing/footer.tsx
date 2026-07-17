import { Sword } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

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
        <div className="text-muted-foreground/60 flex items-center gap-6 text-xs">
          <span>{t('copyright')}</span>
          <span>•</span>
          <span>{t('beta')}</span>
        </div>
      </div>
    </footer>
  )
}
