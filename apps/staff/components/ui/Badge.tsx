import { cn } from "./cn";

type Props = {
  tone?: "neutral" | "ok" | "warn" | "danger" | "info";
  children: React.ReactNode;
  className?: string;
};

export function Badge({ tone = "neutral", children, className }: Props) {
  const tones =
    tone === "ok"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : tone === "danger"
        ? "bg-rose-50 text-rose-700 border-rose-200"
        : tone === "warn"
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : tone === "info"
            ? "bg-blue-50 text-blue-700 border-blue-200"
            : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tones,
        className
      )}
    >
      {children}
    </span>
  );
}
