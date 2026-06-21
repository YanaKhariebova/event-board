import { createFileRoute, Link } from "@tanstack/react-router";
import { useEvents } from "../hooks/useEvents";
import { formatDate } from "../utils/format";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  // 1. Anzahl aller Events
  const { events } = useEvents();

  // 2. Anzahl veröffentlichter Events
  const publishedCount = events.filter(
    (event) => event.status === "published",
  ).length;

  // 3. Anzahl geplanter Entwürfe
  const draftCount = events.filter((event) => event.status === "draft").length;

  // 4. Anzahl abgesagter Events
  const cancelledCount = events.filter(
    (event) => event.status === "cancelled",
  ).length;

  // 5. Anzahl abgeschlossener Events
  const completedCount = events.filter(
    (event) => event.status === "completed",
  ).length;

  // 6. Gesamte Teilnehmerzahl
  const totalAttendees = events.reduce(
    (sum, event) => sum + event.attendees.length,
    0,
  );

  // 7. Nächstes Event
  const today = new Date().toISOString().split("T")[0];

  const upcomingEvents = events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const nextEvent = upcomingEvents[0];

  // 8. Durchschnittliche Auslastung
  const averageUtilization =
    events.length === 0
      ? 0
      : events.reduce(
          (sum, event) => sum + event.attendees.length / event.maxAttendees,
          0,
        ) / events.length;

  const averageUtilizationPercent = Math.round(averageUtilization * 100);

  // Zusätzlich: die nächsten 3 Events
  const next3Events = upcomingEvents.slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold flex justify-center">Dashboard</h1>

      {/* STATISTIK-KARTEN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Anzahl aller Events */}
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Events</div>
          <div className="stat-value">{events.length}</div>
        </div>

        {/* 2. Anzahl veröffentlichter Events */}
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Published</div>
          <div className="stat-value text-success">{publishedCount}</div>
        </div>

        {/* 3. Anzahl geplanter Entwürfe */}
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Drafts</div>
          <div className="stat-value text-warning">{draftCount}</div>
        </div>

        {/* 4. Anzahl abgesagter Events */}
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Cancelled</div>
          <div className="stat-value text-error">{cancelledCount}</div>
        </div>

        {/* 5. Anzahl abgeschlossener Events */}
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Completed</div>
          <div className="stat-value">{completedCount}</div>
        </div>

        {/* 6. Gesamte Teilnehmerzahl */}
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Attendees</div>
          <div className="stat-value">{totalAttendees}</div>
        </div>

        {/* 7. Nächstes Event */}
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Next Event</div>
          <div className="stat-value text-lg">
            {nextEvent ? nextEvent.title : "—"}
          </div>
          {nextEvent && (
            <div className="stat-desc">{formatDate(nextEvent.date)}</div>
          )}
        </div>

        {/* 8. Durchschnittliche Auslastung */}
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Average Utilization</div>
          <div className="stat-value">{averageUtilizationPercent}%</div>
        </div>
      </div>

      {/* Zusätzlich: die nächsten 3 Events */}
      <div>
        <h2 className="text-xl font-bold mb-3">Upcoming Events</h2>

        {next3Events.length === 0 ? (
          <p className="opacity-70">No upcoming events.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none">
            {next3Events.map((event) => (
              <li key={event.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-base">{event.title}</h3>
                  <p className="text-sm opacity-70">
                    {formatDate(event.date)} • {event.time}
                  </p>
                  <p className="text-sm">📍 {event.location}</p>
                  <div className="card-actions justify-end mt-2">
                    <Link
                      to="/events/$eventId"
                      params={{ eventId: event.id }}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
