import Link from "next/link";

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/cases" className="md:hidden text-sm font-semibold">
            Ops
          </Link>
          <div className="hidden md:block text-sm text-slate-600">
            Workforce + Recovery Operations
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-9 text-sm text-slate-500">
            Search (coming soon)
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-200" title="User" />
        </div>
      </div>
    </header>
  );
}
