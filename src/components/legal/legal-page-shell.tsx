import { ArrowLeft } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { LegalProse } from './legal-prose'
import { LegalJsonLd } from '@/components/seo/json-ld'
import type { LegalDocument } from '@/content/legal/types'
import { Link } from '@/i18n/navigation'
import type { Pathnames } from '@/i18n/routing'

type Props = {
  document: LegalDocument
  href: Pathnames
}

export async function LegalPageShell({ document, href }: Props) {
  const t = await getTranslations('Legal')
  const locale = await getLocale()

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${document.updatedAt}T00:00:00`))

  return (
    <main className="bg-background min-h-screen px-4 py-16 sm:py-20">
      <LegalJsonLd locale={locale} href={href} name={document.title} />
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Link>

        <header className="mb-10 space-y-3 border-b border-border pb-8">
          <h1 className="font-display text-foreground text-3xl font-semibold tracking-wide sm:text-4xl">
            {document.title}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t('lastUpdated', { date: formattedDate })}
          </p>
        </header>

        <LegalProse sections={document.sections} />
      </article>
    </main>
  )
}
