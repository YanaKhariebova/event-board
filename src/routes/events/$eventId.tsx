import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEvents } from "../../hooks/useEvents";
import { OccupancyBar } from "../../components/occupancy.bar";
import { formatDate } from "../../utils/format";

export const Route = createFileRoute("/events/$eventId")({
  component: EventDetailPage,
});

function EventDetailPage() {
  // eventId kommt aus der URL, z.B. /events/react-workshop
  const { eventId } = Route.useParams();
  const { getEventById, deleteEvent, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = getEventById(eventId);

  // State für das "Attendee hinzufügen"-Formular
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Ungültige ID -> Event existiert nicht -> Fehlermeldung statt Crash
  if (!event) {
    return (
      <div className="space-y-4 flex flex-col justify-center items-center pt-10">
        <p className="text-lg">Event not found.</p>
        <Link to="/events" className="btn btn-primary btn-sm">
          Back to events
        </Link>
      </div>
    );
  }

  // Ab hier weiß TypeScript sicher: event ist kein undefined mehr.
  // currentEvent benutzen wir in allen verschachtelten Funktionen,
  // damit TypeScript den Typ nicht wieder als "Event | undefined" sieht.
  const currentEvent = event;

  // Löscht das Event nach Bestätigung, dann zurück zur Übersicht
  function handleDelete() {
    const shouldDelete = window.confirm(
      "Do you really want to delete this event?",
    );

    if (shouldDelete) {
      deleteEvent(eventId);
      navigate({ to: "/events" });
    }
  }

  // Fügt einen neuen Attendee hinzu, nach Validierung
  function handleAddAttendee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // verhindert Page-Reload beim Submit

    // --- Validierung ---
    if (!name.trim()) {
      setError("Name darf nicht leer sein");
      return;
    }
    if (!email.trim()) {
      setError("E-Mail darf nicht leer sein");
      return;
    }
    if (!email.includes("@")) {
      setError("E-Mail muss ein @ enthalten");
      return;
    }
    if (currentEvent.attendees.length >= currentEvent.maxAttendees) {
      setError("This event is already fully booked.");
      return;
    }

    // --- Neuen Attendee bauen ---
    const newAttendee = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
    };

    // Event mit dem neuen Attendee aktualisieren (bestehendes Event + neue Liste)
    updateEvent({
      ...currentEvent,
      attendees: [...currentEvent.attendees, newAttendee],
    });

    // Formular zurücksetzen
    setName("");
    setEmail("");
    setError("");
  }

  // Entfernt einen Attendee anhand seiner ID
  function handleRemoveAttendee(attendeeId: string) {
    updateEvent({
      ...currentEvent,
      attendees: currentEvent.attendees.filter((a) => a.id !== attendeeId),
    });
  }

  return (
    <div className="space-y-4 max-w-2xl flex flex-col justify-center items-center mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl">{currentEvent.title}</h1>

          <p className="opacity-80">{currentEvent.description}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            <div className="badge badge-outline">{currentEvent.category}</div>
            <div className="badge badge-primary">{currentEvent.status}</div>
          </div>

          <div className="mt-4 space-y-1 text-sm">
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {formatDate(currentEvent.date)}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {currentEvent.time}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {currentEvent.location}
            </p>
            <p>
              <span className="font-semibold">Max attendees:</span>{" "}
              {currentEvent.maxAttendees}
            </p>
            <OccupancyBar
              attendees={currentEvent.attendees.length}
              maxAttendees={currentEvent.maxAttendees}
            />
          </div>

          <div className="mt-4">
            <h2 className="font-semibold mb-2">Attendees</h2>

            {/* Empty State: keine Teilnehmer vorhanden */}
            {currentEvent.attendees.length === 0 ? (
              <p className="opacity-70 text-sm">No attendees yet.</p>
            ) : (
              <ul className="space-y-1">
                {currentEvent.attendees.map((attendee) => (
                  <li
                    key={attendee.id}
                    className="text-sm flex justify-between items-center gap-2"
                  >
                    <span>
                      {attendee.name} - {attendee.email}
                    </span>
                    {/* Jeder Attendee kann einzeln entfernt werden */}
                    <button
                      onClick={() => handleRemoveAttendee(attendee.id)}
                      className="btn btn-ghost btn-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Entweder "Event ist voll"-Hinweis ODER das Formular zeigen */}
            {currentEvent.attendees.length >= currentEvent.maxAttendees ? (
              <p className="text-warning text-sm mt-2">
                This event is already fully booked.
              </p>
            ) : (
              <form onSubmit={handleAddAttendee} className="mt-4 space-y-2">
                <h3 className="font-semibold text-sm">Add Attendee</h3>

                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered input-sm w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered input-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Fehlermeldung nur anzeigen, wenn vorhanden */}
                {error && <p className="text-error text-sm">{error}</p>}

                <button type="submit" className="btn btn-primary btn-sm">
                  Add Attendee
                </button>
              </form>
            )}

            <div className="card-actions justify-end mt-3">
              <Link to="/events" className="btn btn-primary btn-sm">
                Back to events
              </Link>
              <Link
                to="/events/$eventId/edit"
                params={{ eventId: currentEvent.id }}
                className="btn btn-secondary btn-sm"
              >
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-error btn-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
