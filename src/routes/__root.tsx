import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavBar } from "../components/nav.bar";
import { Footer } from "../components/footer";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col tracking-wider">
      {/* HEADER */}
      <NavBar />

      {/* MAIN */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
