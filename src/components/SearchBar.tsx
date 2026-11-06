import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div role="search" className="relative">
      <label htmlFor="buscar-serie" className="sr-only">
        Buscar serie por nombre
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        id="buscar-serie"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Breaking Bad, The Office, Dark…"
        autoComplete="off"
        className="h-14 w-full rounded-full border border-line bg-surface pr-14 pl-14 text-base text-ink placeholder:text-muted focus:border-fucsia focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Borrar búsqueda"
          className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
