import { CircleAlert, CircleCheck, Info, X } from 'lucide-react'
import { useToast, type ToastType } from '../context/ToastContext'

const STYLES: Record<ToastType, { label: string; badge: string; Icon: typeof Info }> = {
  success: { label: 'Listo', badge: 'bg-volt', Icon: CircleCheck },
  error: { label: 'Error', badge: 'bg-danger', Icon: CircleAlert },
  info: { label: 'Aviso', badge: 'bg-violeta', Icon: Info },
}

// Región aria-live: los lectores de pantalla anuncian cada toast nuevo
export default function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:left-auto sm:w-96"
    >
      {toasts.map(({ id, type, message }) => {
        const { label, badge, Icon } = STYLES[type]
        return (
          <div
            key={id}
            role={type === 'error' ? 'alert' : 'status'}
            className="pointer-events-auto flex w-full items-stretch overflow-hidden rounded-2xl border border-line bg-surface shadow-lg"
          >
            <div className={`${badge} flex items-center px-3 text-tinta`}>
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <div className="flex-1 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
              <p className="text-sm text-ink">{message}</p>
            </div>
            <button
              type="button"
              onClick={() => dismissToast(id)}
              aria-label="Cerrar notificación"
              className="grid w-11 cursor-pointer place-items-center text-muted transition-colors hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
