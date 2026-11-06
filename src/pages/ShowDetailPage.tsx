import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import { ArrowLeft, Heart, SearchX, Tv } from 'lucide-react'
import EmptyState from '../components/EmptyState'
import ShareButton from '../components/ShareButton'
import MarathonStats from '../components/MarathonStats'
import SeasonBars from '../components/SeasonBars'
import CastList from '../components/CastList'
import DetailSkeleton from '../components/DetailSkeleton'
import ErrorState from '../components/ErrorState'
import { useFetch } from '../hooks/useFetch'
import { toFavorite, useFavoriteToggle } from '../hooks/useFavoriteToggle'
import { useFavorites } from '../context/FavoritesContext'
import { getShowDetail, NOT_FOUND_MESSAGE } from '../services/tvmaze'
import { formatYears, stripHtml, translateGenre, translateLanguage, translateStatus } from '../utils/format'
import { getTotalEpisodes, getTotalHours } from '../utils/marathon'

export default function ShowDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { favorites, updateFavorite } = useFavorites()
  const { isFavorite, toggleFavorite, dialog } = useFavoriteToggle()

  const { data: show, loading, error, retry } = useFetch((signal) => getShowDetail(id, signal), [id])

  const seasons = show?._embedded.seasons ?? []
  const totalEpisodes = getTotalEpisodes(seasons)
  const runtime = show?.averageRuntime ?? show?.runtime ?? null
  const hours = getTotalHours(totalEpisodes, runtime)

  // Si la serie se agregó desde el listado (sin episodios), completamos el dato al ver su ficha
  useEffect(() => {
    if (!show || !totalEpisodes) return
    const saved = favorites.find((f) => f.id === show.id)
    if (saved && saved.totalEpisodes === null) updateFavorite(toFavorite(show, totalEpisodes))
  }, [show, totalEpisodes, favorites, updateFavorite])

  // Volver respeta los filtros de Explorar; si se entró directo por URL, va a Explorar
  const goBack = () => (location.key === 'default' ? navigate('/explorar') : navigate(-1))

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <button
        type="button"
        onClick={goBack}
        className="mb-8 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full pr-4 text-sm font-semibold text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver
      </button>

      {loading ? (
        <DetailSkeleton />
      ) : error === NOT_FOUND_MESSAGE ? (
        // Reintentar no sirve si la serie no existe: ofrecemos volver a explorar
        <EmptyState
          icon={SearchX}
          title="Esta carrera no existe"
          description="No hay ninguna serie con ese identificador. Puede que el enlace esté mal escrito."
          action={
            <Link
              to="/explorar"
              className="inline-flex min-h-11 items-center rounded-full bg-volt px-6 font-semibold text-tinta transition-transform hover:scale-[1.03]"
            >
              Explorar series
            </Link>
          }
        />
      ) : error || !show ? (
        <ErrorState message={error ?? ''} onRetry={retry} />
      ) : (
        <>
          <title>{`${show.name} · Maratón`}</title>
          <div className="grid gap-8 md:grid-cols-[280px_1fr] lg:gap-12">
            <div className="mx-auto w-56 md:w-full">
              {show.image ? (
                <img
                  src={show.image.original}
                  alt={`Póster de ${show.name}`}
                  width={680}
                  height={1000}
                  className="aspect-[210/295] w-full rounded-3xl object-cover ring-1 ring-line"
                />
              ) : (
                <div className="grid aspect-[210/295] place-items-center rounded-3xl bg-surface-2 text-muted">
                  <Tv className="size-12" aria-hidden="true" />
                  <span className="sr-only">{show.name} no tiene póster</span>
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted">
                {[
                  formatYears(show.premiered, show.ended),
                  translateStatus(show.status),
                  show.network?.name ?? show.webChannel?.name,
                  show.language && translateLanguage(show.language),
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              <h1 className="mt-3 font-display text-4xl break-words sm:text-6xl">{show.name}</h1>

              {show.genres.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Géneros">
                  {show.genres.map((g) => (
                    <li key={g} className="rounded-full border border-line px-3 py-1 text-sm">
                      {translateGenre(g)}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => toggleFavorite(toFavorite(show, totalEpisodes || null))}
                  aria-pressed={isFavorite(show.id)}
                  className={[
                    'inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full px-6 font-semibold transition-transform duration-200 hover:scale-[1.03]',
                    isFavorite(show.id) ? 'bg-fucsia text-tinta' : 'bg-volt text-tinta',
                  ].join(' ')}
                >
                  <Heart className={`size-5 ${isFavorite(show.id) ? 'fill-current' : ''}`} aria-hidden="true" />
                  {isFavorite(show.id) ? 'En tu maratón' : 'Agregar a mi maratón'}
                </button>
                <ShareButton title={show.name} />
              </div>

              <div className="mt-8">
                <MarathonStats
                  name={show.name}
                  hours={hours}
                  episodes={totalEpisodes}
                  seasons={seasons.length}
                  runtime={runtime}
                  rating={show.rating.average}
                />
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <section aria-labelledby="sinopsis-title">
              <h2 id="sinopsis-title" className="font-display text-2xl">
                Sinopsis
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {stripHtml(show.summary) || 'Esta serie todavía no tiene sinopsis.'}
              </p>
              <p className="mt-2 text-xs text-muted">Sinopsis original en inglés, vía TVMaze.</p>
            </section>
            {seasons.length > 0 && <SeasonBars seasons={seasons} />}
          </div>

          {show._embedded.cast.length > 0 && (
            <div className="mt-12">
              <CastList cast={show._embedded.cast} />
            </div>
          )}
        </>
      )}

      {dialog}
    </section>
  )
}
