import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, Timer, X } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/mi-maraton', label: 'Mi Maratón' },
  { to: '/contacto', label: 'Contacto' },
]

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    'inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-200',
    isActive ? 'bg-volt text-tinta' : 'text-ink hover:bg-surface-2',
  ].join(' ')
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { favorites } = useFavorites()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav aria-label="Navegación principal" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 rounded-full" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full bg-fucsia text-tinta">
            <Timer className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg">Maratón</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
                {link.to === '/mi-maraton' && favorites.length > 0 && (
                  <span className="rounded-full bg-fucsia px-2 text-xs font-semibold text-tinta tabular-nums">
                    <span className="sr-only">series guardadas: </span>
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="menu-movil" className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClass} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
