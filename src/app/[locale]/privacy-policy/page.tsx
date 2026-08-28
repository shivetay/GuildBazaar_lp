import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { LegalPageShell } from '@/components/legal/legal-page-shell'
import { getLegalDocument } from '@/content/legal'
import { routing } from '@/i18n/routing'
import { generateLegalMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateLegalMetadata(params, '/privacy-policy', 'privacy')
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const document = getLegalDocument(locale as 'pl' | 'en', 'privacy')
  return <LegalPageShell document={document} href="/privacy-policy" />
}
