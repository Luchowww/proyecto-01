import type { FavoriteShow } from '../types/show'
import ShowCard from './ShowCard'

interface ShowGridProps {
  shows: FavoriteShow[]
  isFavorite: (id: number) => boolean
  onToggleFavorite: (show: FavoriteShow) => void
}

export default function ShowGrid({ shows, isFavorite, onToggleFavorite }: ShowGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {shows.map((show) => (
        <li key={show.id}>
          <ShowCard show={show} isFavorite={isFavorite(show.id)} onToggleFavorite={onToggleFavorite} />
        </li>
      ))}
    </ul>
  )
}
