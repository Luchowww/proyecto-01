import { Link } from 'react-router'
import { Heart, Star, Tv } from 'lucide-react'
import type { FavoriteShow } from '../types/show'
import { formatYears, translateGenre, translateStatus } from '../utils/format'
import { getDistance, getFavoriteHours } from '../utils/marathon'

interface ShowCardProps {
  show: FavoriteShow
  isFavorite: boolean
  onToggleFavorite: (show: FavoriteShow) => void
}

export default function ShowCard({ show, isFavorite, onToggleFavorite }: ShowCardProps) {
  const years = formatYears(show.premiered, show.ended)
  const genres = show.genres.slice(0, 2).map(translateGenre).join(' · ')
  // Solo se conoce la distancia si ya tenemos los episodios (favoritos medidos)
  const hours = getFavoriteHours(show)
  const distance = hours ? getDistance(hours) : null

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-transform duration-200 hover:-translate-y-1">
      <Link to={`/serie/${show.id}`} className="block rounded-2xl">
        <div className="relative aspect-[210/295] bg-surface-2">
          {show.image ? (
            <img
              src={show.image.medium}
              alt={`Póster de ${show.name}`}
              loading="lazy"
              width={210}
              height={295}
              className="size-full object-cover"
            />
          ) : (
            <div className="grid size-full place-items-center text-muted">
              <Tv className="size-10" aria-hidden="true" />
              <span className="sr-only">{show.name} no tiene póster</span>
            </div>
          )}
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-tinta/85 px-2.5 py-1 text-xs font-semibold text-volt tabular-nums">
            <Star className="size-3.5 fill-current" aria-hidden="true" />
            {show.rating.average ? (
              <>
                <span className="sr-only">Nota </span>
                {show.rating.average.toFixed(1)}
              </>
            ) : (
              'Sin nota'
            )}
          </span>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 font-display text-base leading-tight">{show.name}</h3>
          {genres && <p className="mt-1.5 truncate text-sm text-muted">{genres}</p>}
          <p className="mt-1 text-xs text-muted">
            {[years, translateStatus(show.status)].filter(Boolean).join(' · ')}
          </p>
          {distance && hours && (
            <span className={`mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ${distance.className}`}>
              {distance.label} · {hours} h
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onToggleFavorite(show)}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Quitar ${show.name} de mi maratón` : `Agregar ${show.name} a mi maratón`}
        className={[
          'absolute top-2 right-2 grid size-11 cursor-pointer place-items-center rounded-full transition-colors duration-200',
          isFavorite ? 'bg-fucsia text-tinta' : 'bg-tinta/85 text-papel hover:bg-fucsia hover:text-tinta',
        ].join(' ')}
      >
        <Heart className={`size-5 ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
      </button>
    </article>
  )
}
