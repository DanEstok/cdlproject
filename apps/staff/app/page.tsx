import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ensureProvisioned } from "../lib/api";

export default async function Page() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Staff Console</h1>

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <ProvisionBlock />
      </SignedIn>
    </div>
  );
}

async function ProvisionBlock() {
  await ensureProvisioned();

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <UserButton />
      <a href="/cases">Cases</a>
      <a href="/tasks">My Tasks</a>
    </div>
  );
}
