import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { SearchX } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SearchBar from '../components/SearchBar'
import ShowFilters, { type Filters } from '../components/ShowFilters'
import ShowGrid from '../components/ShowGrid'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import { useFetch } from '../hooks/useFetch'
import { useDebounce } from '../hooks/useDebounce'
import { toFavorite, useFavoriteToggle } from '../hooks/useFavoriteToggle'
import { getShows, searchShows } from '../services/tvmaze'
import { translateGenre } from '../utils/format'

const PAGE_SIZE = 24

// Nombre de cada filtro en la URL (?genero=Drama&estado=Running…)
const PARAM_KEYS: Record<keyof Filters, string> = {
  genre: 'genero',
  status: 'estado',
  minRating: 'nota',
  sort: 'orden',
}

export default function ExplorePage() {
  // Búsqueda y filtros viven en la URL: se pueden compartir y el botón "atrás" los respeta
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const filters: Filters = {
    genre: params.get(PARAM_KEYS.genre) ?? '',
    status: params.get(PARAM_KEYS.status) ?? '',
    minRating: params.get(PARAM_KEYS.minRating) ?? '',
    sort: params.get(PARAM_KEYS.sort) ?? '',
  }

  const [input, setInput] = useState(query)
  const debouncedInput = useDebounce(input.trim(), 400)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { isFavorite, toggleFavorite, dialog } = useFavoriteToggle()

  function updateParam(key: string, value: string) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true },
    )
    setVisibleCount(PAGE_SIZE)
  }

  // Cuando el usuario deja de escribir, la búsqueda pasa a la URL y dispara el fetch
  useEffect(() => {
    if (debouncedInput !== query) updateParam('q', debouncedInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput])

  // Sin texto: catálogo general. Con texto: búsqueda en toda la API de TVMaze
  const { data, loading, error, retry } = useFetch(
    (signal) => (query ? searchShows(query, signal) : getShows(0, signal)),
    [query],
  )

  const genres = useMemo(() => {
    const all = new Set((data ?? []).flatMap((s) => s.genres))
    return [...all].sort((a, b) => translateGenre(a).localeCompare(translateGenre(b), 'es'))
  }, [data])

  // Filtrado y orden en el cliente: instantáneo al cambiar cualquier filtro
  const results = useMemo(() => {
    const min = Number(filters.minRating) || 0
    const filtered = (data ?? []).filter(
      (s) =>
        (!filters.genre || s.genres.includes(filters.genre)) &&
        (!filters.status || s.status === filters.status) &&
        (s.rating.average ?? 0) >= min,
    )

    const sort = filters.sort || (query ? 'relevance' : 'rating')
    if (sort === 'rating') filtered.sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
    if (sort === 'recent') filtered.sort((a, b) => (b.premiered ?? '').localeCompare(a.premiered ?? ''))
    if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name, 'es'))

    return filtered.map((s) => toFavorite(s))
  }, [data, query, filters.genre, filters.status, filters.minRating, filters.sort])

  const hasFilters = Boolean(query || filters.genre || filters.status || filters.minRating)

  function clearAll() {
    setInput('')
    setParams({}, { replace: true })
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        eyebrow="Explorar"
        title="Elige tu carrera"
        description="Busca entre miles de series y filtra por género, estado o nota. Toca el corazón para sumarla a tu maratón."
      />

      <div className="space-y-4">
        <SearchBar value={input} onChange={setInput} />
        <ShowFilters
          filters={filters}
          genres={genres}
          isSearching={Boolean(query)}
          onChange={(key, value) => updateParam(PARAM_KEYS[key], value)}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Ninguna carrera con ese nombre"
            description={
              query
                ? `No encontramos series para “${query}” con estos filtros. Prueba con otro nombre o quita algún filtro.`
                : 'Ninguna serie cumple estos filtros. Prueba a quitar alguno.'
            }
            action={
              <button
                type="button"
                onClick={clearAll}
                className="min-h-11 cursor-pointer rounded-full bg-volt px-6 font-semibold text-tinta transition-transform hover:scale-[1.03]"
              >
                Limpiar búsqueda y filtros
              </button>
            }
          />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted" aria-live="polite">
                Mostrando <span className="font-semibold text-ink tabular-nums">{Math.min(visibleCount, results.length)}</span> de{' '}
                <span className="font-semibold text-ink tabular-nums">{results.length}</span> series
                {query && (
                  <>
                    {' '}
                    para “<span className="text-ink">{query}</span>”
                  </>
                )}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="min-h-11 cursor-pointer text-sm font-semibold text-accent-text underline underline-offset-4"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <ShowGrid shows={results.slice(0, visibleCount)} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />

            {visibleCount < results.length && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  className="min-h-11 cursor-pointer rounded-full border border-line px-8 font-semibold transition-colors hover:bg-surface-2"
                >
                  Mostrar más series
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {dialog}
    </section>
  )
}
