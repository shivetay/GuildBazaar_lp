import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { UnsubscribeCard } from '@/components/landing/unsubscribe-card'
import { getUnsubscribeState } from '@/lib/waitlist-confirmation'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ token?: string | string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Unsubscribe' })
  return { title: t('metaTitle'), robots: { index: false, follow: false } }
}

export default async function UnsubscribePage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const { token } = await searchParams
  const value = typeof token === 'string' ? token : ''
  const state = await getUnsubscribeState(value)

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-16">
      <UnsubscribeCard token={value} initialState={state} />
    </main>
  )
}
