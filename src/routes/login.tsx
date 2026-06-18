import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/clerk-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex justify-center mt-10">
      <SignIn path="/login" routing="path" />
    </div>
  );
}
