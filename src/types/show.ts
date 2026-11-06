// Tipos de la API de TVMaze (solo los campos que usamos)
// Docs: https://www.tvmaze.com/api

export interface ShowImage {
  medium: string
  original: string
}

export interface Network {
  id: number
  name: string
  country: { name: string; code: string } | null
}

export type ShowStatus = 'Running' | 'Ended' | 'To Be Determined' | 'In Development'

export interface Show {
  id: number
  name: string
  type: string
  language: string | null
  genres: string[]
  status: ShowStatus
  runtime: number | null
  averageRuntime: number | null
  premiered: string | null
  ended: string | null
  rating: { average: number | null }
  network: Network | null
  webChannel: Network | null
  image: ShowImage | null
  summary: string | null
}

export interface Season {
  id: number
  number: number
  episodeOrder: number | null
  premiereDate: string | null
  endDate: string | null
}

export interface CastMember {
  person: { id: number; name: string; image: ShowImage | null }
  character: { id: number; name: string; image: ShowImage | null }
}

// Detalle: /shows/:id?embed[]=seasons&embed[]=cast
export interface ShowDetail extends Show {
  _embedded: {
    seasons: Season[]
    cast: CastMember[]
  }
}

// Respuesta de /search/shows?q=
export interface SearchResult {
  score: number
  show: Show
}

// Lo que guardamos en favoritos (lo mínimo para pintar la tarjeta y calcular la maratón)
export type FavoriteShow = Pick<
  Show,
  'id' | 'name' | 'image' | 'genres' | 'rating' | 'premiered' | 'ended' | 'status' | 'averageRuntime'
> & {
  totalEpisodes: number | null
}
