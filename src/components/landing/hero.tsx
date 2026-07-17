import { Shield } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { OrnamentalBg, SectionDivider } from '@/components/ornamental-bg'

const epochKeys = [
  { key: 'medieval', symbol: '⚔' },
  { key: 'fantasy', symbol: '✦' },
  { key: 'larp', symbol: '◈' },
  { key: 'militaria', symbol: '⊕' },
  { key: 'cosplay', symbol: '❧' },
  { key: 'reconstruction', symbol: '◉' },
] as const

export async function LandingHero() {
  const t = await getTranslations('Hero')
  const tCommon = await getTranslations('Common')

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <OrnamentalBg />
      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="bg-primary/5 pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-900/8 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-aged font-display max-w-4xl text-5xl leading-tight font-bold tracking-wide text-balance md:text-7xl">
          {t.rich('title', {
            highlight: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h1>

        <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed text-pretty">
          {t('subtitle')}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {epochKeys.map((e) => (
            <span key={e.key} className="epoch-badge">
              <span className="text-primary/60">{e.symbol}</span>
              {t(`epochs.${e.key}`)}
            </span>
          ))}
        </div>

        <div className="mt-10 w-64">
          <SectionDivider symbol={tCommon('brand')} />
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#zainteresowanie"
            className="group bg-primary font-display text-primary-foreground relative inline-flex items-center gap-2 overflow-hidden rounded-sm px-8 py-3 text-sm font-semibold tracking-wider transition-all hover:brightness-110 active:scale-95"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
            <Shield className="h-4 w-4" />
            {t('ctaJoin')}
          </a>
          <a
            href="#platforma"
            className="border-border font-display text-muted-foreground hover:border-primary/50 hover:text-foreground inline-flex items-center gap-2 rounded-sm border px-8 py-3 text-sm font-semibold tracking-wider transition-all active:scale-95"
          >
            {t('ctaPlatform')}
          </a>
        </div>
      </div>

      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent" />
    </section>
  )
}
