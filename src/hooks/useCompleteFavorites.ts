import { useEffect, useRef, useState } from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { getShowDetail } from '../services/tvmaze'
import { getTotalEpisodes } from '../utils/marathon'
import { toFavorite } from './useFavoriteToggle'

// Las series agregadas desde el listado no traen episodios (el listado no los incluye).
// Este hook pide el detalle de esas series y completa el dato para poder sumar horas.
export function useCompleteFavorites() {
  const { favorites, updateFavorite } = useFavorites()
  const requested = useRef(new Set<number>())
  const [failed, setFailed] = useState<number[]>([])

  useEffect(() => {
    const missing = favorites.filter((f) => f.totalEpisodes === null && !requested.current.has(f.id))

    missing.forEach(async (fav) => {
      requested.current.add(fav.id)
      try {
        const show = await getShowDetail(fav.id)
        // Guardamos 0 si la API no tiene episodios, para no volver a pedirlo
        updateFavorite(toFavorite(show, getTotalEpisodes(show._embedded.seasons)))
      } catch {
        setFailed((prev) => [...prev, fav.id])
      }
    })
  }, [favorites, updateFavorite])

  const measuring = favorites.filter((f) => f.totalEpisodes === null && !failed.includes(f.id)).length
  return { measuring }
}
