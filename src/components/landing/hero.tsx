import { getTranslations } from 'next-intl/server'
import { OrnamentalBg } from '@/components/ornamental-bg'
import { WaitlistForm } from '@/components/waitlist/waitlist-form'
import { PlatformCta } from './platform-cta'

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

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <OrnamentalBg />
      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="bg-primary/5 pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-900/8 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-aged font-display max-w-4xl text-[clamp(1.5rem,8vw,3rem)] leading-tight font-bold tracking-wide text-balance md:text-7xl">
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

        <div
          className="parchment-card border-border bg-card/90 mt-10 w-full max-w-xl rounded-lg border p-5 backdrop-blur-sm sm:p-6"
        >
          <p className="font-display text-foreground mb-4 text-center text-base font-semibold tracking-wide">
            {t('formTitle')}
          </p>
          <WaitlistForm placement="hero" />
        </div>

        <div className="mt-6">
          <PlatformCta>{t('ctaPlatform')}</PlatformCta>
        </div>
      </div>

      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent" />
    </section>
  )
}
