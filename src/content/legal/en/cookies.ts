import type { LegalDocument } from '../types'

export const cookiesEn: LegalDocument = {
  title: 'Cookie Policy',
  updatedAt: '2026-08-04',
  sections: [
    {
      title: '1. What cookies are',
      paragraphs: [
        'Cookies are small text files stored on your device when you browse a website. Similar technologies may include local storage or comparable browser mechanisms.',
      ],
    },
    {
      title: '2. Cookies we use today',
      paragraphs: [
        'On the GuildBazaar landing page we primarily use cookies and similar technologies that are necessary for the service to work, in particular:',
      ],
      list: [
        'cookies / mechanisms related to language (locale) choice and next-intl routing,',
        'technical cookies related to hosting infrastructure and security,',
        'session cookies of the backend provider (Supabase), if used for a given request.',
      ],
    },
    {
      title: '3. Marketing and analytics cookies',
      paragraphs: [
        'We do not currently deploy marketing cookies (e.g. Google Ads) or dedicated analytics scripts (e.g. Vercel Analytics) on this site.',
        'If we add such technologies later, we will update this Policy and — where required by law — implement a consent mechanism.',
      ],
    },
    {
      title: '4. Legal basis',
      paragraphs: [
        'Necessary cookies for providing the electronic service are used based on the Controller’s legitimate interest and applicable e-privacy / electronic services rules, to the extent allowed for strictly necessary cookies.',
        'Non-essential cookies (e.g. marketing) will only be used with consent if such cookies are introduced.',
      ],
    },
    {
      title: '5. Managing cookies',
      paragraphs: [
        'You can limit or delete cookies in your browser settings. Disabling necessary cookies may impair or prevent proper site operation (e.g. remembering language).',
      ],
    },
    {
      title: '6. More information',
      paragraphs: [
        'Details on personal data processing are in the Privacy Policy. Contact: [EMAIL – TO BE COMPLETED].',
        'If there is any conflict between the Polish and English versions, the Polish version prevails.',
      ],
    },
  ],
}
