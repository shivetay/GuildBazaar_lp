import { setRequestLocale } from 'next-intl/server'
import { LandingHero } from '@/components/landing/hero'
import { LandingFeatures } from '@/components/landing/features'
import { PlatformShowcase } from '@/components/landing/platform-showcase'
import { LandingForm } from '@/components/landing/form'
import { LandingFooter } from '@/components/landing/footer'
import { SiteJsonLd } from '@/components/seo/json-ld'
import { routing } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function LandingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <SiteJsonLd locale={locale} />
      <main className="bg-background min-h-screen">
        <LandingHero />
        <LandingFeatures />
        <PlatformShowcase />
        <LandingForm />
        <LandingFooter />
      </main>
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
