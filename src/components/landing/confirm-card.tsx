'use client'

import { CheckCircle2, CircleAlert, Loader2, MailCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, useTransition } from 'react'
import { confirmWaitlist } from '@/app/actions/confirm'
import { Link } from '@/i18n/navigation'
import type { ConfirmState } from '@/lib/waitlist-confirmation'

type Props = {
  token: string
  initialState: ConfirmState
}

export function ConfirmCard({ token, initialState }: Props) {
  const t = useTranslations('Confirm')
  const [state, setState] = useState<ConfirmState>(initialState)
  const [pending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(async () => {
      try {
        setState(await confirmWaitlist(token))
      } catch {
        setState('invalid')
      }
    })
  }

  const Icon = state === 'pending' ? MailCheck : state === 'invalid' ? CircleAlert : CheckCircle2

  return (
    <div className="parchment-card border-border bg-card w-full max-w-md rounded-lg border p-8 text-center">
      <Icon className="text-primary mx-auto mb-4 h-12 w-12" />
      <h1 className="font-display text-foreground mb-3 text-2xl font-semibold">
        {t(`${state}Title`)}
      </h1>
      <p className="text-muted-foreground mb-6 leading-relaxed">{t(`${state}Text`)}</p>

      {state === 'pending' ? (
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pending}
          className="bg-primary font-display text-primary-foreground inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold tracking-wider transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {t('button')}
        </button>
      ) : (
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-2 transition-colors"
        >
          {t('back')}
        </Link>
      )}
    </div>
  )
}
