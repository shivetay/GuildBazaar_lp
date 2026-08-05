import type { LegalDocument } from '../types'

export const contactPl: LegalDocument = {
  title: 'Kontakt',
  updatedAt: '2026-08-04',
  sections: [
    {
      title: 'Dane Usługodawcy',
      paragraphs: [
        'FSP Łukasz Dawidowicz',
        'Adres: [ADRES – UZUPEŁNIĆ]',
        'NIP: [NIP – UZUPEŁNIĆ]',
        'REGON: [REGON – UZUPEŁNIĆ]',
      ],
    },
    {
      title: 'Kontakt ogólny',
      paragraphs: [
        'E-mail: [E-MAIL – UZUPEŁNIĆ]',
        'Telefon: [NUMER TELEFONU – UZUPEŁNIĆ]',
        'Poczta tradycyjna: [ADRES – UZUPEŁNIĆ]',
      ],
    },
    {
      title: 'Punkt kontaktowy DSA',
      paragraphs: [
        'Punkt kontaktowy do komunikacji z organami państw członkowskich UE, Komisją Europejską, Radą ds. Usług Cyfrowych oraz Usługobiorcami w sprawach objętych DSA:',
        '[E-MAIL KONTAKTOWY DSA – UZUPEŁNIĆ]',
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
