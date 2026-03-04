import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ensureProvisioned } from "../lib/api";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default async function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="text-center py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Staff Console</h1>
            <p className="text-slate-600 mb-8">Recovery Platform Management System</p>
            
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full">Sign In</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <ProvisionBlock />
            </SignedIn>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function ProvisionBlock() {
  await ensureProvisioned();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <UserButton />
      </div>
      <div className="flex flex-col space-y-3">
        <Button variant="secondary" asChild>
          <a href="/cases">Cases</a>
        </Button>
        <Button variant="secondary" asChild>
          <a href="/tasks">My Tasks</a>
        </Button>
        <Button variant="secondary" asChild>
          <a href="/admin/programs">Admin Programs</a>
        </Button>
      </div>
    </div>
  );
}
