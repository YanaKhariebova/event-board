import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export function NavBar() {
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

        {/* AUTH */}
        <div className="ml-4 flex items-center gap-2">
          <SignedOut>
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>

            <Link to="/register" className="btn btn-sm btn-outline">
              Register
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
