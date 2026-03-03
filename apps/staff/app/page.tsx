import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Staff Console</h1>

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <UserButton />
          <a href="/cases">Go to Cases</a>
        </div>
      </SignedIn>
    </div>
  );
}
