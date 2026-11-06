import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: ReactNode
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase">{eyebrow}</p>
      {/* La tipografía expandida es ancha: en móvil bajamos el tamaño y permitimos guiones
          para que palabras largas ("ORGANIZACIÓN") no desborden la pantalla */}
      <h1 className="mt-2 font-display text-3xl break-words hyphens-auto sm:text-5xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-muted">{description}</p>}
    </header>
  )
}
