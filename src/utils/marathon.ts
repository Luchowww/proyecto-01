import type { FavoriteShow, Season } from '../types/show'

export type DistanceId = 'sprint' | 'media' | 'maraton' | 'ultra'

export interface Distance {
  id: DistanceId
  label: string
  range: string
  // Clases de Tailwind para la píldora (fondo de marca + texto tinta)
  className: string
}

export const DISTANCES: Distance[] = [
  { id: 'sprint', label: 'Sprint', range: 'menos de 10 h', className: 'bg-volt text-tinta' },
  { id: 'media', label: 'Media maratón', range: '10 a 40 h', className: 'bg-naranja text-tinta' },
  { id: 'maraton', label: 'Maratón', range: '40 a 100 h', className: 'bg-fucsia text-tinta' },
  { id: 'ultra', label: 'Ultra', range: 'más de 100 h', className: 'bg-violeta text-tinta' },
]

export function getTotalEpisodes(seasons: Season[]): number {
  return seasons.reduce((total, s) => total + (s.episodeOrder ?? 0), 0)
}

export function getTotalHours(episodes: number, runtimeMinutes: number | null): number | null {
  if (!episodes || !runtimeMinutes) return null
  return Math.round((episodes * runtimeMinutes) / 60)
}

export const PACES = [1, 2, 4] as const

export function getDistance(hours: number): Distance {
  if (hours < 10) return DISTANCES[0]
  if (hours < 40) return DISTANCES[1]
  if (hours <= 100) return DISTANCES[2]
  return DISTANCES[3]
}

export function getFavoriteHours(fav: FavoriteShow): number | null {
  return getTotalHours(fav.totalEpisodes ?? 0, fav.averageRuntime)
}

export interface MarathonSummary {
  totalHours: number
  totalEpisodes: number
  measured: number
  topGenre: string | null
  byDistance: Record<DistanceId, number>
}

// Suma lo que se puede medir y cuenta series por categoría de distancia
export function getMarathonSummary(favorites: FavoriteShow[]): MarathonSummary {
  const byDistance: Record<DistanceId, number> = { sprint: 0, media: 0, maraton: 0, ultra: 0 }
  const genreCount = new Map<string, number>()
  let totalHours = 0
  let totalEpisodes = 0
  let measured = 0

  for (const fav of favorites) {
    fav.genres.forEach((g) => genreCount.set(g, (genreCount.get(g) ?? 0) + 1))
    const hours = getFavoriteHours(fav)
    if (hours === null) continue
    totalHours += hours
    totalEpisodes += fav.totalEpisodes ?? 0
    measured++
    byDistance[getDistance(hours).id]++
  }

  const topGenre = [...genreCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
  return { totalHours, totalEpisodes, measured, topGenre, byDistance }
}

// Días para terminar a un ritmo dado de horas por día
export function getDaysToFinish(hours: number, hoursPerDay = 2): number {
  return Math.ceil(hours / hoursPerDay)
}
