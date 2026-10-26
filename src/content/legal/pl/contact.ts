import type { LegalDocument } from '../types'

export const contactPl: LegalDocument = {
  title: 'Kontakt',
  updatedAt: '2026-10-26',
  sections: [
    {
      title: 'Dane Usługodawcy',
      paragraphs: [
        'FSP Łukasz Dawidowicz',
        'Adres: ul. Dworska 8D, 51-361 Wilczyce',
        'NIP: 6922391957',
        'REGON: 524775528',
      ],
    },
    {
      title: 'Kontakt ogólny',
      paragraphs: [
        'E-mail: kontakt@guildbazaar.com',
        'Telefon: +48 697 449 932',
        'Poczta tradycyjna: ul. Dworska 8D, 51-361 Wilczyce',
      ],
    },
    {
      title: 'Punkt kontaktowy DSA',
      paragraphs: [
        'Punkt kontaktowy do komunikacji z organami państw członkowskich UE, Komisją Europejską, Radą ds. Usług Cyfrowych oraz Usługobiorcami w sprawach objętych DSA:',
        'kontakt@guildbazaar.com',
      ],
    },
    {
      title: 'Zgłaszanie treści',
      paragraphs: [
        'Zgłoszenia treści mogących naruszać prawo lub Regulamin prosimy kierować na adres wskazany w punkcie kontaktowym DSA / kontakcie ogólnym, zgodnie z procedurą opisaną w Regulaminie.',
      ],
    },
  ],
}
