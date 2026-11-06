import { useEffect, useRef, type ReactNode } from 'react'
import { Send, TriangleAlert } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: ReactNode
  confirmLabel: string
  cancelLabel?: string
  // danger: acciones destructivas (quitar favorito); primary: confirmar algo positivo (enviar)
  tone?: 'danger' | 'primary'
  onConfirm: () => void
  onCancel: () => void
}

const TONES = {
  danger: { Icon: TriangleAlert, iconBg: 'bg-naranja', confirm: 'bg-danger' },
  primary: { Icon: Send, iconBg: 'bg-violeta', confirm: 'bg-volt' },
}

// Modal de confirmación con <dialog> nativo: showModal() da foco atrapado,
// cierre con Escape y fondo inerte sin tener que programarlo a mano.
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancelar',
  tone = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { Icon, iconBg, confirm } = TONES[tone]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
      // Escape dispara "cancel": lo tratamos igual que pulsar Cancelar
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      // Clic en el fondo (fuera de la caja) también cancela
      onClick={(e) => {
        if (e.target === dialogRef.current) onCancel()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-line bg-surface p-0 text-ink backdrop:bg-tinta/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <span className={`grid size-12 place-items-center rounded-full text-tinta ${iconBg}`}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <h2 id="confirm-title" className="mt-5 font-display text-2xl">
          {title}
        </h2>
        <div id="confirm-description" className="mt-3 text-muted">
          {description}
        </div>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            autoFocus
            className="min-h-11 cursor-pointer rounded-full border border-line px-6 font-semibold transition-colors hover:bg-surface-2"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`min-h-11 cursor-pointer rounded-full px-6 ${confirm} font-semibold text-tinta transition-transform hover:scale-[1.03]`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}
