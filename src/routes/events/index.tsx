import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { EventCard } from "../../components/event.card";
import { useEvents } from "../../hooks/useEvents";

export const Route = createFileRoute("/events/")({
  component: EventsPage,
});

function EventsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");
  const { events } = useEvents();

  // 1. Suche nach Titel (ohne Berücksichtigung der Groß-/Kleinschreibung)
  let filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()),
  );

  // 2. Filter nach Status
  if (statusFilter !== "all") {
    filteredEvents = filteredEvents.filter(
      (event) => event.status === statusFilter,
    );
  }

  // 3. Filter nach Kategorie
  if (categoryFilter !== "all") {
    filteredEvents = filteredEvents.filter(
      (event) => event.category === categoryFilter,
    );
  }

  // 4. Sortierung
  filteredEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date-asc") {
      return a.date.localeCompare(b.date);
    }
    if (sortBy === "date-desc") {
      return b.date.localeCompare(a.date);
    }
    if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Prüft, ob die App überhaupt keine Events hat
  const hasNoEventsAtAll = events.length === 0;
  // Prüft, ob es Events gibt, aber die aktuellen Filter/Suche keine Treffer liefern
  const hasNoMatches = !hasNoEventsAtAll && filteredEvents.length === 0;

  return (
    <div className="space-y-4">
      {/* Titel und Create-Button */}
      <div className="grid grid-cols-3 items-center">
        <div></div>
        <h1 className="text-4xl font-bold text-center">Events</h1>
        <div className="flex justify-end">
          <Link to="/events/new" className="btn btn-primary">
            + New Event
          </Link>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 items-center bg-base-200 p-4 rounded-lg justify-center">
        {/* Suche */}
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-sm w-full max-w-xs"
        />

        {/* Filter nach Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="all">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>

        {/* Filter nach Kategorie */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="all">All Categories</option>
          <option value="workshop">Workshop</option>
          <option value="talk">Talk</option>
          <option value="networking">Networking</option>
          <option value="review">Review</option>
          <option value="other">Other</option>
        </select>

        {/* Sortierung */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="date-asc">Date ascending</option>
          <option value="date-desc">Date descending</option>
          <option value="title-asc">Title A-Z</option>
        </select>
      </div>

      {/* RESULTS */}
      {hasNoEventsAtAll && (
        <div className="text-center py-8">
          <p className="opacity-70">No events found.</p>
          <p className="opacity-70 mb-3">Create your first event.</p>
          <Link to="/events/new" className="btn btn-primary btn-sm">
            + New Event
          </Link>
        </div>
      )}

      {hasNoMatches && (
        <div className="text-center py-8">
          <p className="opacity-70">No events match your filters.</p>
          <p className="opacity-70">
            Try changing your search or filter settings.
          </p>
        </div>
      )}

      {!hasNoEventsAtAll && !hasNoMatches && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 p-14">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
