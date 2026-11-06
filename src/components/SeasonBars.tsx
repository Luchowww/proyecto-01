import type { Season } from '../types/show'

interface SeasonBarsProps {
  seasons: Season[]
}

// Cada temporada es una "etapa" de la carrera; la barra es proporcional a sus episodios
export default function SeasonBars({ seasons }: SeasonBarsProps) {
  const max = Math.max(...seasons.map((s) => s.episodeOrder ?? 0), 1)

  return (
    <section aria-labelledby="etapas-title">
      <h2 id="etapas-title" className="font-display text-2xl">
        Etapas
      </h2>
      <p className="mt-1 text-sm text-muted">Episodios por temporada.</p>
      <ol className="mt-6 space-y-3">
        {seasons.map((s) => (
          <li key={s.id} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 text-sm">
            <span className="font-semibold">
              T{s.number}
              {s.premiereDate && <span className="ml-1.5 font-normal text-muted">{s.premiereDate.slice(0, 4)}</span>}
            </span>
            <div className="h-3 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
              <div className="h-full rounded-full bg-fucsia" style={{ width: `${((s.episodeOrder ?? 0) / max) * 100}%` }} />
            </div>
            <span className="text-right text-muted tabular-nums">
              {s.episodeOrder ? `${s.episodeOrder} ep.` : 'Por anunciar'}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
