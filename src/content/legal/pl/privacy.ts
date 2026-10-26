import type { LegalDocument } from '../types'

export const privacyPl: LegalDocument = {
  title: 'Polityka prywatności',
  updatedAt: '2026-10-26',
  sections: [
    {
      title: '1. Administrator danych',
      paragraphs: [
        'Administratorem danych osobowych jest Łukasz Dawidowicz, prowadzący działalność pod firmą FSP Łukasz Dawidowicz, adres: [ADRES – UZUPEŁNIĆ], NIP: [NIP – UZUPEŁNIĆ], REGON: [REGON – UZUPEŁNIĆ] (dalej: „Administrator”).',
        'Kontakt w sprawach ochrony danych: [E-MAIL – UZUPEŁNIĆ].',
      ],
    },
    {
      title: '2. Zakres zastosowania',
      paragraphs: [
        'Niniejsza Polityka dotyczy przetwarzania danych osobowych w związku z korzystaniem ze strony informacyjnej GuildBazaar (landing page) oraz formularza listy oczekujących (waitlist).',
        'Po uruchomieniu pełnej platformy (konta, profile, oferty, płatności) Polityka zostanie zaktualizowana o dodatkowe cele, kategorie danych i odbiorców.',
      ],
    },
    {
      title: '3. Jakie dane zbieramy',
      paragraphs: [
        'W ramach formularza waitlist przetwarzamy:',
      ],
      list: [
        'imię i nazwisko',
        'adres e-mail',
        'rolę / profil zainteresowania (np. rekonstruktor, wystawca, uczestnik)',
        'opcjonalną wiadomość',
        'preferowany język (locale) wskazany przy zapisie',
        'źródło wejścia na stronę: parametry kampanii (UTM) z linku oraz domenę strony, z której nastąpiło przejście (bez pełnego adresu)',
        'informacje o zgodzie: datę jej wyrażenia i wersję jej treści oraz datę potwierdzenia adresu e-mail linkiem z wiadomości',
      ],
    },
    {
      title: '4. Cele i podstawy prawne',
      list: [
        'zapis na listę oczekujących i kontakt w sprawie startu / beta — art. 6 ust. 1 lit. b RODO (działania przedumowne / wykonanie żądania) lub lit. f (prawnie uzasadniony interes Administratora polegający na budowie społeczności produktu),',
        'odpowiedzi na zapytania kontaktowe — art. 6 ust. 1 lit. f RODO,',
        'obowiązki prawne Administratora (np. rozliczenia, gdy pojawią się płatności) — art. 6 ust. 1 lit. c RODO,',
        'wysyłka wiadomości e-mail z informacją o starcie platformy i zaproszeniem do beta-testów — na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO oraz art. 398 ustawy Prawo komunikacji elektronicznej), wyrażonej w formularzu i potwierdzonej linkiem z wiadomości e-mail. Zgodę możesz wycofać w każdej chwili, kontaktując się z Administratorem; wycofanie nie wpływa na zgodność z prawem przetwarzania sprzed wycofania.',
      ],
    },
    {
      title: '5. Odbiorcy danych',
      paragraphs: [
        'Dane waitlist są przechowywane u dostawcy infrastruktury bazy danych — Supabase (hosting bazy / backend).',
        'Wiadomości e-mail (w tym wiadomość z linkiem potwierdzającym) wysyłamy za pośrednictwem Resend (Resend, Inc.) — dostawca otrzymuje adres e-mail, imię i treść wiadomości w zakresie niezbędnym do jej doręczenia.',
        'Hosting strony może być realizowany przez dostawcę chmurowego (np. Vercel) — wtedy dostawca przetwarza dane techniczne niezbędne do dostarczenia strony.',
        'Do pomiaru ruchu używamy Vercel Web Analytics. Narzędzie nie stosuje cookies ani nie zapisuje adresu IP — zlicza odsłony na podstawie zanonimizowanego identyfikatora, który zmienia się codziennie, i dane zbiorcze (np. odwiedzana podstrona, źródło wejścia, kraj, typ urządzenia i przeglądarki). Podstawa: art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes w ocenie zasięgu strony).',
        'Obecnie na stronie nie są wdrożone skrypty Google Ads. Jeśli w przyszłości je dodamy, zaktualizujemy tę Politykę oraz — w razie potrzeby — Politykę cookies.',
      ],
    },
    {
      title: '6. Okres przechowywania',
      paragraphs: [
        'Dane z waitlist przechowujemy do czasu uruchomienia platformy i poinformowania zapisanych osób albo do czasu skutecznego żądania usunięcia / sprzeciwu — nie dłużej niż jest to potrzebne do celu zapisu, a następnie przez okres niezbędny do ustalenia, dochodzenia lub obrony roszczeń, jeżeli dotyczy.',
      ],
    },
    {
      title: '7. Prawa osoby, której dane dotyczą',
      paragraphs: [
        'Przysługuje Ci prawo dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych (w zakresie przewidzianym RODO), sprzeciwu wobec przetwarzania opartego na art. 6 ust. 1 lit. f RODO oraz prawo wniesienia skargi do Prezesa UODO.',
        'Aby skorzystać z praw, napisz na: [E-MAIL – UZUPEŁNIĆ].',
      ],
    },
    {
      title: '8. Dobrowolność i wymogi',
      paragraphs: [
        'Podanie danych w formularzu waitlist jest dobrowolne, lecz niezbędne do zapisu na listę. Niepodanie danych uniemożliwia zapis.',
      ],
    },
    {
      title: '9. Przekazywanie poza EOG',
      paragraphs: [
        'Część dostawców technicznych może przetwarzać dane poza Europejskim Obszarem Gospodarczym. W takich przypadkach stosujemy mechanizmy przewidziane RODO (np. standardowe klauzule umowne), o ile są wymagane.',
        'Resend, Inc. jest podmiotem z USA. Wiadomości wysyłamy z regionu UE, jednak dostawca może mieć dostęp do danych z USA — na podstawie standardowych klauzul umownych lub decyzji Komisji Europejskiej w sprawie EU-US Data Privacy Framework.',
      ],
    },
    {
      title: '10. Zmiany Polityki',
      paragraphs: [
        'Możemy aktualizować Politykę. Nowa wersja obowiązuje od daty publikacji na tej stronie.',
        'W razie rozbieżności między wersją polską a angielską pierwszeństwo ma wersja polska.',
      ],
    },
  ],
}
