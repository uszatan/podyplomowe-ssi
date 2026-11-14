# KiteSchool — Prototyp UI Systemu Rezerwacji Kitesurfingu

Projekt responsywnego, klikalnego prototypu interfejsu użytkownika (UI) dla szkoły kitesurfingu **KiteSchool**, stworzony na podstawie pełnej specyfikacji `KiteSchool-frontend-requirements.md`.

Stylistyka: **Hawaiian Surf / Tropical Modern** — oceaniczne błękity (`#00A8A8`), piaskowe tło (`#FAF7F0`), głęboki granat (`#123B5D`) oraz koralowe akcenty ostrzegawcze (`#FF735C`).

---

## 🏄 Główne Podstrony i Ekrany Prototypu

1. **Dashboard Managera Bazy (`/manager/dashboard`)**:
   - Hero banner z tropikalnym motywem, statusem warunków wiatrowych na Zatoce Puckiej oraz datą demo.
   - 4 kafelki KPI: *Dzisiejsze lekcje (6)*, *Dostępni instruktorzy (4/5)*, *Oczekujące zgłoszenia (3)*, *Wymagające uwagi (2)*.
   - Zaawansowany widget pogodowo-wiatrowy (prędkość wiatru w węzłach kts i km/h, kierunek WNW, temperatura wody i powietrza).
   - Oś czasu dzisiejszych zajęć na wodzie z bezpośrednim podglądem lekcji.
   - Centrum zmian i alertów z natychmiastową akcją wyznaczenia zastępstwa.
   - Boczny panel (Drawer) szybkiego planowania lekcji (*US-005*).

2. **Harmonogram i Kalendarz Zajęć (`/manager/schedule`)**:
   - Pełna siatka kalendarza od 08:00 do 18:00 w dwugodzinnych blokach szkoleniowych.
   - Przełącznik widoku: **Widok tygodnia** (stały tydzień 13–19 lipca 2026) oraz **Widok dnia** (środa, 15 lipca 2026).
   - Filtrowanie według instruktorów (Tomasz Wiatr, Marta Falista, Jakub Surfer, Zofia Błękitna, Piotr Bałtycki).
   - Interaktywne karty zajęć z poziomami IKO (Beginner, IKO 1, IKO 2, IKO 3).
   - Kliknięcie lekcji otwiera boczny panel ze szczegółami zajęć (*US-006*): profil kursanta, waga, wyposażenie (rozmiar latawca, deska), przyciski akcji (*Edytuj*, *Zmień instruktora*, *Odwołaj lekcję*).

3. **Baza Kursantów & Paszporty IKO (`/manager/students`)**:
   - Interaktywna tabela z wyszukiwarką na żywo oraz filtrami poziomów IKO.
   - Dane kursantów: waga (kluczowa dla doboru powierzchni latawca), odbyte godziny na wodzie, data ostatnich zajęć.
   - Profil kursanta (*US-008*) w wysuwanym panelu: paszport IKO, historia odbytych lekcji i nadchodzące zajęcia.
   - Formularz dodawania nowego kursanta (*US-009*).

4. **Dedykowany Panel Kursantki (*Aleksandra Wiśniewska — IKO Level 2*)**:
   - Dostępny natychmiast po przełączeniu roli na **Kursant** w górnym pasku.
   - Karta najbliższej lekcji na wodzie ze statusem potwierdzenia.
   - Paszport IKO ze statystykami godzin na wodzie.
   - Zakładki *Nadchodzące lekcje* oraz *Historia szkoleń*.
   - Demonstracyjny moduł podpisu kursanta pod odbytą lekcją (*US-024*).

---

## ⚡ Przełączanie Ról (Role Switcher)

Na górnym pasku nawigacyjnym (TopBar) znajduje się przełącznik ról:
- **Manager** (Jan Kowalski — Kierownik Bazy)
- **Instruktor** (Marta Falista — Instruktor IKO Level 2)
- **Kursant** (Aleksandra Wiśniewska — Kursantka IKO Level 2)

Przełączanie ról natychmiast synchronizuje profil, menu boczne i prezentowane dane.

---

## 🏖️ Stały Kontekst Danych i Ograniczenia Demonstracyjne

- **Stały dzień demonstracyjny:** Środa, 15 lipca 2026 r. (Tydzień demo: 13–19 lipca 2026 r.).
- **Lokalizacja:** Półwysep Helski · Chałupy 3 (Zatoka Pucka).
- **Brak logiki biznesowej i backendu:** Aplikacja jest czystym prototypem UI.
- **Jednolity kontrakt demonstracyjny:** Każda akcja zapisu (*Zapisz lekcję*, *Zapisz kursanta*, *Przypisz zastępcę*, *Potwierdź podpis*, *Odwołaj*) wyświetla powiadomienie Toast:  
  *„To demonstracja — dane nie zostały zapisane”* i bezpiecznie zamyka formularz bez modyfikowania stałych fixture'ów.

---

## 🛠️ Uruchomienie Projektu

Wymagania: Node.js (v18+) i npm.

```bash
# Instalacja zależności
npm install

# Uruchomienie lokalnego serwera deweloperskiego
npm run dev

# Zbudowanie wersji produkcyjnej
npm run build

# Podgląd wersji produkcyjnej
npm run preview
```
