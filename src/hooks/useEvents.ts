import { useSyncExternalStore } from "react";
import { initialEvents } from "../data/initialEvents";
import type { Event } from "../types/event";

const STORAGE_KEY = "eventboard-events";
const listeners = new Set<() => void>();

function loadEvents(): Event[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return initialEvents;
}

let eventsStore = loadEvents();

function saveEvents(nextEvents: Event[]) {
  eventsStore = nextEvents;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEvents));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return eventsStore;
}

export function useEvents() {
  const events = useSyncExternalStore(subscribe, getSnapshot);

  function getEventById(id: string) {
    return events.find((event) => event.id === id);
  }

  function createEvent(newEvent: Event) {
    saveEvents([...eventsStore, newEvent]);
  }

  function updateEvent(updatedEvent: Event) {
    saveEvents(
      eventsStore.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  }

  function deleteEvent(id: string) {
    saveEvents(eventsStore.filter((event) => event.id !== id));
  }

  function resetEvents() {
    saveEvents(initialEvents);
  }

  return {
    events,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    resetEvents,
  };
}
