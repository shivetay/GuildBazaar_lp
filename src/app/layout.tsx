import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({ children }: Props) {
  return children
}
