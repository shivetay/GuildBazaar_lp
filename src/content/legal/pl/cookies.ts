import type { LegalDocument } from '../types'

export const cookiesPl: LegalDocument = {
  title: 'Polityka cookies',
  updatedAt: '2026-08-04',
  sections: [
    {
      title: '1. Czym są cookies',
      paragraphs: [
        'Pliki cookies to małe informacje tekstowe zapisywane na urządzeniu użytkownika podczas przeglądania strony. Podobne technologie mogą obejmować local storage lub podobne mechanizmy przeglądarki.',
      ],
    },
    {
      title: '2. Jakie cookies stosujemy obecnie',
      paragraphs: [
        'Na stronie landing page GuildBazaar stosujemy przede wszystkim cookies i podobne technologie niezbędne do działania serwisu, w szczególności:',
      ],
      list: [
        'cookies / mechanizmy związane z wyborem języka (locale) i routingiem next-intl,',
        'cookies techniczne związane z infrastrukturą hostingu i bezpieczeństwem,',
        'cookies sesyjne dostawcy backendu (Supabase), jeżeli są wykorzystywane w danym żądaniu.',
      ],
    },
    {
      title: '3. Cookies marketingowe i analityczne',
      paragraphs: [
        'Obecnie nie wdrażamy cookies marketingowych (np. Google Ads) ani dedykowanych skryptów analitycznych (np. Vercel Analytics) na tej stronie.',
        'Jeśli w przyszłości dodamy takie technologie, zaktualizujemy tę Politykę i — w razie wymogu prawa — wdrożymy mechanizm zgody.',
      ],
    },
    {
      title: '4. Podstawa prawna',
      paragraphs: [
        'Cookies niezbędne do świadczenia usługi drogą elektroniczną stosujemy na podstawie prawnie uzasadnionego interesu Administratora oraz przepisów o świadczeniu usług drogą elektroniczną / prawa telekomunikacyjnego — w zakresie dozwolonym dla cookies niezbędnych.',
        'Cookies nieistotne dla działania usługi (np. marketingowe) będziemy stosować wyłącznie za zgodą, jeżeli takie cookies zostaną wprowadzone.',
      ],
    },
    {
      title: '5. Zarządzanie cookies',
      paragraphs: [
        'Możesz ograniczyć lub usunąć cookies w ustawieniach przeglądarki. Wyłączenie cookies niezbędnych może utrudnić lub uniemożliwić prawidłowe działanie strony (np. zapamiętanie języka).',
      ],
    },
    {
      title: '6. Więcej informacji',
      paragraphs: [
        'Szczegóły przetwarzania danych osobowych zawiera Polityka prywatności. Kontakt: [E-MAIL – UZUPEŁNIĆ].',
        'W razie rozbieżności między wersją polską a angielską pierwszeństwo ma wersja polska.',
      ],
    },
  ],
}
