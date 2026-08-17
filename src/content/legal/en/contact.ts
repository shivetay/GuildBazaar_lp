import type { LegalDocument } from '../types'

export const contactEn: LegalDocument = {
  title: 'Contact',
  updatedAt: '2026-08-04',
  sections: [
    {
      title: 'Provider details',
      paragraphs: [
        'FSP Łukasz Dawidowicz',
        'Address: [ADDRESS – TO BE COMPLETED]',
        'NIP: [NIP – TO BE COMPLETED]',
        'REGON: [REGON – TO BE COMPLETED]',
      ],
    },
    {
      title: 'General contact',
      paragraphs: [
        'Email: [EMAIL – TO BE COMPLETED]',
        'Phone: [PHONE – TO BE COMPLETED]',
        'Postal mail: [ADDRESS – TO BE COMPLETED]',
      ],
    },
    {
      title: 'DSA contact point',
      paragraphs: [
        'Contact point for communication with EU Member State authorities, the European Commission, the Board and users on DSA matters:',
        '[DSA CONTACT EMAIL – TO BE COMPLETED]',
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
