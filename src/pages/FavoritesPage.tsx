import { useMemo } from 'react'
import { Link } from 'react-router'
import { Flag } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import MarathonSummary from '../components/MarathonSummary'
import ShowGrid from '../components/ShowGrid'
import { useFavorites } from '../context/FavoritesContext'
import { useFavoriteToggle } from '../hooks/useFavoriteToggle'
import { useCompleteFavorites } from '../hooks/useCompleteFavorites'
import { getMarathonSummary } from '../utils/marathon'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { isFavorite, toggleFavorite, dialog } = useFavoriteToggle()
  const { measuring } = useCompleteFavorites()
  const summary = useMemo(() => getMarathonSummary(favorites), [favorites])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        eyebrow="Mi Maratón"
        title="Tu maratón"
        description={
          favorites.length > 0
            ? `${favorites.length} ${favorites.length === 1 ? 'serie inscrita' : 'series inscritas'}. Esto es lo que te espera.`
            : undefined
        }
      />

      {favorites.length === 0 ? (
        <EmptyState
          icon={Flag}
          title="Aún no te inscribes en ninguna carrera"
          description="Toca el corazón de cualquier serie para sumarla a tu maratón y ver cuántas horas te esperan."
          action={
            <Link
              to="/explorar"
              className="inline-flex min-h-11 items-center rounded-full bg-volt px-6 font-semibold text-tinta transition-transform hover:scale-[1.03]"
            >
              Explorar series
            </Link>
          }
        />
      ) : (
        <>
          <MarathonSummary summary={summary} seriesCount={favorites.length} measuring={measuring} />
          <h2 className="mt-12 mb-6 font-display text-2xl">Tus carreras</h2>
          <ShowGrid shows={favorites} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
        </>
      )}

      {dialog}
    </section>
  )
}
