import { Link } from "@tanstack/react-router";
import type { Event } from "../types/event";
import { formatDate } from "../utils/format";

// Props der Komponente: sagt TypeScript, dass von außen ein Objekt event vom Typ Event kommt
export function EventCard({ event }: { event: Event }) {
  return (
    <div className="card bg-base-200 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>

        <p className="text-sm opacity-70">
          {formatDate(event.date)} • {event.time}
        </p>

        <p className="text-sm">📍 {event.location}</p>

        <p>{event.description}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          <div className="badge badge-outline">{event.category}</div>

          <div className="badge badge-primary">{event.status}</div>
        </div>

        <p className="mt-2 text-sm">
          👥 {event.attendees.length} / {event.maxAttendees}
        </p>

        <div className="card-actions justify-end mt-3">
          <Link
            to="/events/$eventId"
            params={{ eventId: event.id }}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
