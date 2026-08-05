import type { LegalSection } from '@/content/legal/types'

type Props = {
  sections: LegalSection[]
}

export function LegalProse({ sections }: Props) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <section key={section.title ?? index} className="space-y-3">
          {section.title ? (
            <h2 className="font-display text-foreground text-lg font-semibold tracking-wide">
              {section.title}
            </h2>
          ) : null}
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-muted-foreground text-sm leading-relaxed sm:text-base"
            >
              {paragraph}
            </p>
          ))}
          {section.list && section.list.length > 0 ? (
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
              {section.list.map((item) => (
                <li key={item.slice(0, 48)}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  )
}
