import { getTranslations } from 'next-intl/server'
import { WaitlistForm } from '@/components/waitlist/waitlist-form'
import { Link } from '@/i18n/navigation'

export async function LandingForm() {
  const t = await getTranslations('Form')

  return (
    <section id="zainteresowanie" className="mx-auto max-w-7xl px-4 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <div className="ornament font-display text-primary mb-4 text-xs tracking-widest uppercase">
            {t('eyebrow')}
          </div>
          <h2 className="font-display text-foreground text-3xl font-bold text-balance md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">{t('subtitle')}</p>
        </div>

        <div className="parchment-card border-border bg-card rounded-lg border p-6 sm:p-8">
          <WaitlistForm placement="section" />
        </div>

        <p className="text-muted-foreground/60 mt-4 text-center text-xs">
          {t('privacyBefore')}
          <Link
            href="/privacy-policy"
            className="text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
          >
            {t('privacyLink')}
          </Link>
          {t('privacyAfter')}
        </p>
      </div>
    </section>
  )
}
