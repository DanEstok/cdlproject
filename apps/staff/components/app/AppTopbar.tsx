"use client";

import { useState } from "react";
import Link from "next/link";
import { Drawer } from "../ui/Drawer";
import { SidebarNav } from "./AppSidebar";

export function AppTopbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden h-9 w-9 rounded-xl hover:bg-slate-100"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <Link href="/cases" className="text-sm font-semibold md:hidden">
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

      <Drawer open={open} onClose={() => setOpen(false)} title="Case Management">
        <SidebarNav onNavigate={() => setOpen(false)} />
        <div className="mt-4 rounded-2xl border border-slate-200 p-4 text-xs text-slate-600">
          Secure | Audited | Compliant
        </div>
      </Drawer>
    </header>
  );
}
