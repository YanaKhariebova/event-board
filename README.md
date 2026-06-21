# 📅 EventBoard

Eine kleine Event-Management-App, mit der man Events, Workshops und Meetups erstellen, anzeigen, bearbeiten, filtern und verwalten kann.

## 📝 Beschreibung

EventBoard ist eine React-App zur Verwaltung von Events. Man kann Events erstellen, bearbeiten und löschen, Teilnehmer hinzufügen oder entfernen, Events suchen, filtern und sortieren, und alles in einer Kalenderübersicht nach Datum gruppiert anzeigen. Alle Daten werden zentral verwaltet und automatisch im Browser (localStorage) gespeichert, sodass sie nach einem Reload erhalten bleiben.

## 🛠️ Verwendete Technologien

- ⚛️ React
- ⚡ Vite
- 🔷 TypeScript
- 🧭 TanStack Router (Filebased Routing)
- 🎨 Tailwind CSS + daisyUI
- 💾 localStorage

## 📦 Installationsanleitung

1. Repository klonen:
   ```bash
   git clone https://github.com/YanaKhariebova/event-board.git
   cd event-board
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

## 🚀 Startbefehl

```bash
npm run dev
```

Die App ist danach unter `http://localhost:5173` erreichbar.

### Weitere Befehle

```bash
npm run build     # 🏗️ Produktions-Build erstellen
npm run lint      # 🔍 Code mit ESLint prüfen
npm run preview   # 👀 Produktions-Build lokal anschauen
```

## ✨ Features

- ✅ Events erstellen, bearbeiten und löschen (CRUD)
- 🔁 Wiederverwendbares Formular (`EventForm`) für Erstellen und Bearbeiten
- 💾 Zentrale Datenverwaltung mit automatischer Speicherung in localStorage
- 🔎 Suche nach Titel, Filter nach Status und Kategorie, Sortierung nach Datum oder Titel
- 📊 Dashboard mit Statistiken (Gesamtanzahl, Status-Verteilung, Teilnehmerzahl, nächstes Event, durchschnittliche Auslastung)
- 👥 Teilnehmerverwaltung mit Validierung (Name, E-Mail) und Schutz vor Überbuchung
- 📈 `OccupancyBar`-Komponente zur Anzeige der Event-Auslastung
- 🗓️ Kalenderansicht mit Events gruppiert nach Datum, nur veröffentlichte Events, Markierung vergangener Termine
- 🧭 Saubere UI-Zustände (keine Events, keine Suchtreffer, Event nicht gefunden, Event ausgebucht)
- 🌗 Hell-/Dunkelmodus (Theme Toggle) mit Speicherung der Auswahl

---

🎓 Lernprojekt im Rahmen des DCI-Kurses
