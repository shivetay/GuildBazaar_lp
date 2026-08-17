export type LegalSection = {
  title?: string
  paragraphs?: string[]
  list?: string[]
}

export type LegalDocument = {
  title: string
  updatedAt: string
  sections: LegalSection[]
}

export type LegalDocKey = 'terms' | 'privacy' | 'cookies' | 'contact'
