# React-Projekt: EventBoard

In diesem Projekt baust du eine kleine Event-Management-App mit React und TanStack Filebased Router.

Die App heißt **EventBoard**. Du kannst damit Events verwalten, anzeigen, filtern, erstellen, bearbeiten und löschen. Zusätzlich kannst du Teilnehmer zu Events hinzufügen und eine einfache Kalenderübersicht anzeigen.

Das Projekt läuft über **3 Tage**.

---

# Ziel des Projekts

Am Ende sollst du eine vollständige kleine React-App gebaut haben, die typische Funktionen echter Webanwendungen enthält.

Du übst dabei:

- React-Komponenten sauber zu strukturieren
- State sinnvoll zu verwalten
- mit Formularen zu arbeiten
- Daten zu validieren
- dynamische Routen mit TanStack Router zu verwenden
- Listen zu filtern und zu sortieren
- Daten im `localStorage` zu speichern
- einfache UI-Zustände umzusetzen
- Code aufzuräumen und wiederverwendbar zu machen

---

# Projektidee

Du baust eine App zur Verwaltung von Events, Workshops oder Meetups.

Ein Event kann zum Beispiel sein:

```txt
React Basics Workshop
JavaScript Q&A Session
Portfolio Review Day
Career Talk
Node.js Introduction
```

Jedes Event hat:

- Titel
- Beschreibung
- Datum
- Uhrzeit
- Ort
- Kategorie
- Status
- maximale Teilnehmerzahl
- Teilnehmerliste

---

# Technischer Stack

Verwende:

```txt
React
Vite
TanStack Router mit Filebased Routing
localStorage
CSS, CSS Modules oder Tailwind CSS
```

TypeScript darf verwendet werden, ist aber nicht zwingend erforderlich, wenn es nicht vorgegeben wurde.

---

# Seitenstruktur

Deine App soll folgende Seiten haben:

```txt
/
├── Dashboard
/events
├── Event-Übersicht
/events/$eventId
├── Event-Detailseite
/events/new
├── Neues Event erstellen
/events/$eventId/edit
├── Event bearbeiten
/calendar
├── Kalenderübersicht
/about
├── Über die App
```

Mögliche Struktur im `routes`-Ordner:

```txt
src/routes/
├── __root.tsx
├── index.tsx
├── events/
│   ├── index.tsx
│   ├── new.tsx
│   ├── $eventId.tsx
│   └── $eventId.edit.tsx
├── calendar.tsx
└── about.tsx
```

---

# Datenmodell

Ein Event kann ungefähr so aufgebaut sein:

```ts
type EventStatus = "draft" | "published" | "cancelled" | "completed";

type EventCategory = "workshop" | "talk" | "networking" | "review" | "other";

type Attendee = {
  id: string;
  name: string;
  email: string;
};

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  status: EventStatus;
  maxAttendees: number;
  attendees: Attendee[];
  createdAt: string;
};
```

---

# Beispiel-Daten

Du kannst mit folgenden Demo-Daten starten:

```ts
export const initialEvents = [
  {
    id: "react-workshop",
    title: "React Basics Workshop",
    description: "A practical workshop about components, props and state.",
    date: "2026-06-24",
    time: "10:00",
    location: "Room A",
    category: "workshop",
    status: "published",
    maxAttendees: 16,
    attendees: [
      {
        id: "attendee-1",
        name: "Sarah Miller",
        email: "sarah@example.com",
      },
    ],
    createdAt: "2026-06-17",
  },
  {
    id: "portfolio-review",
    title: "Portfolio Review Day",
    description: "Students can receive feedback on their developer portfolios.",
    date: "2026-06-26",
    time: "13:00",
    location: "Online",
    category: "review",
    status: "draft",
    maxAttendees: 10,
    attendees: [],
    createdAt: "2026-06-17",
  },
];
```

---

# Tag 1: Routing, Layout und Datenanzeige

## Ziel für Tag 1

Am Ende von Tag 1 soll deine Grund-App funktionieren.

Du solltest dann:

- zwischen mehreren Seiten navigieren können
- Events anzeigen können
- Event-Detailseiten öffnen können
- nach Events suchen können
- Events filtern und sortieren können
- ein Dashboard mit echten Daten anzeigen

---

## Aufgaben für Tag 1

### 1. Projekt einrichten

Erstelle ein neues React-Projekt mit Vite.

Richte danach TanStack Router mit Filebased Routing ein.

Erstelle mindestens folgende Seiten:

```txt
/
/events
/events/$eventId
/calendar
/about
```

Die Seiten für Create und Edit kommen später dazu.

---

### 2. Layout erstellen

Baue ein Grundlayout für die App.

Deine App soll enthalten:

- Header
- Navigation
- Main-Bereich
- aktive Navigation
- einfache responsive Struktur

Die Navigation soll ungefähr so aussehen:

```txt
Dashboard | Events | Calendar | About
```

---

### 3. Demo-Daten einbauen

Lege eine Datei für deine Demo-Daten an.

Zum Beispiel:

```txt
src/data/initialEvents.ts
```

Dort speicherst du eine Liste von Events.

---

### 4. Event-Übersicht bauen

Auf `/events` sollen alle Events angezeigt werden.

Baue dafür eine Event Card.

Eine Event Card soll mindestens anzeigen:

```txt
Title
Date
Time
Location
Category
Status
Attendees
```

Beispiel:

```txt
React Basics Workshop

Date: 24.06.2026
Time: 10:00
Location: Room A
Category: Workshop
Status: Published
Attendees: 1 / 16

[View Details]
```

Jede Event Card soll zur Detailseite des Events verlinken.

---

### 5. Event-Detailseite bauen

Auf `/events/$eventId` soll ein einzelnes Event angezeigt werden.

Zeige dort:

- Titel
- Beschreibung
- Datum
- Uhrzeit
- Ort
- Kategorie
- Status
- maximale Teilnehmerzahl
- aktuelle Teilnehmerzahl
- Teilnehmerliste
- Zurück-Link zur Event-Übersicht

Wichtig:

Wenn ein Event mit der angegebenen ID nicht existiert, soll eine saubere Fehlermeldung angezeigt werden.

Beispiel:

```txt
Event not found.
Back to events
```

---

### 6. Suche, Filter und Sortierung einbauen

Auf der Event-Übersicht sollst du folgende Funktionen einbauen:

- Suche nach Titel
- Filter nach Status
- Filter nach Kategorie
- Sortierung nach Datum oder Titel

Status-Filter:

```txt
All Statuses
Draft
Published
Cancelled
Completed
```

Kategorie-Filter:

```txt
All Categories
Workshop
Talk
Networking
Review
Other
```

Sortierung:

```txt
Date ascending
Date descending
Title A-Z
```

---

### 7. Dashboard bauen

Auf der Startseite `/` soll ein Dashboard angezeigt werden.

Das Dashboard soll berechnete Werte anzeigen:

- Anzahl aller Events
- Anzahl veröffentlichter Events
- Anzahl geplanter Entwürfe
- Anzahl abgesagter Events
- Anzahl abgeschlossener Events
- gesamte Teilnehmerzahl
- nächstes Event
- durchschnittliche Auslastung

Zusätzlich sollen die nächsten 3 Events angezeigt werden.

---

# Ergebnis nach Tag 1

Am Ende von Tag 1 sollte deine App Folgendes können:

```txt
Navigation funktioniert.
Dashboard zeigt echte Daten.
Event-Übersicht zeigt Events.
Event-Detailseiten funktionieren.
Ungültige Event-IDs werden abgefangen.
Suche funktioniert.
Filter funktionieren.
Sortierung funktioniert.
```

---

# Tag 2: CRUD, Formulare und localStorage

## Ziel für Tag 2

Am Ende von Tag 2 sollst du Events vollständig verwalten können.

Du solltest dann:

- neue Events erstellen können
- bestehende Events bearbeiten können
- Events löschen können
- Formularvalidierung eingebaut haben
- Daten im Browser speichern können

---

## Aufgaben für Tag 2

### 1. State Management vorbereiten

Baue eine zentrale Lösung für deine Events.

Empfohlen ist ein eigener Hook:

```txt
src/hooks/useEvents.ts
```

Der Hook kann zum Beispiel diese Funktionen bereitstellen:

```ts
const {
  events,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  resetEvents,
} = useEvents();
```

Alternativ kannst du auch mit Context arbeiten.

Wichtig ist:

Die Event-Daten sollen nicht überall doppelt verwaltet werden.

---

### 2. localStorage einbauen

Deine Events sollen im Browser gespeichert werden.

Anforderungen:

- Beim ersten Laden werden Demo-Daten verwendet
- danach werden Daten aus `localStorage` geladen
- Änderungen werden automatisch gespeichert
- nach einem Reload bleiben die Events erhalten
- optional: Button zum Zurücksetzen auf Demo-Daten

Verwende zum Beispiel diesen Storage-Key:

```ts
const STORAGE_KEY = "eventboard-events";
```

---

### 3. Event erstellen

Erstelle die Route:

```txt
/events/new
```

Auf dieser Seite soll ein Formular angezeigt werden.

Formularfelder:

- Titel
- Beschreibung
- Datum
- Uhrzeit
- Ort
- Kategorie
- Status
- maximale Teilnehmerzahl

Validierung:

- Titel darf nicht leer sein
- Beschreibung darf nicht leer sein
- Datum darf nicht leer sein
- Uhrzeit darf nicht leer sein
- Ort darf nicht leer sein
- maximale Teilnehmerzahl muss größer als `0` sein

Nach dem Speichern soll das neue Event gespeichert werden.

Danach soll der Nutzer zur Detailseite des neuen Events oder zurück zur Event-Übersicht weitergeleitet werden.

---

### 4. Wiederverwendbare EventForm bauen

Baue eine Komponente:

```txt
EventForm
```

Diese Komponente soll später für zwei Fälle verwendet werden:

```txt
Event erstellen
Event bearbeiten
```

Beispiel für Props:

```ts
type EventFormProps = {
  initialValues?: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
  submitLabel: string;
};
```

Ziel:

Du sollst die gleiche Formularlogik nicht doppelt schreiben.

---

### 5. Event bearbeiten

Erstelle die Route:

```txt
/events/$eventId/edit
```

Auf dieser Seite soll ein bestehendes Event bearbeitet werden können.

Anforderungen:

- Event anhand der ID laden
- Formular mit vorhandenen Daten vorausfüllen
- Änderungen speichern
- nach dem Speichern zurück zur Detailseite navigieren
- ungültige Event-ID sauber abfangen

---

### 6. Event löschen

Auf der Event-Detailseite soll es einen Delete Button geben.

Anforderungen:

- Nutzer muss das Löschen bestätigen
- Event wird gelöscht
- danach wird zur Event-Übersicht weitergeleitet

Du kannst dafür `window.confirm()` verwenden:

```ts
const shouldDelete = window.confirm("Do you really want to delete this event?");
```

---

# Ergebnis nach Tag 2

Am Ende von Tag 2 sollte deine App Folgendes können:

```txt
Events werden zentral verwaltet.
localStorage funktioniert.
Neue Events können erstellt werden.
Bestehende Events können bearbeitet werden.
Events können gelöscht werden.
Formularvalidierung funktioniert.
EventForm wird wiederverwendet.
Nach Reload bleiben Änderungen erhalten.
```

---

# Tag 3: Teilnehmerverwaltung, Kalender, UX und Refactoring

## Ziel für Tag 3

Am Ende von Tag 3 soll deine App vollständig und präsentierbar sein.

Du solltest dann:

- Teilnehmer zu Events hinzufügen können
- Teilnehmer entfernen können
- volle Events abfangen können
- eine Kalenderübersicht anzeigen können
- UI-Zustände sauber behandeln können
- deinen Code aufgeräumt haben
- deine App kurz präsentieren können

---

## Aufgaben für Tag 3

### 1. Teilnehmer hinzufügen

Auf der Event-Detailseite soll ein Formular zum Hinzufügen von Teilnehmern angezeigt werden.

Formularfelder:

- Name
- E-Mail

Validierung:

- Name darf nicht leer sein
- E-Mail darf nicht leer sein
- E-Mail muss ein `@` enthalten
- Teilnehmer dürfen nicht hinzugefügt werden, wenn das Event voll ist

Regel:

```ts
if (event.attendees.length >= event.maxAttendees) {
  // attendee cannot be added
}
```

---

### 2. Teilnehmer entfernen

Zeige auf der Event-Detailseite die Teilnehmerliste an.

Jeder Teilnehmer soll entfernt werden können.

Beispiel:

```txt
Sarah Miller
sarah@example.com
[Remove]
```

Nach dem Entfernen soll die Änderung gespeichert werden.

---

### 3. Auslastung anzeigen

Baue eine Komponente:

```txt
OccupancyBar
```

Diese Komponente zeigt an, wie stark ein Event ausgelastet ist.

Berechnung:

```ts
const occupancy = (attendees.length / maxAttendees) * 100;
```

Anzeige:

```txt
Attendees: 8 / 16
Occupancy: 50%
```

Optional kannst du zusätzlich eine Progress Bar bauen.

---

### 4. Kalenderansicht bauen

Auf `/calendar` sollen Events nach Datum gruppiert angezeigt werden.

Beispiel:

```txt
24.06.2026
- 10:00 React Basics Workshop
- 14:00 JavaScript Q&A Session

26.06.2026
- 13:00 Portfolio Review Day
```

Optional:

- nur veröffentlichte Events anzeigen
- vergangene Events markieren
- Link zur Detailseite einbauen

---

### 5. UI-Zustände verbessern

Deine App soll saubere Zustände anzeigen.

Beispiele:

Wenn keine Events vorhanden sind:

```txt
No events found.
Create your first event.
```

Wenn keine Events zu den Filtern passen:

```txt
No events match your filters.
Try changing your search or filter settings.
```

Wenn ein Event voll ist:

```txt
This event is already fully booked.
```

Wenn eine Event-ID nicht existiert:

```txt
Event not found.
```

---

### 6. Code refactoren

Räume deinen Code auf.

Achte besonders auf:

- keine riesigen Komponenten
- wiederverwendbare Komponenten
- klare Props
- keine doppelte Logik
- Helper-Funktionen auslagern
- Typen sauber definieren
- Dateinamen konsistent halten
- ungenutzte Imports entfernen
- unnötige `console.log()` entfernen

---

### 7. Präsentation vorbereiten

Bereite eine kurze Präsentation deiner App vor.

Dauer:

```txt
3–5 Minuten
```

Erkläre dabei:

- Was macht deine App?
- Welche Seiten gibt es?
- Welche Features hast du umgesetzt?
- Was war technisch schwierig?
- Was würdest du als Nächstes verbessern?

---

# Ergebnis nach Tag 3

Am Ende von Tag 3 sollte deine App Folgendes können:

```txt
Teilnehmer können hinzugefügt werden.
Teilnehmer können entfernt werden.
Volle Events verhindern weitere Teilnehmer.
Auslastung wird angezeigt.
Kalenderseite gruppiert Events nach Datum.
Empty States sind vorhanden.
Not-Found-Fälle sind abgefangen.
Code ist aufgeräumt.
App kann präsentiert werden.
```

---

# Bonus-Aufgaben

Wenn du schneller fertig bist, kannst du zusätzliche Features einbauen.

## 1. Toast Notifications

Zeige kurze Erfolgsmeldungen nach Aktionen:

```txt
Event created successfully.
Event updated successfully.
Event deleted.
Attendee added.
```

---

## 2. Theme Toggle

Baue einen Hell-/Dunkelmodus.

Speichere die Auswahl im `localStorage`.

---

## 3. URL-basierte Filter

Speichere Filter in der URL.

Beispiel:

```txt
/events?status=published&category=workshop
```

Das passt sehr gut zu TanStack Router Search Params.

---

## 4. Bessere Formularvalidierung

Wenn du möchtest, kannst du eine Library verwenden:

```txt
Zod
React Hook Form
```

Verwende diese Libraries aber nur, wenn du dich damit sicher fühlst.

---

## 5. Export-Funktion

Baue eine Funktion, mit der Events als JSON exportiert werden können.

Beispiel:

```txt
Download events.json
```

---

## 6. Import-Funktion

Baue eine Funktion, mit der Events aus einer JSON-Datei importiert werden können.

---

# Mindestanforderungen

Wenn du nicht alles schaffst, konzentriere dich zuerst auf diese Funktionen:

```txt
Routing funktioniert.
Events werden angezeigt.
Event-Detailseiten funktionieren.
Events können erstellt werden.
Events bleiben nach Reload erhalten.
```

Das ist die Mindestabgabe.

---

# Ziel für starke Abgaben

Eine starke Abgabe enthält zusätzlich:

```txt
EventForm wird wiederverwendet.
Edit funktioniert.
Delete funktioniert.
Teilnehmerverwaltung funktioniert.
Kalender funktioniert.
URL Search Params funktionieren.
Theme Toggle ist eingebaut.
Toast Notifications sind vorhanden.
```

---

# Bewertung

Das Projekt wird mit insgesamt **100 Punkten** bewertet.

| Bereich                      |  Punkte |
| ---------------------------- | ------: |
| Routing mit TanStack Router  |      10 |
| Layout und Navigation        |       6 |
| Event-Liste und Detailseite  |      12 |
| Suche, Filter und Sortierung |       8 |
| Dashboard                    |       6 |
| Create/Edit/Delete           |      22 |
| localStorage                 |      10 |
| Teilnehmerverwaltung         |       8 |
| Kalenderansicht              |       5 |
| UI-Zustände und UX           |       5 |
| Codequalität und Refactoring |       5 |
| Präsentation                 |       3 |
| **Gesamt**                   | **100** |

---

# Abgabe

Gib dein Projekt als GitHub Repository ab.

Achte darauf, dass dein Projekt gestartet werden kann.

Die `README.md` sollte mindestens enthalten:

- Projektname
- kurze Beschreibung
- verwendete Technologien
- Installationsanleitung
- Startbefehl
- kurze Feature-Liste

---

Im ILP arbeitet ihr an eurem Projekt weiter:
Reicht bitte Mittwoch, Donnerstag, Freitag, einfach immer nur den Link zum Repository ein.

Abgabe ist Montag der 22.06.2026
Vorzeigen findet ab Montag um 09:00 Uhr statt.

---
