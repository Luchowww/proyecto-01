export default function DetailSkeleton() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Calentando motores…</span>
      <div className="grid gap-8 md:grid-cols-[280px_1fr]" aria-hidden="true">
        <div className="mx-auto aspect-[210/295] w-56 animate-pulse rounded-3xl bg-surface-2 md:w-full" />
        <div className="space-y-4">
          <div className="h-3 w-32 animate-pulse rounded bg-surface-2" />
          <div className="h-12 w-3/4 animate-pulse rounded bg-surface-2" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-surface-2" />
          <div className="h-56 animate-pulse rounded-3xl bg-surface-2" />
        </div>
      </div>
    </div>
  )
}
