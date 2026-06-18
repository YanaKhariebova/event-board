import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "../../components/event.card";
import { initialEvents } from "../../data/initialEvents";

export const Route = createFileRoute("/events/")({
  component: EventsPage,
});

function EventsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Events</h1>

      {initialEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
