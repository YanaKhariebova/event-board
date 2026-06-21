import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h1 className="card-title text-4xl flex justify-center items-center">
            About EventBoard
          </h1>

          <p className="text-lg">
            EventBoard ist eine kleine Event-Management-App, mit der man Events,
            Workshops und Meetups erstellen, bearbeiten, anzeigen und verwalten
            kann.
          </p>

          <div>
            <h2 className="font-semibold mb-1 text-lg">Technologien</h2>
            <ul className="list-disc list-inside space-y-1 text-lg">
              <li>React + Vite</li>
              <li>TanStack Router (Filebased Routing)</li>
              <li>TypeScript</li>
              <li>Tailwind CSS + daisyUI</li>
              <li>localStorage</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-1 text-lg">Features</h2>
            <ul className="list-disc list-inside text-lg space-y-1">
              <li>Events erstellen, bearbeiten, löschen</li>
              <li>Suche, Filter und Sortierung</li>
              <li>Teilnehmerverwaltung mit Validierung</li>
              <li>Kalenderübersicht nach Datum gruppiert</li>
              <li>Dashboard mit Statistiken</li>
              <li>Hell-/Dunkelmodus (Theme Toggle)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
