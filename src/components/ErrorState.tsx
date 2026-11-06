import { RotateCcw, Zap } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center rounded-3xl border border-line bg-surface px-6 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-danger text-tinta">
        <Zap className="size-8" aria-hidden="true" />
      </span>
      <h2 className="mt-6 font-display text-2xl sm:text-3xl">Calambre</h2>
      <p className="mt-3 max-w-md text-muted">No pudimos cargar los datos. {message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-volt px-6 font-semibold text-tinta transition-transform duration-200 hover:scale-[1.03]"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Reintentar
      </button>
    </div>
  )
}
