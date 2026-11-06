import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-line px-6 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-surface-2 text-ink">
        <Icon className="size-8" aria-hidden="true" />
      </span>
      <h2 className="mt-6 font-display text-2xl sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-md text-muted">{description}</p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  )
}
