# KiteSchool — specyfikacja klikalnego prototypu frontendowego

Wersja 1.0 · 18.10.2026 · Język interfejsu: polski

## 1. Cel i podstawa specyfikacji

Zbuduj responsywny, dopracowany wizualnie prototyp webowy szkoły kitesurfingu KiteSchool. Ma umożliwiać demonstrację interfejsów Managera, Instruktora i Kursanta oraz przejść między ekranami. Styl: **Hawaiian Surf / Tropical Modern** — ocean, piasek, koralowe akcenty i subtelna fotografia sportowa, zachowujące czytelność aplikacji roboczej.

Podstawą jest końcowy zestaw 24 historyjek z rozmowy „Rozbicie systemu kitesurfingowego”. Zachowano identyfikatory US-001–US-024 i ich zakres. Kryteria akceptacji, trasy, modele mocków, szczegóły dostępności i zachowania demonstracyjne są doprecyzowaniem wdrożeniowym. Wcześniejsze pomysły dotyczące automatyzacji i integracji nie rozszerzają zakresu tego prototypu.

**Efekt:** działająca lokalnie interaktywna makieta. Nie jest to system do faktycznego prowadzenia szkoły. Wszystkie historyjki poniżej są wymagane; kolejność realizacji nie oznacza redukcji zakresu.

## 2. Nieprzekraczalne ograniczenia

| ID | Wymaganie |
|---|---|
| SCOPE-01 | Wyłącznie frontend. Bez backendu, funkcji serwerowych, bazy danych i usług chmurowych. |
| SCOPE-02 | Bez API, fetch/XHR, WebSocketów, integracji pogodowych, bramek SMS, analityki i zewnętrznych usług podpisu. |
| SCOPE-03 | Bez logowania, rejestracji kont, sesji, tokenów i rzeczywistej autoryzacji. Przełączanie ról to nawigacja demonstracyjna. |
| SCOPE-04 | Bez trwałego zapisu: localStorage, sessionStorage, IndexedDB, cookies i zapisu formularzy do plików. Odświeżenie odtwarza dane wyjściowe. |
| SCOPE-05 | Bez algorytmów dopasowania instruktorów według wagi, IKO, doświadczenia lub historii; bez wykrywania kolizji i sprawdzania dostępności. |
| SCOPE-06 | Bez reguł pogodowych, automatycznego odwoływania/przekładania lekcji, obliczania zastępstw i wysyłania powiadomień. |
| SCOPE-07 | Bez rzeczywistych rezerwacji, płatności, dokumentacji prawnej, podpisów elektronicznych lub certyfikacji IKO. |
| SCOPE-08 | Dane są fikcyjne; pogoda, alerty, KPI, statusy, przypisania i propozycje zastępstw pochodzą z gotowych fixture’ów. |

### Dozwolony stan interfejsu

Dozwolone: router, aktywna rola, otwarte okna, zakładki, wybór daty/tygodnia, pola formularzy, wyszukiwanie i filtrowanie lokalnych rekordów, zaznaczone przedziały dostępności, wybrany zastępca, szkic podpisu, toast. Filtrowanie jest prezentacją danych, nie regułą biznesową.

**Jednolity kontrakt zapisu:** akcje „Zapisz”, „Wyślij”, „Przypisz”, „Odwołaj” i „Potwierdź” zamykają poprawnie wypełniony formularz/dialog i pokazują komunikat „To demonstracja — dane nie zostały zapisane”. Nie zmieniają rekordów, KPI, statusów ani widoków innych ról. Zaznaczenia dostępności pozostają tylko do opuszczenia ekranu. Ponowne otwarcie formularza ładuje wartości początkowe. „Anuluj” zamyka formularz bez komunikatu sukcesu.

Dozwolona jest wyłącznie prosta walidacja UI: wymagane pola, format e-mail, poprawna liczba i godzina końcowa późniejsza niż początkowa. Błędy są widoczne przy polach. Nie sprawdzaj wieku, zgodności IKO, masy ciała, wiatru, konfliktów, dostępności ani daty względem rzeczywistego dnia. Stałe „2 godziny” i oś 8:00–18:00 są elementami prezentacji, a nie silnikiem reguł. Opcje początku lekcji 08:00–16:00 co godzinę są stałą listą demonstracyjną.

W całej aplikacji widoczny dyskretny znacznik „Prototyp · dane demonstracyjne”. Pogoda ma etykietę „Przykładowa prognoza”, SMS — „Podgląd demonstracyjny”, podpis — „Podpis demonstracyjny, bez skutków prawnych”.

## 3. Technologia i organizacja implementacji

- React + TypeScript + Vite, Tailwind CSS, React Router i Lucide React.
- Uruchomienie: `npm install`, `npm run dev`; kontrola kompilacji: `npm run build`.
- Dane w lokalnych modułach TypeScript/JSON. Obrazy, fonty i inne zasoby w projekcie; bez CDN i zasobów wymagających połączenia podczas korzystania z prototypu. Instalacja zależności może wymagać internetu.
- Lokalny stan React; bez biblioteki dostępu do API, repozytoriów danych i warstwy usług biznesowych.
- Zalecane katalogi: `src/app` (router, layout), `src/components`, `src/pages/{manager,instructor,student}`, `src/mocks`, `src/types`, `src/styles`, `public/assets`.
- README opisuje start, build, role, stały tydzień demonstracyjny i brak trwałego zapisu.
- Preferuj wspólne komponenty i prosty kalendarz zbudowany z siatki. Nie dodawaj przeciągania lekcji, eksportów, ustawień administracyjnych ani innych funkcji spoza specyfikacji.

## 4. Role, układ i nawigacja

### Układ wspólny

Desktop: sidebar 240 px, górny pasek minimum 72 px, treść z odstępami 24–32 px. Pasek zawiera nazwę KiteSchool, przełącznik ról, dzwonek i avatar z imieniem aktywnej postaci. Avatar otwiera mały panel z imieniem i rolą; bez ustawień konta. Dzwonek otwiera podgląd wiadomości danej roli i link do pełnej listy. Logo prowadzi do dashboardu aktywnej roli.

Start `/` przekierowuje na `/manager/dashboard`. Zmiana roli zawsze prowadzi na dashboard nowej roli i zamyka otwarte nakładki. Aktywną rolę wyznacza prefiks trasy; bezpośredni adres synchronizuje przełącznik i menu. To wyłącznie konwencja prezentacji, bez zabezpieczania tras. Wstecz/dalej przeglądarki działa. Nieznany adres pokazuje ekran „Nie znaleziono strony” z powrotem do dashboardu.

| Rola | Menu w kolejności |
|---|---|
| Manager | Dashboard, Harmonogram, Kursanci, Instruktorzy, Centrum zmian, Powiadomienia, Rejestr szkoleń |
| Instruktor | Mój dashboard, Mój harmonogram, Moja dostępność, Moi kursanci, Powiadomienia |
| Kursant | Mój dashboard, Moje zajęcia, Zapisz się na lekcję, Historia szkoleń, Powiadomienia |

„Historia szkoleń” jest skrótem do zakładki Historia w „Moich zajęciach”, nie dodatkowym modułem. Powiadomienia Instruktora i Kursanta są widokami wspólnego centrum, z przygotowanym podzbiorem danych tylko do odczytu; nie tworzą nowych historyjek. Aktywna pozycja menu i breadcrumbs pomagają wrócić z profilu do listy. Przywracanie pozycji przewijania nie jest wymagane.

### Inwentarz ekranów i nakładek

Identyfikatory w trasach odnoszą się do lokalnych fixture’ów. Nieznany identyfikator pokazuje „Nie znaleziono rekordu” oraz powrót do listy.

| Ekran / trasa | Zawartość i nakładki | Stories |
|---|---|---|
| `/manager/dashboard` | Powitanie, KPI, pogoda, lekcje, alerty; formularz lekcji | 003, 005 |
| `/manager/schedule` | Kalendarz dzień/tydzień, filtry; szczegóły i formularz lekcji | 004–006 |
| `/manager/students` | Tabela, wyszukiwanie, filtr; formularz dodawania | 007, 009 |
| `/manager/students/:studentId` | Profil, historia, przyszłe zajęcia; edycja | 008, 009 |
| `/manager/instructors` | Siatka kart | 010 |
| `/manager/instructors/:instructorId` | Profil, dostępność, lekcje, kursanci | 011 |
| `/manager/changes` | Lista problemów; wybór zastępcy lub odwołanie | 012, 013 |
| `/manager/notifications` | Lista SMS, podgląd; formularz nowej wiadomości | 014 |
| `/manager/training-log` | Odbyte lekcje i potwierdzenia; szczegóły tylko do odczytu | 015 |
| `/instructor/dashboard` | Najbliższa lekcja, plan dnia, pogoda, wiadomości; nieobecność | 016, 020 |
| `/instructor/schedule` | Własny kalendarz; szczegóły lekcji tylko do odczytu | 017 |
| `/instructor/availability` | Siatka wyboru dostępności | 018 |
| `/instructor/students` | Lista przypisanych osób; panel szczegółów | 019 |
| `/instructor/notifications` | Wspólna lista i podgląd wiadomości, bez tworzenia | 002, 016 |
| `/student/dashboard` | IKO, następna lekcja, instruktor, pogoda, licznik | 021 |
| `/student/enroll` | Formularz zgłoszenia | 022 |
| `/student/lessons?tab=upcoming` | Karty nadchodzących; szczegóły | 023 |
| `/student/lessons?tab=history` | Karty odbytych; formularz potwierdzenia | 023, 024 |
| `/student/notifications` | Wspólna lista i podgląd, bez tworzenia | 002 |

Formularze Managera oraz nieobecność, zastępstwo i potwierdzenie otwierają się w panelu bocznym (desktop: 480–560 px; mobile: pełny ekran). Krótkie potwierdzenie odwołania jest dialogiem. Szczegóły lekcji korzystają z jednego komponentu z wariantem roli. Nie otwieraj paneli warstwowo: przejście ze szczegółów do edycji zastępuje zawartość panelu.

## 5. Wymagania wizualne i dostępność

### Tokeny Hawaiian Tropical Modern

Poniższe nazwy należy odwzorować w CSS/Tailwind. Kolory marki nie gwarantują kontrastu tekstu — używaj wskazanych ciemniejszych wariantów.

| Token | Wartość | Zastosowanie |
|---|---|---|
| `color.ocean` | `#00A8A8` | Akcenty, grafiki, aktywne elementy dekoracyjne |
| `color.oceanStrong` | `#007575` | Główne przyciski z białym tekstem, linki |
| `color.navy` | `#123B5D` | Nagłówki, sidebar, podstawowy tekst |
| `color.coral` | `#FF735C` | Drobne akcenty i wyróżnienia |
| `color.coralStrong` | `#B93827` | Tekst ostrzeżenia/destrukcyjne akcje |
| `color.sand` | `#FAF7F0` | Tło aplikacji |
| `color.surface` | `#FFFFFF` | Karty, panele, formularze |
| `color.success` | `#38A169` | Dekoracyjny kolor sukcesu |
| `color.successText` | `#246B45` | Czytelny tekst statusu sukcesu |
| `color.warningText` | `#805200` | Ostrzeżenia na jasnym tle |
| `color.muted` | `#526777` | Tekst pomocniczy |
| `color.border` | `#DCE5E2` | Delikatne separatory |
| `color.controlBorder` | `#71838A` | Granice pól wymagające wyraźnego kontrastu |
| `color.focus` | `#007575` | Obramowanie focus 3 px + odstęp 2 px |
| `font.body` | Inter, system-ui, sans-serif | Lokalny font lub fallback systemowy |
| `font.heading` | Poppins, Inter, system-ui, sans-serif | Lokalny font lub fallback |
| `type` | 12 / 14 / 16 / 20 / 24 / 32 px | Metadane / tekst / śródtytuły / tytuły; body 16 px, line-height 1.5 |
| `spacing` | 4 / 8 / 12 / 16 / 24 / 32 / 48 px | Spójna skala odstępów |
| `radius` | 8 / 12 / 16 / 999 px | Pola / przyciski / karty / badge |
| `shadow.card` | `0 4px 20px rgba(18,59,93,.06)` | Subtelne uniesienie kart |
| `shadow.panel` | `0 16px 48px rgba(18,59,93,.16)` | Nakładki |
| `motion` | 150–200 ms ease-out | Hover, otwieranie; respektuj reduced-motion |
| `icons` | Lucide, 20–24 px, stroke 1.75–2 | Jednolity zestaw ikon |

Duża fotografia oceanu/kitesurfingu tylko w powitaniu dashboardu, ze stabilnym kontrastowym podkładem pod tekst. Pozostałe ekrany są spokojne i robocze. Subtelna linia fali lub organiczny kształt może zdobić nagłówek. Bez palm przy każdym przycisku, emoji jako ikon interfejsu i dużych zdjęć ograniczających przestrzeń kalendarza. Zdjęcia lokalne, z prawem użycia i opisem źródła w README; przy braku zasobu użyj estetycznego lokalnego SVG/gradientu. Avatary mogą używać inicjałów.

### Responsywność

- `<768 px`: nawigacja w wysuwanym menu, jedna kolumna kart, panele pełnoekranowe, widok dnia/agendy jako domyślny harmonogram. Dostępny przełącznik tygodnia może pokazać siatkę z przewijaniem wewnątrz komponentu.
- `768–1023 px`: dwie kolumny kart tam, gdzie treść się mieści, sidebar zwijany.
- `≥1024 px`: pełny sidebar, kalendarz tygodniowy, KPI w czterech kolumnach.
- Sprawdź szerokości 375, 768 i 1440 px. Bez poziomego przewijania całej strony. Tabele mogą mieć opisany przewijany kontener albo przechodzić w karty; nie ukrywaj wymaganych informacji.

### Dostępność i stany wspólne

Cel WCAG 2.2 AA: kontrast tekstu minimum 4.5:1, dużego tekstu 3:1; widoczne granice i stany kontrolek. Status ma tekst oraz kolor/ikonę. Każde pole ma etykietę; przyciski ikonowe mają nazwy dostępności. Obsługa klawiaturą, widoczny focus, skip-link, logiczne nagłówki. Cel dotykowy minimum 44×44 px. Dialog przechwytuje focus, zamyka się Escape i przywraca focus wyzwalaczowi. Toast używa `aria-live`; błędy pól są powiązane z polami. Podpis ma alternatywę tekstową.

Każda lista ma pusty stan z wyjaśnieniem i akcją „Wyczyść filtry”, jeśli dotyczy. Brak rekordu ma czytelny powrót. Nie dodawaj sztucznych opóźnień ani udawanych błędów sieci. Brak zdjęcia pokazuje inicjały. Żaden widoczny przycisk nie pozostaje bez reakcji.

## 6. User stories i kryteria akceptacji

Wszystkie kryteria podlegają ograniczeniom z sekcji 2 i wspólnym wymaganiom dostępności. „Zapis” w poniższych scenariuszach oznacza wyłącznie kontrakt demonstracyjny.

### EPIC UI-01 — Nawigacja i struktura aplikacji

#### US-001 — Przełączanie ról

Jako użytkownik prototypu chcę przełączać się między rolami Manager, Instruktor i Kursant, aby zobaczyć interfejs każdej z nich.

**Kryteria akceptacji:**
- Nagłówek na każdej stronie pokazuje aktualną rolę i selektor trzech ról, również na mobile.
- Wybór roli zmienia menu, demonstracyjny profil i dashboard zgodnie z sekcją 4.
- Żadna zmiana roli nie wymaga logowania ani nie uruchamia zapytania sieciowego.
- Zmiana roli zamyka formularze; nie przenosi wpisanych danych między rolami.

#### US-002 — Nawigacja

Jako użytkownik chcę korzystać z menu, aby łatwo przechodzić między dostępnymi ekranami.

**Kryteria akceptacji:**
- Każda pozycja menu z sekcji 4 otwiera właściwy ekran; aktywna pozycja jest wyróżniona wizualnie i przez `aria-current`.
- Mobile udostępnia przycisk otwarcia/zamknięcia menu; wybór pozycji zamyka menu.
- Linki szczegółów i powrotu oraz wstecz/dalej przeglądarki działają bez pełnego przeładowania aplikacji.
- Dzwonek otwiera podgląd wiadomości; przejście do listy respektuje aktywną rolę.

### EPIC UI-02 — Dashboard managera

#### US-003 — Dashboard szkoły

Jako manager chcę zobaczyć podsumowanie bieżącej działalności szkoły, aby szybko zorientować się w sytuacji.

**UI:** powitanie z tropikalnym zdjęciem, data i dzień tygodnia, pogoda i wiatr; cztery KPI: dzisiejsze lekcje, dostępni instruktorzy, oczekujące zgłoszenia, zajęcia wymagające uwagi; najbliższe lekcje, alerty, „Zaplanuj lekcję”.

**Kryteria akceptacji:**
- Dashboard jest ekranem wejściowym Managera i pokazuje komplet wskazanych elementów z fixture’ów.
- Data odnosi się do stałego dnia demo, a pogoda ma jednostkę km/h i etykietę demonstracyjną.
- „Zaplanuj lekcję” otwiera US-005; karta lekcji otwiera US-006.
- Alert nieobecności/pogody prowadzi do Centrum zmian; brak potwierdzenia do Rejestru szkoleń z aktywnym filtrem.
- KPI są statyczne i spójne z wyjściowym scenariuszem, nie przeliczają się po akcjach.

### EPIC UI-03 — Harmonogram zajęć

#### US-004 — Kalendarz zajęć

Jako manager chcę przeglądać harmonogram szkoły w kalendarzu, aby widzieć zaplanowane lekcje.

**UI:** dzień/tydzień, godziny 8:00–18:00, kolumny dni, filtr instruktora, poprzedni/następny tydzień, „Tydzień demo”, dodawanie lekcji. Karta zawiera godzinę, kursanta, instruktora, IKO i status.

**Kryteria akceptacji:**
- Przełączenie dzień/tydzień zmienia prezentację tych samych danych; domyślny tydzień to fixture demo.
- Nawigacja zmienia zakres dat; poza zakresem fixture’ów wyświetla poprawny pusty kalendarz.
- Filtr instruktora pokazuje wyłącznie powiązane lokalne rekordy; „Wszyscy” przywraca całość.
- Kliknięcie lekcji otwiera szczegóły, a „Dodaj lekcję” otwiera formularz.
- Dwugodzinne bloki mają czytelny czas i status; nakładające się wpisy z fixture’ów mogą być obok siebie, bez wykrywania konfliktów.

#### US-005 — Formularz planowania lekcji

Jako manager chcę zobaczyć formularz tworzenia lekcji, aby zaprezentować proces planowania.

**UI:** kursant, instruktor, data, godzina rozpoczęcia, stała informacja „Czas trwania: 2 godziny”, przykładowa pogoda, „Zapisz lekcję”, „Anuluj”.

**Kryteria akceptacji:**
- Formularz otwiera się z dashboardu i harmonogramu; selektory korzystają z lokalnych danych.
- Kursant, instruktor, data i godzina są wymagane; ich brak pokazuje błędy przy polach.
- Pogoda nie zmienia się na podstawie wybranej daty; jest jasno opisana jako przykład.
- Zapis realizuje wyłącznie kontrakt demo; nie dodaje lekcji i nie sprawdza dostępności ani wiatru.
- Anulowanie, Escape i zamknięcie panelu wracają do ekranu wyjściowego.

#### US-006 — Szczegóły lekcji

Jako manager chcę zobaczyć szczegóły lekcji, aby poznać wszystkie informacje o zajęciach.

**UI:** kursant, instruktor, termin, status, IKO, pogoda; „Edytuj”, „Odwołaj”, „Zmień instruktora”.

**Kryteria akceptacji:**
- Wybrana karta otwiera właściwy rekord z kompletem danych.
- „Edytuj” pokazuje formularz US-005 z wartościami lekcji i tytułem „Edytuj lekcję”.
- „Odwołaj” otwiera dialog z terminem, kursantem, przyciskiem „Odwołaj lekcję” i „Anuluj”; zatwierdzenie realizuje kontrakt demo.
- „Zmień instruktora” otwiera US-013. Żadna akcja nie zmienia bazowych danych.

### EPIC UI-04 — Zarządzanie kursantami

#### US-007 — Lista kursantów

Jako manager chcę przeglądać kursantów w tabeli, aby szybko znaleźć interesującą osobę.

**UI:** imię i nazwisko, IKO, waga w kg, liczba odbytych lekcji, data ostatnich zajęć; wyszukiwarka, filtr IKO, „Dodaj kursanta”.

**Kryteria akceptacji:**
- Tabela pokazuje wszystkie wymagane kolumny; brak ostatniej lekcji jest oznaczony „Brak”.
- Wyszukiwanie po imieniu/nazwisku ignoruje wielkość liter i łączy się z filtrem IKO.
- Brak wyników pokazuje pusty stan i czyszczenie filtrów.
- Wiersz lub jawny link otwiera US-008; dodawanie otwiera US-009.

#### US-008 — Profil kursanta

Jako manager chcę otworzyć profil kursanta, aby zobaczyć jego dane i historię szkoleń.

**UI:** avatar, imię i nazwisko, telefon, e-mail, IKO, waga, preferowany instruktor, historia, nadchodzące zajęcia, „Edytuj profil”.

**Kryteria akceptacji:**
- Profil odpowiada identyfikatorowi w adresie i pokazuje wszystkie wskazane sekcje.
- Historia i nadchodzące zajęcia korzystają z jawnych powiązań fixture’ów; brak rekordów ma pusty stan.
- Kliknięcie lekcji otwiera US-006; edycja otwiera wypełniony US-009.
- Dostępny jest powrót do listy kursantów.

#### US-009 — Formularz kursanta

Jako manager chcę zobaczyć formularz dodawania lub edycji kursanta, aby zaprezentować uzupełnianie danych.

**UI:** imię i nazwisko, waga, IKO, telefon, e-mail; „Zapisz”, „Anuluj”.

**Kryteria akceptacji:**
- Dodawanie pokazuje puste pola; edycja pokazuje dane wybranej osoby.
- Imię i nazwisko oraz IKO są wymagane; waga, jeśli podana, musi być dodatnią liczbą; e-mail, jeśli podany, ma poprawny format. Telefon opcjonalny, bez weryfikacji numeru.
- IKO ma opcje Początkujący, IKO 1, IKO 2, IKO 3.
- Zapis i anulowanie respektują kontrakt demo; profil i tabela zachowują fixture’y.

### EPIC UI-05 — Zarządzanie instruktorami

#### US-010 — Lista instruktorów

Jako manager chcę przeglądać instruktorów w formie kart, aby porównywać dostępność i doświadczenie.

**UI karty:** zdjęcie/avatar, imię i nazwisko, waga w kg, doświadczenie w latach, status dostępności, liczba zaplanowanych lekcji, „Zobacz profil”.

**Kryteria akceptacji:**
- Każda karta pokazuje cały zestaw informacji; status ma tekst i kolor.
- Siatka dostosowuje liczbę kolumn do szerokości ekranu.
- Przycisk otwiera właściwy profil US-011.
- Dostępność i licznik są przygotowanymi danymi, niezależnymi od wybieranych formularzy.

#### US-011 — Profil instruktora

Jako manager chcę zobaczyć profil instruktora wraz z kalendarzem dostępności, aby zapoznać się z jego planem.

**UI:** dane osobowe, waga, doświadczenie, kalendarz dostępności, nadchodzące lekcje, przypisani kursanci.

**Kryteria akceptacji:**
- Kalendarz pokazuje przygotowane dostępne/niedostępne przedziały z legendą i datami.
- Dostępność jest tylko do odczytu; nie wylicza się z lekcji.
- Lekcja otwiera US-006, kursant otwiera US-008; dostępny jest powrót do instruktorów.
- Puste listy mają czytelne komunikaty.

### EPIC UI-06 — Reorganizacja harmonogramu

#### US-012 — Centrum zmian

Jako manager chcę widzieć listę lekcji wymagających reorganizacji, aby zaprezentować obsługę problemów.

**UI:** lekcja, powód problemu, termin, instruktor, status rozwiązania, „Rozwiąż problem”.

**Kryteria akceptacji:**
- Lista zawiera co najmniej nieobecność instruktora i słaby wiatr, zapisane w fixture’ach.
- Nieobecność otwiera US-013; słaby wiatr otwiera szczegóły lekcji z akcją odwołania.
- Status „Oczekuje”/„Rozwiązany” pochodzi z fixture’a; zatwierdzenie dialogu go nie zmienia.
- Żaden alert nie jest generowany przez pogodę ani zgłoszenie Instruktora.

#### US-013 — Wybór zastępstwa

Jako manager chcę zobaczyć interfejs wyboru instruktora zastępczego, aby zaprezentować zmianę przydziału.

**UI:** podsumowanie lekcji, obecny instruktor i przyczyna zmiany, przygotowana lista zastępców z doświadczeniem i dostępnością, „Przypisz zastępstwo”, „Anuluj”.

**Kryteria akceptacji:**
- Panel otwiera się z Centrum zmian oraz akcji „Zmień instruktora”.
- Kandydaci i ich kolejność są zdefiniowani jawnie dla lekcji; brak rankingu i obliczeń zgodności.
- Można wybrać jedną osobę; przycisk przypisania jest nieaktywny bez wyboru. Niedostępny kandydat ma nieaktywny wybór i etykietę z fixture’a.
- Przypisanie realizuje kontrakt demo, bez zmiany instruktora i wysyłki SMS.

### EPIC UI-07 — Powiadomienia

#### US-014 — Centrum powiadomień

Jako manager chcę przeglądać powiadomienia do kursantów i instruktorów, aby zaprezentować komunikację szkoły.

**UI:** lista wiadomości, odbiorca, typ, data, status, podgląd SMS, „Nowe powiadomienie”.

**Kryteria akceptacji:**
- Wybrana wiadomość pokazuje pełny przykładowy tekst SMS i dane odbiorcy.
- Statusy „Wysłano”, „Oczekuje”, „Błąd” są etykietami demonstracyjnymi, bez ponawiania wysyłki.
- „Nowe powiadomienie” otwiera panel: odbiorca z fixture’ów, typ wiadomości, treść, „Wyślij demonstracyjnie”, „Anuluj”; wszystkie trzy pola są wymagane.
- Zatwierdzenie pokazuje „To demonstracja — SMS nie został wysłany”; nie dodaje wiadomości do listy.
- Warianty dla Instruktora/Kursanta pokazują ich przygotowany podzbiór bez przycisku tworzenia.

### EPIC UI-08 — Dokumentacja

#### US-015 — Rejestr szkoleń

Jako manager chcę przeglądać dokumentację odbytych szkoleń, aby zobaczyć stan potwierdzeń.

**UI:** tabela lekcji, kursant, instruktor, data, status potwierdzenia, filtr „Brak potwierdzenia”, „Szczegóły”.

**Kryteria akceptacji:**
- Tabela zawiera tylko przygotowane odbyte lekcje, z potwierdzonymi i niepotwierdzonymi przykładami.
- Filtr ogranicza widok do rekordów oczekujących; alert dashboardu może go aktywować parametrem `?confirmation=missing`.
- Szczegóły pokazują podsumowanie lekcji i stan potwierdzenia tylko do odczytu.
- Brak funkcji eksportu, tworzenia dokumentów i prawdziwego podpisywania.

### EPIC UI-09 — Panel instruktora

#### US-016 — Dashboard instruktora

Jako instruktor chcę zobaczyć podsumowanie moich zajęć, aby szybko przejść do planu dnia.

**UI:** powitanie, najbliższa lekcja, dzisiejszy harmonogram, prognoza wiatru, powiadomienia, „Zgłoś nieobecność”.

**Kryteria akceptacji:**
- Dashboard pokazuje stałą demonstracyjną postać Instruktora i jej przygotowane rekordy.
- Najbliższa lekcja otwiera szczegóły tylko do odczytu, plan prowadzi do US-017.
- „Zgłoś nieobecność” otwiera US-020; wiadomość otwiera podgląd powiadomienia.
- Pogoda jest przykładowa i nie steruje harmonogramem.

#### US-017 — Mój harmonogram

Jako instruktor chcę przeglądać własne zaplanowane zajęcia, aby zobaczyć plan pracy.

**UI:** kalendarz tygodniowy, karty lekcji, dane kursantów, godziny i statusy.

**Kryteria akceptacji:**
- Widoczne są wyłącznie rekordy przygotowane dla demonstracyjnego Instruktora.
- Nawigacja tygodniowa i powrót do tygodnia demo działają; mobile udostępnia agendę/dzień.
- Karta pokazuje kursanta, IKO, czas i status, a kliknięcie otwiera pełne podsumowanie.
- Szczegóły nie zawierają akcji Managera; link do kursanta otwiera panel US-019.

#### US-018 — Moja dostępność

Jako instruktor chcę zaznaczać dni i godziny swojej dostępności w kalendarzu, aby zaprezentować jej deklarowanie.

**UI:** tydzień, godziny 8:00–18:00, zaznaczone przedziały, legenda, „Zapisz dostępność”.

**Kryteria akceptacji:**
- Siatka ma godzinowe komórki 08:00–09:00 aż do 17:00–18:00 dla każdego dnia tygodnia.
- Kliknięcie lub Spacja/Enter przełącza zaznaczenie komórki; stan jest dostępny dla czytnika ekranu.
- Początkowe zaznaczenia pochodzą z fixture’a; nowe wybory istnieją tylko w stanie bieżącego ekranu.
- Zapis pokazuje komunikat demo; nie zmienia profilu instruktora, propozycji zastępstw ani lekcji.
- Ponowne wejście odtwarza początkową dostępność.

#### US-019 — Moi kursanci

Jako instruktor chcę przeglądać dane kursantów przypisanych do moich zajęć, aby zobaczyć ich poziom i historię.

**UI:** lista przypisanych kursantów, IKO, waga; panel historii wspólnych zajęć i nadchodzących lekcji.

**Kryteria akceptacji:**
- Lista wykorzystuje przygotowane identyfikatory przypisanych kursantów.
- Wybór osoby pokazuje jej wagę, IKO, historię wspólnych i nadchodzących zajęć.
- Szczegóły lekcji są tylko do odczytu; brak edycji profilu kursanta.
- Puste sekcje mają komunikat; ograniczenie listy jest prezentacją fixture’ów, bez autoryzacji.

#### US-020 — Zgłoszenie nieobecności

Jako instruktor chcę zobaczyć formularz zgłoszenia nieobecności, aby zaprezentować przekazanie informacji szkole.

**UI:** data, godzina od/do, opcjonalny powód, „Zgłoś nieobecność”, „Anuluj”.

**Kryteria akceptacji:**
- Formularz dostępny z dashboardu oraz przycisku pomocniczego w Moim harmonogramie.
- Data i obie godziny są wymagane; koniec musi być późniejszy niż początek. Powód jest opcjonalny.
- Zatwierdzenie realizuje kontrakt demo; nie generuje problemów ani powiadomień.
- Po przełączeniu na Managera widoczny jest wcześniej przygotowany scenariusz nieobecności, niezależny od formularza.

### EPIC UI-10 — Panel kursanta

#### US-021 — Dashboard kursanta

Jako kursant chcę zobaczyć informacje o moich szkoleniach, aby poznać najbliższy termin i postęp.

**UI:** powitanie, aktualny IKO, najbliższa lekcja, imię instruktora, prognoza, liczba odbytych lekcji, „Zapisz się na lekcję”.

**Kryteria akceptacji:**
- Dashboard wykorzystuje stałą demonstracyjną postać Kursanta.
- Pokazuje wszystkie wymagane informacje; licznik i IKO są przygotowane w danych.
- „Zapisz się na lekcję” otwiera US-022; najbliższa lekcja prowadzi do jej podsumowania w US-023.
- Pogoda ma etykietę przykładu i nie wpływa na dostępne akcje.

#### US-022 — Zgłoszenie udziału w lekcji

Jako kursant chcę zobaczyć formularz zgłoszenia chęci udziału w zajęciach, aby wskazać preferowany termin.

**UI:** preferowana data i godzina, aktualny IKO tylko do odczytu, uwagi, „Wyślij zgłoszenie”.

**Kryteria akceptacji:**
- Formularz dostępny z menu i dashboardu pokazuje IKO demonstracyjnego Kursanta.
- Data i godzina są wymagane; uwagi opcjonalne. Opcje godzin są stałą listą, bez dostępności.
- Obok przycisku widnieje informacja, że formularz prezentuje zgłoszenie preferencji.
- Wysłanie realizuje kontrakt demo; nie tworzy rezerwacji, lekcji ani oczekującego zgłoszenia w panelu Managera.

#### US-023 — Moje zajęcia

Jako kursant chcę przeglądać zaplanowane i odbyte lekcje, aby zobaczyć plan oraz historię szkoleń.

**UI:** zakładki „Nadchodzące” i „Historia”; karty z instruktorem, datą, godziną i statusem.

**Kryteria akceptacji:**
- Zakładki zmieniają lokalny widok i parametr `tab`; skrót „Historia szkoleń” otwiera Historię.
- Widać tylko lekcje demonstracyjnego Kursanta; grupowanie jest zapisane w fixture’ach względem dnia demo.
- Karta otwiera podsumowanie tylko do odczytu; nie ma przycisków zarządzania lekcją.
- Odbyta lekcja oczekująca na potwierdzenie udostępnia „Potwierdź odbycie” otwierające US-024; potwierdzona pokazuje etykietę.

#### US-024 — Potwierdzenie odbycia lekcji

Jako kursant chcę zobaczyć formularz potwierdzenia szkolenia, aby zaprezentować uzupełnianie dokumentacji.

**UI:** podsumowanie lekcji, instruktor, data i godzina, demonstracyjne pole podpisu, „Potwierdź odbycie lekcji”, „Anuluj”.

**Kryteria akceptacji:**
- Formularz otwiera się dla przygotowanej odbytej lekcji oczekującej na potwierdzenie.
- Pole podpisu umożliwia prosty szkic pointerem i „Wyczyść”; równoważną alternatywą jest wpisanie imienia i nazwiska.
- Do prezentacji potwierdzenia wystarcza szkic lub niepuste pole tekstowe; podpis nie jest weryfikowany.
- Zatwierdzenie realizuje kontrakt demo. Nie utrwala podpisu, nie zmienia statusu ani Rejestru szkoleń.
- Jasna etykieta wskazuje demonstracyjny charakter podpisu i brak skutków prawnych.

## 7. Wspólne komponenty

| Komponent | Odpowiedzialność |
|---|---|
| AppLayout, Sidebar, MobileNav, TopBar | Układ i nawigacja z sekcji 4 |
| RoleSwitcher, DemoBadge | Widoczny kontekst demonstracji |
| PageHeader, Breadcrumbs | Tytuł, powrót, akcja główna |
| DashboardCard, WeatherWidget, AlertList | Podsumowania z fixture’ów |
| ScheduleCalendar, LessonCard, AvailabilityGrid | Prezentacja czasu i wybór dostępności |
| DataTable, SearchInput, FilterSelect, EmptyState | Lokalne wyszukiwanie i stany list |
| StudentCard, InstructorCard, Avatar, StatusBadge | Spójna prezentacja osób i statusów |
| Drawer, ConfirmDialog, FormField, Toast | Nakładki, formularze, feedback |
| LessonDetails, LessonForm, StudentForm | Wspólne szczegóły i formularze |
| NotificationList, NotificationPreview | Listy i podglądy wiadomości |
| SignatureDemo | Nietrwały szkic z alternatywą tekstową |

Każdy komponent otrzymuje jawne dane/props. Komponent pogodowy nie zna progów bezpieczeństwa; kalendarz nie przydziela instruktorów; formularz nie zapisuje encji.

## 8. Wymagania dotyczące danych demonstracyjnych

### Stały kontekst

Użyj tygodnia **13–19 lipca 2026**, dnia demo **15 lipca 2026 (środa)** i lokalizacji „KiteSchool · Półwysep Helski”. Daty i godziny prezentuj po polsku, w kontekście Europe/Warsaw. Nie używaj zegara systemowego do klasyfikowania historii ani wyświetlania „dzisiaj”. Pokaż „Dzień demo: 15.07.2026”, aby nie sugerować aktualnych informacji. Tropikalny styl nie oznacza zmiany lokalizacji szkoły na Hawaje.

### Minimalny zestaw fixture’ów

| Dane | Minimum i pokrycie |
|---|---|
| Kursanci | 12 fikcyjnych osób; wszystkie cztery poziomy; osoba bez historii i bez preferowanego instruktora |
| Instruktorzy | 5 osób; różne wagi, doświadczenie i statusy: Dostępny / Na zajęciach / Nieobecny |
| Lekcje | 20 rekordów: co najmniej 8 historycznych sprzed dnia demo, 6 w dniu demo i 6 późniejszych; bloki 2 h w zakresie 08:00–18:00 |
| Status lekcji | Zaplanowana, Do zmiany, Odwołana, Odbyta; każde oznaczenie występuje przynajmniej raz |
| Potwierdzenia | Co najmniej 3 odbyte potwierdzone i 3 odbyte oczekujące; niezależne pole od statusu lekcji |
| Centrum zmian | 3 problemy: nieobecność, słaby wiatr, przykład rozwiązany; powiązane z istniejącymi lekcjami |
| Zastępcy | Dla każdej lekcji dostępnej w szczegółach jawna lista kandydatów; co najmniej jeden przykład z dostępnym i niedostępnym kandydatem |
| Powiadomienia | 8 wiadomości z odbiorcami obu typów, treściami, datami i trzema statusami; co najmniej 2 dla aktywnego Instruktora i 2 dla Kursanta |
| Pogoda | Minimum 3 przygotowane warianty: zwykły dzień, silniejszy wiatr, słaby wiatr; temperatura °C, wiatr km/h, kierunek, opis, czas przykładowej aktualizacji |
| Dostępność | Jawne komórki godzinowe każdego instruktora w tygodniu demo |
| Dashboardy | Jawne KPI, identyfikatory najbliższych lekcji i alertów dla każdej roli |
| Zgłoszenia | Minimum 3 statyczne przykłady oczekujących preferencji, jako podstawa liczby na dashboardzie; bez dodatkowego modułu obsługi |

Aktywny Instruktor i Kursant mają istniejące identyfikatory. Aktywny Kursant ma nadchodzącą lekcję, odbytą potwierdzoną i odbytą oczekującą. Aktywny Instruktor ma lekcje w dniu demo i przypisanych kursantów. Scenariusz nieobecności dotyczy tej samej demonstracyjnej postaci, aby przejście między rolami było zrozumiałe.

### Kontrakt danych (kształt, bez implementowania usług)

- `Student`: id, fullName, avatarPath?, weightKg?, ikoLevel, phone?, email?, preferredInstructorId?, completedLessonCount, lastLessonDate?, historyLessonIds, upcomingLessonIds.
- `Instructor`: id, fullName, avatarPath?, weightKg, experienceYears, availabilityStatus, plannedLessonCount, assignedStudentIds, upcomingLessonIds, availabilitySlots.
- `Lesson`: id, studentId, instructorId, date, startTime, endTime, ikoLevel, status, confirmationStatus, weatherFixtureId, candidateInstructorIds.
- `ChangeIssue`: id, lessonId, reasonType, reasonText, resolutionStatus, candidateInstructorIds.
- `Notification`: id, recipientRole, recipientId, type, sentAtLabel, status, body.
- `WeatherFixture`: id, locationLabel, temperatureC, windKmh, windDirection, description, updatedAtLabel.
- `DashboardFixture`: role, demoPersonaId, demoDate, weatherFixtureId, kpiValues, nearestLessonId, todayLessonIds, alertIds.
- `AvailabilitySlot`: date, startTime, endTime, selected. `EnrollmentFixture`: id, studentId, preferredDate, preferredTime, notes, statusLabel.

IKO: `beginner | iko1 | iko2 | iko3`; status lekcji: `planned | needs-change | cancelled | completed`; potwierdzenie: `not-applicable | pending | confirmed`. Mapuj je na polskie etykiety. Typy i enumy służą prezentacji, nie maszynie stanów.

Wszystkie powiązania muszą wskazywać istniejące rekordy. Ta sama lekcja ma identyczne dane w kalendarzu, profilu i szczegółach. Statyczne liczniki mają odpowiadać bazowym fixture’om; sprawdź je podczas przygotowania danych, nie buduj silnika ich aktualizacji. Dane kontaktowe są fikcyjne, np. domena `example.com`; nie używaj rzeczywistych danych klientów. Szkic podpisu nigdy nie trafia do fixture’ów.

## 9. Scenariusze demonstracyjne do odbioru

1. **Planowanie:** Manager → Harmonogram → Dodaj lekcję → wybór osoby, instruktora, terminu → Zapisz → komunikat demo → kalendarz nadal pokazuje dane bazowe.
2. **Nieobecność:** Instruktor → Zgłoś nieobecność → uzupełnij formularz → komunikat → przełącz na Managera → Centrum zmian → przygotowana nieobecność → wybór zastępcy → komunikat demo. Problem był w danych od początku; nie powstał wskutek formularza.
3. **Pogoda:** Manager → alert słabego wiatru → Centrum zmian → szczegóły wskazanej lekcji → Odwołaj → dialog → komunikat demo. Nie porównuj prędkości z progiem i nie zmieniaj innych lekcji.
4. **Potwierdzenie:** Kursant → Historia szkoleń → lekcja oczekująca → podpis szkicem lub tekstem → Potwierdź → komunikat demo. Status i rejestr Managera pozostają bazowe.
5. **Dane osób:** Manager → wyszukaj kursanta → profil → edycja → Anuluj → lista → Instruktorzy → profil → kalendarz i kursanci.
6. **Responsywność i reset:** przejdź scenariusz na 375 px, obsłuż menu i panel klawiaturą; odśwież aplikację i sprawdź powrót do początkowych fixture’ów.

## 10. Definicja ukończenia

- [ ] Wszystkie US-001–US-024 mają działające punkty wejścia, wymagane informacje i spełnione kryteria.
- [ ] Każda trasa i nakładka z inwentarza jest dostępna; nieznane trasy i identyfikatory mają czytelny stan.
- [ ] Nie ma martwych przycisków, pustych placeholderów, lorem ipsum ani surowych identyfikatorów jako etykiet.
- [ ] Role, menu, breadcrumbs i historia przeglądarki zachowują się zgodnie ze specyfikacją.
- [ ] Wszystkie formularze obsługują błędy UI, anulowanie i demonstracyjne zatwierdzenie; brak skutków biznesowych.
- [ ] Widoki 375/768/1440 px są czytelne; focus, klawiatura, etykiety i kontrasty zostały sprawdzone.
- [ ] Scenariusze z sekcji 9 przeszły ręczny przegląd; zapisano wynik w README.
- [ ] Build kończy się poprawnie; brak błędów wykonania i brak żądań do zewnętrznych API podczas korzystania.
- [ ] Brak backendu, warstwy usług, trwałego storage, integracji i algorytmów domenowych potwierdzono przeglądem kodu.
- [ ] Odświeżenie usuwa wpisane dane i szkic podpisu; wszystkie fixture’y pozostają identyczne.
- [ ] Repozytorium zawiera lokalne zasoby i README z instrukcją uruchomienia oraz ograniczeniami demonstracji.

## 11. Zalecana kolejność realizacji dla Codexa

1. Tokeny, lokalne zasoby, fixture’y, router, layout, przełącznik ról i wspólne komponenty.
2. Dashboard Managera, harmonogram, szczegóły i formularz lekcji.
3. Kursanci, instruktorzy, Centrum zmian, powiadomienia i rejestr.
4. Ekrany Instruktora, dostępność i nieobecność.
5. Ekrany Kursanta, zgłoszenie i podpis demonstracyjny.
6. Responsywność, dostępność, przegląd spójności danych i odbiór wszystkich scenariuszy.

**Instrukcja nadrzędna dla implementacji:** realizuj specyfikację jako klikalny frontend na stałych danych. Jeśli element sugeruje rzeczywistą operację szkoły, pokaż formularz, lokalną interakcję i jednoznaczny komunikat demonstracyjny. Nie dopisuj backendu ani reguł biznesowych w celu „ożywienia” prototypu.
