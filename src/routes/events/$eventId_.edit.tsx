import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { EventForm } from "../../components/event.form";
import { useEvents } from "../../hooks/useEvents";
import type { Event, EventFormValues } from "../../types/event";

export const Route = createFileRoute("/events/$eventId_/edit")({
  component: EditEventPage,
});

function EditEventPage() {
  const { eventId } = Route.useParams();
  const { getEventById, updateEvent } = useEvents();
  const navigate = useNavigate();
  const foundEvent = getEventById(eventId);

  if (!foundEvent) {
    return (
      <div className="space-y-4 flex flex-col justify-center items-center pt-10">
        <p className="text-lg">Event not found.</p>
        <Link to="/events" className="btn btn-primary btn-sm">
          Back to events
        </Link>
      </div>
    );
  }

  const currentEvent: Event = foundEvent;

  function handleUpdate(values: EventFormValues) {
    const updatedEvent: Event = {
      id: currentEvent.id,
      attendees: currentEvent.attendees,
      createdAt: currentEvent.createdAt,
      ...values,
    };

    updateEvent(updatedEvent);
    navigate({ to: "/events/$eventId", params: { eventId: currentEvent.id } });
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Event</h1>
      <EventForm
        initialValues={currentEvent}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
      />
    </div>
  );
}
