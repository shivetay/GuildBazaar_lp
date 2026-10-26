import type { LegalDocument } from '../types'

export const contactEn: LegalDocument = {
  title: 'Contact',
  updatedAt: '2026-10-26',
  sections: [
    {
      title: 'Provider details',
      paragraphs: [
        'FSP Łukasz Dawidowicz',
        'Address: ul. Dworska 8D, 51-361 Wilczyce, Poland',
        'NIP: 6922391957',
        'REGON: 524775528',
      ],
    },
    {
      title: 'General contact',
      paragraphs: [
        'Email: kontakt@guildbazaar.com',
        'Phone: [PHONE – TO BE COMPLETED]',
        'Postal mail: ul. Dworska 8D, 51-361 Wilczyce, Poland',
      ],
    },
    {
      title: 'DSA contact point',
      paragraphs: [
        'Contact point for communication with EU Member State authorities, the European Commission, the Board and users on DSA matters:',
        'kontakt@guildbazaar.com',
      ],
    },
    {
      title: 'Content reports',
      paragraphs: [
        'Please send reports of content that may breach the law or the Terms to the DSA / general contact email, following the procedure described in the Terms.',
      ],
    },
  ],
}
