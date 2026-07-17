import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { SectionDivider } from '@/components/ornamental-bg'

const screenshotConfig = [
  { key: 'offers', src: '/screenshots/home-offers.jpg' },
  { key: 'associations', src: '/screenshots/home-associations.jpg' },
  { key: 'vendor', src: '/screenshots/vendor-panel.jpg' },
  { key: 'associationPanel', src: '/screenshots/association-panel.jpg' },
] as const

function BrowserFrame({ src, alt, slug }: { src: string; alt: string; slug: string }) {
  return (
    <div className="browser-frame transition-transform duration-300 hover:scale-[1.02]">
      <div className="browser-frame-bar">
        <span className="browser-frame-dot" />
        <span className="browser-frame-dot" />
        <span className="browser-frame-dot" />
        <span className="text-muted-foreground/60 ml-2 truncate font-mono text-[10px]">
          guildbazaar.pl/{slug}
        </span>
      </div>
      <div className="bg-card relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  )
}

export async function PlatformShowcase() {
  const t = await getTranslations('Platform')
  const tCommon = await getTranslations('Common')

  return (
    <section id="platforma" className="relative mx-auto max-w-7xl overflow-hidden px-4 py-24">
      <div className="forest-glow pointer-events-none absolute inset-0" />

      <div className="relative mb-14 text-center">
        <div className="ornament font-display text-primary mb-4 text-xs tracking-widest uppercase">
          {t('eyebrow')}
        </div>
        <h2 className="font-display text-foreground text-3xl font-bold text-balance md:text-4xl">
          {t('title')}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl leading-relaxed text-pretty">
          {t('subtitle')}
        </p>
        <div className="mx-auto mt-8 w-48">
          <SectionDivider symbol={tCommon('brand')} />
        </div>
      </div>

      <div className="relative grid gap-10 md:grid-cols-2">
        {screenshotConfig.map((shot) => (
          <div key={shot.key} className="flex flex-col gap-4">
            <BrowserFrame
              src={shot.src}
              alt={t(`items.${shot.key}.alt`)}
              slug={t(`items.${shot.key}.slug`)}
            />
            <div className="px-1">
              <h3 className="font-display text-foreground text-lg font-semibold">
                {t(`items.${shot.key}.title`)}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {t(`items.${shot.key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
