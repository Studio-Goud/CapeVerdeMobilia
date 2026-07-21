export default function Loading(): JSX.Element {
  return (
    <div className="animate-pulse space-y-4" aria-hidden>
      <div className="h-40 rounded-2xl bg-slate-200/70" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-56 rounded-xl bg-slate-200/60" />
        ))}
      </div>
    </div>
  );
}
