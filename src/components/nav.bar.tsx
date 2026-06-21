import { Link } from "@tanstack/react-router";
import { useTheme } from "../hooks/useTheme";

export function NavBar() {
  const { toggleTheme, theme } = useTheme();

  return (
    <div className="navbar bg-base-200 shadow">
      <div className="flex-1">
        <a className="btn btn-ghost text-4xl">EventBoard</a>
      </div>

      <div className="flex gap-2 items-center">
        <Link
          to="/"
          className="btn btn-ghost btn-sm [&.active]:btn-primary text-3xl p-6"
        >
          Dashboard
        </Link>

        <Link
          to="/events"
          className="btn btn-ghost btn-sm [&.active]:btn-primary text-3xl p-6"
        >
          Events
        </Link>

        <Link
          to="/calendar"
          className="btn btn-ghost btn-sm [&.active]:btn-primary text-3xl p-6"
        >
          Calendar
        </Link>

        <Link
          to="/about"
          className="btn btn-ghost btn-sm [&.active]:btn-primary text-3xl p-6"
        >
          About
        </Link>
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-2xl"
          aria-label="Toggle theme"
        >
          {theme === "forest" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}
