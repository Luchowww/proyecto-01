import { Link } from 'react-router'
import { CalendarCheck, Heart, Search } from 'lucide-react'

const STEPS = [
  { Icon: Search, title: 'Explora', text: 'Busca entre miles de series y filtra por género, estado o nota.' },
  { Icon: Heart, title: 'Inscríbete', text: 'Toca el corazón para sumar cada serie a tu maratón personal.' },
  { Icon: CalendarCheck, title: 'Cruza la meta', text: 'Elige tu ritmo diario y descubre el día exacto en que terminas.' },
]

export default function HowItWorks() {
  return (
    <section aria-labelledby="como-title" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase">Cómo funciona</p>
        <h2 id="como-title" className="mt-2 font-display text-3xl sm:text-4xl">
          De la salida a la meta
        </h2>

        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map(({ Icon, title, text }, i) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-violeta text-tinta">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-2 text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          to="/mi-maraton"
          className="mt-12 inline-flex min-h-12 items-center rounded-full bg-fucsia px-7 font-semibold text-tinta transition-transform duration-200 hover:scale-[1.03]"
        >
          Ver mi maratón
        </Link>
      </div>
    </section>
  )
}
