'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type Props = {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

// Wording comes from Form.consentLabel; changing it means bumping CONSENT_VERSION
export function ConsentField({ id, checked, onChange, disabled }: Props) {
  const t = useTranslations('Form')

  return (
    <label
      htmlFor={id}
      className="text-muted-foreground flex items-start gap-3 text-left text-xs leading-relaxed sm:text-sm"
    >
      <input
        id={id}
        type="checkbox"
        required
        disabled={disabled}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-primary mt-0.5 h-4 w-4 shrink-0"
      />
      <span>
        {t('consentLabel')}{' '}
        <Link
          href="/privacy-policy"
          className="hover:text-foreground underline underline-offset-2 transition-colors"
        >
          {t('consentPrivacyLink')}
        </Link>
        .
      </span>
    </label>
  )
}
