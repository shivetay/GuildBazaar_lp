import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LegalPageShell } from '@/components/legal/legal-page-shell'
import { getLegalDocument } from '@/content/legal'
import { routing } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Legal' })
  return {
    title: t('meta.privacy'),
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const document = getLegalDocument(locale as 'pl' | 'en', 'privacy')
  return <LegalPageShell document={document} />
}
