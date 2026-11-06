import { useMemo } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import HomeHero from '../components/HomeHero'
import DistanceGuide from '../components/DistanceGuide'
import HowItWorks from '../components/HowItWorks'
import ShowGrid from '../components/ShowGrid'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import { useFetch } from '../hooks/useFetch'
import { toFavorite, useFavoriteToggle } from '../hooks/useFavoriteToggle'
import { getShows } from '../services/tvmaze'

const TOP_COUNT = 8

export default function HomePage() {
  const { data, loading, error, retry } = useFetch((signal) => getShows(0, signal), [])
  const { isFavorite, toggleFavorite, dialog } = useFavoriteToggle()

  const topRated = useMemo(
    () =>
      [...(data ?? [])]
        .sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
        .slice(0, TOP_COUNT)
        .map((s) => toFavorite(s)),
    [data],
  )

  return (
    <>
      <HomeHero />
      <DistanceGuide />

      <section aria-labelledby="top-title" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase">Podio</p>
            <h2 id="top-title" className="mt-2 font-display text-3xl sm:text-4xl">
              Las mejor valoradas
            </h2>
          </div>
          <Link
            to="/explorar"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent-text underline underline-offset-4"
          >
            Ver todas
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {loading ? (
          <LoadingState cards={TOP_COUNT} />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <ShowGrid shows={topRated} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
        )}
      </section>

      <HowItWorks />
      {dialog}
    </>
  )
}
