import { UserRound } from 'lucide-react'
import type { CastMember } from '../types/show'

interface CastListProps {
  cast: CastMember[]
  limit?: number
}

export default function CastList({ cast, limit = 12 }: CastListProps) {
  return (
    <section aria-labelledby="reparto-title">
      <h2 id="reparto-title" className="font-display text-2xl">
        Reparto
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cast.slice(0, limit).map(({ person, character }) => (
          <li key={`${person.id}-${character.id}`} className="flex items-center gap-3">
            {person.image ? (
              <img
                src={person.image.medium}
                alt={`Foto de ${person.name}`}
                loading="lazy"
                className="size-14 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface-2 text-muted">
                <UserRound className="size-6" aria-hidden="true" />
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate font-semibold">{person.name}</p>
              <p className="truncate text-sm text-muted">{character.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
