'use client'

import { useState, useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { submitWaitlist } from '@/app/actions/waitlist'

const roleKeys = [
  'participant',
  'reconstructor',
  'larp',
  'cosplayer',
  'artisan',
  'vendor',
  'association',
  'organizer',
] as const

export function LandingForm() {
  const t = useTranslations('Form')
  const locale = useLocale()
  const [pending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const result = await submitWaitlist({
        name: form.name,
        email: form.email,
        role: form.role,
        message: form.message,
        locale,
      })

      if (result.ok) {
        setSent(true)
        return
      }

      if (result.error === 'duplicate') {
        setError(t('errorDuplicate'))
      } else if (result.error === 'validation') {
        setError(t('errorValidation'))
      } else {
        setError(t('errorServer'))
      }
    })
  }

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

        <div className="parchment-card border-border bg-card rounded-lg border p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 className="text-primary h-12 w-12" />
              <h3 className="font-display text-foreground text-xl font-semibold">
                {t('successTitle')}
              </h3>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                {t('successMessage')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-muted-foreground font-sans text-sm">
                    {t('nameLabel')}
                  </label>
                  <Input
                    id="name"
                    placeholder={t('namePlaceholder')}
                    required
                    disabled={pending}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border-border bg-input focus:border-primary/60"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-muted-foreground font-sans text-sm">
                    {t('emailLabel')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    required
                    disabled={pending}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border-border bg-input focus:border-primary/60"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground font-sans text-sm">{t('roleLabel')}</label>
                <Select
                  required
                  disabled={pending}
                  onValueChange={(v) => setForm({ ...form, role: typeof v === 'string' ? v : '' })}
                >
                  <SelectTrigger className="border-border bg-input w-full">
                    <SelectValue placeholder={t('rolePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {roleKeys.map((key) => (
                      <SelectItem key={key} value={key}>
                        {t(`roles.${key}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-muted-foreground font-sans text-sm">
                  {t('messageLabel')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('messagePlaceholder')}
                  rows={4}
                  disabled={pending}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="border-border bg-input focus:border-primary/60 resize-none leading-relaxed"
                />
              </div>

              {error ? (
                <p className="text-destructive text-center text-sm" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                className="bg-primary font-display text-primary-foreground flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold tracking-wider transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
              >
                {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {t('submit')}
              </button>

              <p className="text-muted-foreground/60 text-center text-xs">{t('privacy')}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
