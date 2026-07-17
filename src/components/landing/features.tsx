import { Search, Shield, Store, Users } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { OrnamentalFrame, SectionDivider } from '@/components/ornamental-bg'

const featureConfig = [
  { key: 'associations', icon: Users },
  { key: 'marketplace', icon: Store },
  { key: 'search', icon: Search },
  { key: 'vendor', icon: Shield },
] as const

export async function LandingFeatures() {
  const t = await getTranslations('Features')
  const tCommon = await getTranslations('Common')

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-24">
      <div className="forest-glow pointer-events-none absolute inset-0" />

      <div className="relative mb-14 text-center">
        <div className="ornament font-display text-primary mb-4 text-xs tracking-widest uppercase">
          {t('eyebrow')}
        </div>
        <h2 className="font-display text-foreground text-3xl font-bold text-balance md:text-4xl">
          {t('title')}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl leading-relaxed text-pretty">
          {t('subtitle')}
        </p>
        <div className="mx-auto mt-8 w-48">
          <SectionDivider symbol={tCommon('brand')} />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {featureConfig.map((f) => (
          <OrnamentalFrame key={f.key}>
            <div className="parchment-card group border-border bg-card hover:border-primary/40 hover:bg-accent/30 rounded-sm border p-6 transition-all duration-300">
              <div className="mb-4 flex items-start justify-between">
                <div className="bg-primary/10 text-primary group-hover:bg-primary/20 inline-flex h-10 w-10 items-center justify-center rounded-sm transition-all">
                  <f.icon className="h-5 w-5" />
                </div>
                <span className="epoch-badge">{t(`items.${f.key}.epoch`)}</span>
              </div>
              <h3 className="font-display text-foreground mb-2 text-lg font-semibold">
                {t(`items.${f.key}.title`)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(`items.${f.key}.description`)}
              </p>
            </div>
          </OrnamentalFrame>
        ))}
      </div>
    </section>
  )
}
