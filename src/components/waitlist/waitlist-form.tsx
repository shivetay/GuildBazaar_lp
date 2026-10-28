'use client'

import { Loader2, Plus, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useId, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type WaitlistError, useWaitlistForm } from '@/hooks/use-waitlist-form'
import type { WAITLIST_PLACEMENTS } from '@/utils/constants'
import { ConsentField } from './consent-field'
import { RoleSelect } from './role-select'
import { SuccessPanel } from './success-panel'

const errorKeys = {
  consent: 'errorConsent',
  rate_limited: 'errorRateLimited',
  validation: 'errorValidation',
  server: 'errorServer',
} as const satisfies Record<WaitlistError, string>

type Props = {
  placement: (typeof WAITLIST_PLACEMENTS)[number]
}

// Short waitlist form: e-mail, role and consent; the bottom section can add an optional message
export function WaitlistForm({ placement }: Props) {
  const t = useTranslations('Form')
  const id = useId()
  const { pending, sent, error, submit, fields } = useWaitlistForm(placement)
  const [showMessage, setShowMessage] = useState(false)

  if (sent) return <SuccessPanel />

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 text-left">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => fields.setWebsite(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-email`} className="text-muted-foreground text-sm">
            {t('emailLabel')}
          </label>
          <Input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t('emailPlaceholder')}
            required
            disabled={pending}
            value={fields.email}
            onChange={(e) => fields.setEmail(e.target.value)}
            className="border-border bg-input focus:border-primary/60 h-11"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-role`} className="text-muted-foreground text-sm">
            {t('roleLabel')}
          </label>
          <RoleSelect
            id={`${id}-role`}
            value={fields.role}
            onChange={fields.setRole}
            disabled={pending}
          />
        </div>
      </div>

      {placement === 'section' &&
        (showMessage ? (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-message`} className="text-muted-foreground text-sm">
              {t('messageLabel')}
            </label>
            <Textarea
              id={`${id}-message`}
              placeholder={t('messagePlaceholder')}
              rows={3}
              disabled={pending}
              value={fields.message}
              onChange={(e) => fields.setMessage(e.target.value)}
              className="border-border bg-input focus:border-primary/60 resize-none leading-relaxed"
              autoFocus
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowMessage(true)}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 self-start text-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            {t('addMessage')}
          </button>
        ))}

      <ConsentField
        id={`${id}-consent`}
        checked={fields.consent}
        onChange={fields.setConsent}
        disabled={pending}
      />

      {error ? (
        <p className="text-destructive text-center text-sm" role="alert">
          {t(errorKeys[error])}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="bg-primary font-display text-primary-foreground flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold tracking-wider transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {t('submit')}
      </button>
    </form>
  )
}
