import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

export default function Dashboard() {
  return (
    <>
      <SignedIn>
        <h1>Dashboard 🔐</h1>
        <p>Only logged-in users can see this</p>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
