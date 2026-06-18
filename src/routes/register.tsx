import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/clerk-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex justify-center mt-10">
      <SignUp path="/register" routing="path" />
    </div>
  );
}
