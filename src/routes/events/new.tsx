import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EventForm } from "../../components/event.form";
import { useEvents } from "../../hooks/useEvents";
import type { Event, EventFormValues } from "../../types/event";

export const Route = createFileRoute("/events/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const { createEvent } = useEvents();
  const navigate = useNavigate();

  function handleCreate(values: EventFormValues) {
    const newEvent: Event = {
      ...values,
      id: crypto.randomUUID(),
      attendees: [],
      createdAt: new Date().toISOString().split("T")[0],
    };

    createEvent(newEvent);
    navigate({ to: "/events" });
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      <EventForm onSubmit={handleCreate} submitLabel="Create Event" />
    </div>
  );
}
