import { translateGenre } from '../utils/format'

export interface Filters {
  genre: string
  status: string
  minRating: string
  sort: string
}

interface ShowFiltersProps {
  filters: Filters
  genres: string[]
  isSearching: boolean
  onChange: (key: keyof Filters, value: string) => void
}

const selectClass =
  'h-11 w-full cursor-pointer rounded-full border border-line bg-surface px-4 text-sm text-ink focus:border-fucsia focus:outline-none'

export default function ShowFilters({ filters, genres, isSearching, onChange }: ShowFiltersProps) {
  return (
    <fieldset className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <legend className="sr-only">Filtrar y ordenar series</legend>

      <div>
        <label htmlFor="filtro-genero" className="mb-1.5 block text-xs font-semibold text-muted uppercase">
          Género
        </label>
        <select id="filtro-genero" value={filters.genre} onChange={(e) => onChange('genre', e.target.value)} className={selectClass}>
          <option value="">Todos</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {translateGenre(g)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filtro-estado" className="mb-1.5 block text-xs font-semibold text-muted uppercase">
          Estado
        </label>
        <select id="filtro-estado" value={filters.status} onChange={(e) => onChange('status', e.target.value)} className={selectClass}>
          <option value="">Todos</option>
          <option value="Running">En emisión</option>
          <option value="Ended">Finalizada</option>
        </select>
      </div>

      <div>
        <label htmlFor="filtro-nota" className="mb-1.5 block text-xs font-semibold text-muted uppercase">
          Nota mínima
        </label>
        <select id="filtro-nota" value={filters.minRating} onChange={(e) => onChange('minRating', e.target.value)} className={selectClass}>
          <option value="">Cualquiera</option>
          <option value="7">7 o más</option>
          <option value="8">8 o más</option>
          <option value="9">9 o más</option>
        </select>
      </div>

      <div>
        <label htmlFor="filtro-orden" className="mb-1.5 block text-xs font-semibold text-muted uppercase">
          Ordenar por
        </label>
        <select id="filtro-orden" value={filters.sort} onChange={(e) => onChange('sort', e.target.value)} className={selectClass}>
          {/* Sin orden explícito: relevancia al buscar, mejor valoradas al explorar */}
          <option value="">{isSearching ? 'Relevancia' : 'Mejor valoradas'}</option>
          {isSearching && <option value="rating">Mejor valoradas</option>}
          <option value="recent">Más recientes</option>
          <option value="name">Nombre (A–Z)</option>
        </select>
      </div>
    </fieldset>
  )
}
