import { AppSidebar } from "./app/AppSidebar";
import { AppTopbar } from "./app/AppTopbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
        <AppSidebar />
        <div className="min-w-0">
          <AppTopbar />
          <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
