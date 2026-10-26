import { ChevronDown } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { SectionDivider } from '@/components/ornamental-bg'

const faqKeys = [
  'about',
  'audience',
  'groups',
  'sell',
  'price',
  'launch',
  'waitlist',
  'epochs',
  'buyers',
] as const

export async function LandingFaq() {
  const t = await getTranslations('Faq')
  const tCommon = await getTranslations('Common')

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24">
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

      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {faqKeys.map((key) => (
          <details
            key={key}
            className="parchment-card group border-border bg-card open:border-primary/40 rounded-sm border transition-colors"
          >
            <summary className="font-display text-foreground hover:text-primary flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              <h3>{t(`items.${key}.question`)}</h3>
              <ChevronDown
                aria-hidden="true"
                className="text-primary h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="text-muted-foreground px-5 pb-5 text-sm leading-relaxed">
              {t(`items.${key}.answer`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
