import { readFile } from 'node:fs/promises'
import { ImageResponse } from 'next/og'
import { toLocale } from '@/lib/seo'

export const runtime = 'nodejs'
export const alt = 'Guild Bazaar'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const copy = {
  pl: {
    subtitle: 'Platforma dla rekonstruktorów, LARP i cosplay',
    tags: 'Rekonstrukcje · LARP · Cosplay',
  },
  en: {
    subtitle: 'A platform for re-enactors, LARP and cosplay',
    tags: 'Re-enactment · LARP · Cosplay',
  },
} as const

type Props = {
  params: Promise<{ locale: string }>
}

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params
  const text = copy[toLocale(locale)]
  const [cinzel, garamondLatin, garamondLatinExt] = await Promise.all([
    readFile(new URL('../../assets/fonts/Cinzel-Bold.ttf', import.meta.url)),
    readFile(new URL('../../assets/fonts/EBGaramond-Latin.ttf', import.meta.url)),
    readFile(new URL('../../assets/fonts/EBGaramond-LatinExt.ttf', import.meta.url)),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1c2a1e',
          color: '#f0ead8',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 36,
            border: '1px solid rgba(90, 154, 92, 0.45)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 80px',
          }}
        >
          <div
            style={{
              fontFamily: 'Cinzel',
              fontSize: 72,
              letterSpacing: 6,
              color: '#f0ead8',
            }}
          >
            Guild Bazaar
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: 'EB Garamond',
              fontSize: 32,
              color: '#c9d4c4',
              lineHeight: 1.4,
              maxWidth: 820,
            }}
          >
            {text.subtitle}
          </div>
          <div
            style={{
              marginTop: 48,
              fontFamily: 'EB Garamond',
              fontSize: 22,
              color: '#5a9a5c',
              letterSpacing: 2,
            }}
          >
            {text.tags}
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: 'EB Garamond',
              fontSize: 20,
              color: '#8a9488',
            }}
          >
            guildbazaar.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cinzel', data: cinzel, style: 'normal', weight: 700 },
        { name: 'EB Garamond', data: garamondLatin, style: 'normal', weight: 500 },
        { name: 'EB Garamond', data: garamondLatinExt, style: 'normal', weight: 500 },
      ],
    },
  )
}
