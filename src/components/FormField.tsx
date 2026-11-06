import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: ReactNode
  children: ReactNode
}

// Etiqueta visible + campo + error junto al campo (enlazado con aria-describedby desde el input)
export default function FormField({ id, label, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
        {hint && <span className="text-xs text-muted tabular-nums">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger-text">
          {error}
        </p>
      )}
    </div>
  )
}
