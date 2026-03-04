import Link from "next/link";

const nav = [
  { href: "/cases", label: "Cases" },
  { href: "/admin/programs", label: "Programs" }
];

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      {nav.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          {i.label}
        </Link>
      ))}
    </nav>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden md:block border-r border-slate-200 bg-white">
      <div className="px-5 py-5">
        <div className="text-sm text-slate-600">Operations</div>
        <div className="text-lg font-semibold">Case Management</div>
      </div>

      <div className="px-3 pb-6">
        <SidebarNav />
      </div>

      <div className="px-5 py-4 border-t border-slate-200 text-xs text-slate-500">
        Secure | Audited | Compliant
      </div>
    </aside>
  );
}
