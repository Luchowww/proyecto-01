import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Shuffle } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'
import { getShowDetail } from '../services/tvmaze'
import { getDistance, getTotalEpisodes, getTotalHours } from '../utils/marathon'

// Solo guardamos IDs para el hero; todos los datos (nombre, póster, episodios) vienen de la API.
// Elegidas para cubrir las cuatro distancias: de un Sprint de 7 h a un Ultra de más de 500 h.
const FEATURED_IDS = [169, 82, 17861, 526, 1371, 2993, 66, 305, 431, 60, 39749, 44458]

function pickRandom(exclude?: number) {
  const options = FEATURED_IDS.filter((id) => id !== exclude)
  return options[Math.floor(Math.random() * options.length)]
}

export default function HomeHero() {
  const [showId, setShowId] = useState(() => pickRandom())
  const { data: show, loading, error } = useFetch((signal) => getShowDetail(showId, signal), [showId])

  const episodes = show ? getTotalEpisodes(show._embedded.seasons) : 0
  const hours = show ? getTotalHours(episodes, show.averageRuntime ?? show.runtime) : null
  const distance = hours ? getDistance(hours) : null

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-20 md:grid-cols-[1.3fr_1fr]">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase">Tu vida en series</p>

          <h1 id="hero-title" className="mt-4 font-display text-5xl break-words sm:text-7xl lg:text-8xl">
            {show && hours ? (
              <>
                <span className="tabular-nums">{hours.toLocaleString('es')}</span> <span className="text-fucsia">horas</span>
              </>
            ) : (
              <>
                Cada serie <span className="text-fucsia">es una carrera</span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-lg text-lg text-muted" aria-live="polite">
            {show && hours ? (
              <>
                Eso te toma ver <span className="font-semibold text-ink">{show.name}</span> de principio a fin. ¿Cuánto mide tu
                próxima maratón?
              </>
            ) : (
              'Descubre cuántas horas te toma cada serie, arma tu maratón y calcula cuándo cruzas la meta.'
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/explorar"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-volt px-7 font-semibold text-tinta transition-transform duration-200 hover:scale-[1.03]"
            >
              Explorar series
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setShowId((id) => pickRandom(id))}
              disabled={loading}
              className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-line px-6 font-semibold transition-colors duration-200 hover:bg-surface-2 disabled:cursor-wait disabled:opacity-60"
            >
              <Shuffle className="size-5" aria-hidden="true" />
              Otra serie
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-72">
          {loading || error || !show ? (
            // Mientras carga (o si falla) reservamos el espacio del póster para evitar saltos
            <div
              className={`aspect-[210/295] rotate-2 rounded-3xl bg-surface-2 ${loading ? 'animate-pulse' : ''}`}
              aria-hidden="true"
            />
          ) : (
            <Link to={`/serie/${show.id}`} className="group block rotate-2 rounded-3xl transition-transform duration-300 hover:rotate-0">
              {show.image && (
                <img
                  src={show.image.original}
                  alt={`Póster de ${show.name}. Ver ficha de carrera`}
                  width={680}
                  height={1000}
                  className="aspect-[210/295] w-full rounded-3xl bg-surface-2 object-cover shadow-2xl ring-1 ring-line"
                />
              )}
              {distance && (
                <span
                  className={`absolute -bottom-4 -left-4 -rotate-6 rounded-2xl px-4 py-2 font-display text-lg shadow-lg ${distance.className}`}
                >
                  {distance.label}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
