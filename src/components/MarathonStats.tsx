import { useState } from 'react'
import { getDaysToFinish, getDistance } from '../utils/marathon'
import PaceSelector from './PaceSelector'

interface MarathonStatsProps {
  name: string
  hours: number | null
  episodes: number
  seasons: number
  runtime: number | null
  rating: number | null
}

export default function MarathonStats({ name, hours, episodes, seasons, runtime, rating }: MarathonStatsProps) {
  const [pace, setPace] = useState<number>(2)
  const distance = hours ? getDistance(hours) : null

  const stats = [
    { label: 'Distancia', value: episodes ? `${episodes} ep.` : '—' },
    { label: 'Temporadas', value: seasons || '—' },
    { label: 'Ritmo', value: runtime ? `${runtime} min` : '—' },
    { label: 'Nota', value: rating ? rating.toFixed(1) : '—' },
  ]

  return (
    <section aria-labelledby="stats-title" className="rounded-3xl bg-surface p-6 ring-1 ring-line sm:p-8">
      <h2 id="stats-title" className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase">
        Ficha de carrera
      </h2>

      {hours && distance ? (
        <>
          <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
            <p className="font-display text-6xl tabular-nums sm:text-7xl">
              {hours} <span className="text-fucsia">h</span>
            </p>
            <span className={`mb-2 rounded-full px-3 py-1 text-sm font-semibold ${distance.className}`}>
              {distance.label}
            </span>
          </div>
          <p className="mt-3 text-muted">
            Es lo que te toma ver <span className="font-semibold text-ink">{name}</span> de principio a fin.
          </p>

          <div className="mt-6">
            <PaceSelector name="ritmo-serie" value={pace} onChange={setPace} />
            <p className="mt-3 text-lg" aria-live="polite">
              Cruzas la meta en{' '}
              <span className="font-display text-2xl text-accent-text tabular-nums">{getDaysToFinish(hours, pace)}</span>{' '}
              {getDaysToFinish(hours, pace) === 1 ? 'día' : 'días'}.
            </p>
          </div>
        </>
      ) : (
        <p className="mt-4 text-muted">
          Aún no hay datos suficientes para medir esta carrera: TVMaze no tiene la duración o el número de episodios.
        </p>
      )}

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface-2 p-4">
            <dt className="text-xs text-muted">{s.label}</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
