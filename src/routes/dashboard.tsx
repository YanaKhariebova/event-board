import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

export default function Dashboard() {
  return (
    <>
      <SignedIn>
        <div className="flex flex-col items-center justify-center p-4 text-3xl">
          <h1>Dashboard 🔐</h1>
          <p>Only logged-in users can see this</p>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col items-center justify-center p-4 text-3xl">
          <h1>Welcome to EventBoard</h1>
          <p>Please sign in to view your dashboard.</p>
        </div>
      </SignedOut>
    </>
  );
}
