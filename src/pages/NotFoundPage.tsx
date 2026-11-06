import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase">Fuera de ruta</p>
      <h1 className="mt-4 font-display text-7xl sm:text-9xl">
        KM <span className="text-fucsia">404</span>
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">Te saliste de la ruta. Esta página no existe o cambió de lugar.</p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-volt px-6 font-semibold text-tinta transition-transform duration-200 hover:scale-[1.03]"
      >
        Volver a la salida
      </Link>
    </section>
  )
}
