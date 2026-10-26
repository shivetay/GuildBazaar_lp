import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ConfirmCard } from '@/components/landing/confirm-card'
import { getConfirmState } from '@/lib/waitlist-confirmation'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ token?: string | string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Confirm' })
  return { title: t('metaTitle'), robots: { index: false, follow: false } }
}

export default async function ConfirmPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const { token } = await searchParams
  const value = typeof token === 'string' ? token : ''
  const state = await getConfirmState(value)

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-16">
      <ConfirmCard token={value} initialState={state} />
    </main>
  )
}
