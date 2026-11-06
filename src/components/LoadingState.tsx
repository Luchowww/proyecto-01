interface LoadingStateProps {
  cards?: number
}

// Skeleton con la forma del grid: reserva el espacio y evita saltos de layout al cargar
export default function LoadingState({ cards = 12 }: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite">
      <p className="mb-6 flex items-center gap-3 text-sm font-medium text-muted">
        <span className="size-2.5 animate-ping rounded-full bg-volt" aria-hidden="true" />
        Calentando motores…
      </p>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" aria-hidden="true">
        {Array.from({ length: cards }, (_, i) => (
          <li key={i} className="overflow-hidden rounded-2xl bg-surface">
            <div className="aspect-[210/295] animate-pulse bg-surface-2" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
