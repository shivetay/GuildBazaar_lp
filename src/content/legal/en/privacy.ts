import type { LegalDocument } from '../types'

export const privacyEn: LegalDocument = {
  title: 'Privacy Policy',
  updatedAt: '2026-10-26',
  sections: [
    {
      title: '1. Data controller',
      paragraphs: [
        'The controller of personal data is Łukasz Dawidowicz, conducting business as FSP Łukasz Dawidowicz, address: ul. Dworska 8D, 51-361 Wilczyce, Poland, NIP: 6922391957, REGON: 524775528 (the “Controller”).',
        'Data protection contact: kontakt@guildbazaar.com.',
      ],
    },
    {
      title: '2. Scope',
      paragraphs: [
        'This Policy covers personal data processing related to the GuildBazaar informational landing page and the waitlist form.',
        'When the full platform launches (accounts, profiles, offers, payments), this Policy will be updated with additional purposes, data categories and recipients.',
      ],
    },
    {
      title: '3. What data we collect',
      paragraphs: ['Via the waitlist form we process:'],
      list: [
        'full name',
        'email address',
        'role / interest profile (e.g. re-enactor, vendor, participant)',
        'optional message',
        'preferred language (locale) at signup',
        'how you reached the site: campaign parameters (UTM) from the link and the domain of the referring site (not the full address)',
        'consent details: when you gave it and which wording you agreed to, and when you confirmed your email address via the link we sent',
      ],
    },
    {
      title: '4. Purposes and legal bases',
      list: [
        'waitlist signup and contact about launch / beta — Art. 6(1)(b) GDPR (pre-contractual steps) or Art. 6(1)(f) (legitimate interest in building the product community),',
        'responding to contact requests — Art. 6(1)(f) GDPR,',
        'legal obligations of the Controller (e.g. accounting when payments appear) — Art. 6(1)(c) GDPR,',
        'emails about the platform launch and an invitation to beta tests — based on your consent (Art. 6(1)(a) GDPR and Art. 398 of the Polish Electronic Communications Law), given in the form and confirmed via the link in our email. You can withdraw consent at any time by contacting the Controller; withdrawal does not affect the lawfulness of processing before it.',
      ],
    },
    {
      title: '5. Recipients',
      paragraphs: [
        'Waitlist data is stored with our database infrastructure provider — Supabase.',
        'We send emails (including the confirmation link) through Resend (Resend, Inc.), which receives your email address, name and the message content as needed to deliver it.',
        'The site may be hosted by a cloud provider (e.g. Vercel), which then processes technical data necessary to deliver the site.',
        'We measure traffic with Vercel Web Analytics. It uses no cookies and does not store IP addresses — it counts page views using an anonymised identifier that changes daily, plus aggregate data (e.g. page visited, referrer, country, device and browser type). Legal basis: Art. 6(1)(f) GDPR (legitimate interest in understanding the site\'s reach).',
        'Google Ads scripts are not currently implemented. If we add them later, we will update this Policy and, if needed, the Cookie Policy.',
      ],
    },
    {
      title: '6. Retention',
      paragraphs: [
        'We keep waitlist data until the platform launches and signed-up persons are informed, or until a valid erasure / objection request — no longer than needed for the signup purpose, and then for any period needed to establish, exercise or defend legal claims, if applicable.',
      ],
    },
    {
      title: '7. Your rights',
      paragraphs: [
        'You have the right of access, rectification, erasure, restriction, data portability (as provided by the GDPR), objection to processing based on Art. 6(1)(f) GDPR, and the right to lodge a complaint with a supervisory authority (in Poland: the President of UODO).',
        'To exercise your rights, email: kontakt@guildbazaar.com.',
      ],
    },
    {
      title: '8. Voluntary provision',
      paragraphs: [
        'Providing waitlist data is voluntary but necessary to join the list. Without the data, signup is not possible.',
      ],
    },
    {
      title: '9. Transfers outside the EEA',
      paragraphs: [
        'Some technical providers may process data outside the European Economic Area. Where required, we use GDPR transfer mechanisms (e.g. standard contractual clauses).',
        'Resend, Inc. is a US company. We send emails from its EU region, but the provider may access data from the US — under standard contractual clauses or the European Commission\'s EU-US Data Privacy Framework decision.',
      ],
    },
    {
      title: '10. Changes',
      paragraphs: [
        'We may update this Policy. The new version applies from the publication date on this page.',
        'If there is any conflict between the Polish and English versions, the Polish version prevails.',
      ],
    },
  ],
}
