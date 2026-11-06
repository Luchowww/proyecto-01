import { useState } from 'react'
import type { MarathonSummary as Summary } from '../utils/marathon'
import { DISTANCES, getDaysToFinish } from '../utils/marathon'
import { translateGenre } from '../utils/format'
import PaceSelector from './PaceSelector'

interface MarathonSummaryProps {
  summary: Summary
  seriesCount: number
  measuring: number
}

const dateFormat = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' })

export default function MarathonSummary({ summary, seriesCount, measuring }: MarathonSummaryProps) {
  const [pace, setPace] = useState<number>(2)
  // La fecha de hoy se toma una sola vez al montar (no en cada render)
  const [today] = useState(() => Date.now())
  const { totalHours, totalEpisodes, topGenre, byDistance } = summary
  const days = getDaysToFinish(totalHours, pace)
  const finishDate = new Date(today + days * 24 * 60 * 60 * 1000)

  const stats = [
    { label: 'Series', value: seriesCount },
    { label: 'Episodios', value: totalEpisodes.toLocaleString('es') },
    { label: 'Género dominante', value: topGenre ? translateGenre(topGenre) : '—' },
  ]

  return (
    <section aria-labelledby="resumen-title" className="rounded-3xl bg-surface p-6 ring-1 ring-line sm:p-8">
      <h2 id="resumen-title" className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase">
        Tu recorrido total
      </h2>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-display text-6xl tabular-nums sm:text-8xl">
            {totalHours.toLocaleString('es')} <span className="text-fucsia">h</span>
          </p>
          <p className="mt-3 text-muted" aria-live="polite">
            {measuring > 0
              ? `Midiendo ${measuring} ${measuring === 1 ? 'carrera' : 'carreras'}…`
              : `Es el tiempo que suman todas las series de tu maratón.`}
          </p>
        </div>

        {totalHours > 0 && (
          <div>
            <PaceSelector name="ritmo-maraton" value={pace} onChange={setPace} />
            <p className="mt-3 text-lg" aria-live="polite">
              Cruzas la meta el{' '}
              <span className="font-semibold text-accent-text">{dateFormat.format(finishDate)}</span>
              <span className="block text-sm text-muted tabular-nums">
                {days.toLocaleString('es')} {days === 1 ? 'día' : 'días'} de maratón
              </span>
            </p>
          </div>
        )}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface-2 p-4 last:col-span-2 sm:last:col-span-1">
            <dt className="text-xs text-muted">{s.label}</dt>
            <dd className="mt-1 truncate text-xl font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <h3 className="text-sm font-semibold">Por distancia</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {DISTANCES.map((d) => (
            <li key={d.id} className={`rounded-full px-3 py-1 text-sm font-semibold tabular-nums ${d.className}`}>
              {d.label}: {byDistance[d.id]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
