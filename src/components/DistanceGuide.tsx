import { DISTANCES, type DistanceId } from '../utils/marathon'

const DESCRIPTIONS: Record<DistanceId, string> = {
  sprint: 'Cabe en un fin de semana. Miniseries y temporadas únicas.',
  media: 'Un par de semanas a buen ritmo. Ideal para empezar.',
  maraton: 'El clásico: varias temporadas y un final que espera.',
  ultra: 'Solo para valientes. Cientos de episodios por delante.',
}

export default function DistanceGuide() {
  return (
    <section aria-labelledby="distancias-title" className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase">Cuatro distancias</p>
      <h2 id="distancias-title" className="mt-2 font-display text-3xl sm:text-4xl">
        ¿Qué carrera vas a correr?
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        Sumamos los episodios de cada temporada, los multiplicamos por su duración y clasificamos la serie según las horas totales.
      </p>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DISTANCES.map((d, i) => (
          <li key={d.id} className={`flex flex-col rounded-3xl p-6 ${d.className}`}>
            <span className="font-display text-sm tabular-nums">0{i + 1}</span>
            <h3 className="mt-6 font-display text-2xl">{d.label}</h3>
            <p className="mt-1 font-semibold">{d.range}</p>
            <p className="mt-4 text-sm">{DESCRIPTIONS[d.id]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
