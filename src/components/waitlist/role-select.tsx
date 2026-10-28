'use client'

import { useTranslations } from 'next-intl'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ALLOWED_ROLES } from '@/utils/constants'

type Role = (typeof ALLOWED_ROLES)[number]

type Props = {
  id: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function RoleSelect({ id, value, onChange, disabled }: Props) {
  const t = useTranslations('Form')

  return (
    <Select
      required
      disabled={disabled}
      value={value || null}
      onValueChange={(v) => onChange(typeof v === 'string' ? v : '')}
    >
      <SelectTrigger id={id} className="border-border bg-input h-11 w-full">
        <SelectValue placeholder={t('rolePlaceholder')}>
          {(v) => (typeof v === 'string' && v.length > 0 ? t(`roles.${v as Role}`) : null)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {ALLOWED_ROLES.map((key) => (
          <SelectItem key={key} value={key}>
            {t(`roles.${key}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
