import { CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { DiscordLink } from './discord-link'
import { ReferralShare } from './referral-share'

// Shown after a signup: check the inbox, then two ways to stay involved
export function SuccessPanel() {
  const t = useTranslations('Success')

  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center" role="status">
      <CheckCircle2 className="text-primary h-12 w-12" />
      <h3 className="font-display text-foreground text-xl font-semibold">{t('title')}</h3>
      <p className="text-muted-foreground max-w-sm leading-relaxed">{t('message')}</p>

      <div className="border-border mt-2 w-full max-w-sm border-t pt-5">
        <p className="text-foreground mb-4 text-sm leading-relaxed">{t('nextSteps')}</p>
        <div className="flex flex-col gap-3">
          <DiscordLink
            placement="success"
            className="bg-primary font-display text-primary-foreground w-full justify-center rounded-md px-5 py-3 text-sm font-semibold tracking-wider transition-all hover:brightness-110 active:scale-95"
          >
            {t('discord')}
          </DiscordLink>
          <ReferralShare />
        </div>
      </div>
    </div>
  )
}
