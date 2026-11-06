import type { SearchResult, Show, ShowDetail } from '../types/show'

const BASE_URL = 'https://api.tvmaze.com'

export const NOT_FOUND_MESSAGE = 'No encontramos esa serie.'

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, { signal })
  } catch (err) {
    // Una cancelación con AbortController no es un error que mostrar
    if (signal?.aborted) throw err
    // fetch solo lanza ante fallos de red ("Failed to fetch"): damos un mensaje entendible
    throw new Error('Revisa tu conexión a internet e inténtalo de nuevo.')
  }
  if (!res.ok) {
    throw new Error(res.status === 404 ? NOT_FOUND_MESSAGE : `Error ${res.status} al consultar TVMaze.`)
  }
  return res.json() as Promise<T>
}

// Lista paginada: cada página trae ~250 series
export function getShows(page = 0, signal?: AbortSignal) {
  return request<Show[]>(`/shows?page=${page}`, signal)
}

// Búsqueda en todo el catálogo de TVMaze
export async function searchShows(query: string, signal?: AbortSignal) {
  const results = await request<SearchResult[]>(`/search/shows?q=${encodeURIComponent(query)}`, signal)
  return results.map((r) => r.show)
}

// Detalle por ID con temporadas y reparto incluidos en un solo fetch
export function getShowDetail(id: string | number, signal?: AbortSignal) {
  return request<ShowDetail>(`/shows/${id}?embed[]=seasons&embed[]=cast`, signal)
}
