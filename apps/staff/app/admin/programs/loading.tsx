export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-56 bg-slate-200 rounded-xl animate-pulse" />
      <div className="h-32 bg-white border border-slate-200 rounded-2xl animate-pulse" />
      <div className="h-64 bg-white border border-slate-200 rounded-2xl animate-pulse" />
    </div>
  );
}
