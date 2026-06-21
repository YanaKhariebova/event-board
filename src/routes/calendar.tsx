import { createFileRoute, Link } from "@tanstack/react-router";
import { useEvents } from "../hooks/useEvents";
import { formatDate } from "../utils/format";

export const Route = createFileRoute("/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  const { events } = useEvents();
  // Holt alle Events aus dem zentralen Speicher (useEvents)

  // Nur veröffentlichte Events anzeigen
  const publishedEvents = events.filter(
    (event) => event.status === "published",
  );
  // Filtert die Liste — behält nur Events mit Status "published"
  // (русский: оставляет только опубликованные события)

  // Heutiges Datum im Format "YYYY-MM-DD", zum Vergleich mit event.date
  const today = new Date().toISOString().slice(0, 10);
  // Erzeugt das heutige Datum als String, z.B. "2026-06-21"
  // (русский: сегодняшняя дата в виде строки для сравнения)

  // Gruppiert Events nach Datum: { "2026-06-24": [event1, event2], ... }
  const groupedByDate: Record<string, typeof events> = {};
  // Erstellt ein leeres Objekt, das später Datum -> Liste von Events speichert

  for (const event of publishedEvents) {
    // Geht jedes veröffentlichte Event einzeln durch

    if (!groupedByDate[event.date]) {
      groupedByDate[event.date] = [];
    }
    // Falls für dieses Datum noch keine Liste existiert, erstellt eine leere Liste

    groupedByDate[event.date].push(event);
    // Fügt das aktuelle Event in die Liste seines Datums ein
  }

  // Holt alle Datums-Schlüssel und sortiert sie aufsteigend
  const sortedDates = Object.keys(groupedByDate).sort();
  // Nimmt alle Datums-Strings (Schlüssel des Objekts) und sortiert sie chronologisch

  // Empty State: keine veröffentlichten Events vorhanden
  if (publishedEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 gap-3">
        <p className="text-lg">No events found.</p>
        <Link to="/events/new" className="btn btn-primary btn-sm">
          Create your first event
        </Link>
      </div>
    );
  }
  // Wenn es keine veröffentlichten Events gibt, zeigt eine Nachricht statt einer leeren Seite
  // (если опубликованных событий нет, показываем сообщение, а не пустую страницу)

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Calendar</h1>
      {/* Hauptüberschrift der Seite */}

      {sortedDates.map((date) => {
        // Geht jedes Datum einzeln durch und erstellt dafür eine Karte

        const isPastDate = date < today;
        // Prüft, ob dieses Datum in der Vergangenheit liegt
        // (если дата находится в прошлом)

        return (
          <div key={date} className="card bg-base-100 shadow-xl">
            {/* Eine Karte pro Datum */}
            <div className="card-body">
              <h2 className="card-title text-lg flex items-center gap-2">
                {formatDate(date)}
                {/* Zeigt das Datum im Format 24.06.2026 */}

                {isPastDate && (
                  <span className="badge badge-ghost badge-sm">Past</span>
                )}
                {/* Zeigt "Past"-Abzeichen nur, wenn das Datum vorbei ist */}
              </h2>

              <ul className="space-y-2 mt-2">
                {groupedByDate[date]
                  .sort((a, b) => a.time.localeCompare(b.time))
                  // Sortiert die Events dieses Datums nach Uhrzeit

                  .map((event) => (
                    <li key={event.id}>
                      <Link
                        to="/events/$eventId"
                        params={{ eventId: event.id }}
                        className={`flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition ${
                          isPastDate ? "opacity-50" : ""
                        }`}
                      >
                        {/* Klick führt zur Detailseite des Events */}
                        {/* opacity-50, wenn das Datum in der Vergangenheit liegt */}

                        <span className="badge badge-primary">
                          {event.time}
                        </span>
                        {/* Uhrzeit als farbiges Abzeichen */}

                        <span className="text-sm font-medium">
                          {event.title}
                        </span>
                        {/* Titel des Events */}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
