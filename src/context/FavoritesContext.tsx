import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { FavoriteShow } from '../types/show'

interface FavoritesContextValue {
  favorites: FavoriteShow[]
  isFavorite: (id: number) => boolean
  addFavorite: (show: FavoriteShow) => void
  updateFavorite: (show: FavoriteShow) => void
  removeFavorite: (id: number) => void
}

const STORAGE_KEY = 'maraton-favorites'

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

function loadFavorites(): FavoriteShow[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as FavoriteShow[]) : []
  } catch {
    return []
  }
}

// El estado vive aquí, por encima del router, para que los favoritos
// persistan al cambiar de ruta. Además se guarda en localStorage para sobrevivir a recargas.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteShow[]>(loadFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Sin almacenamiento disponible (modo privado): los favoritos viven solo en memoria
    }
  }, [favorites])

  const isFavorite = (id: number) => favorites.some((f) => f.id === id)

  const addFavorite = (show: FavoriteShow) => {
    setFavorites((prev) => (prev.some((f) => f.id === show.id) ? prev : [...prev, show]))
  }

  // Completa datos (p. ej. totalEpisodes) de una serie ya guardada.
  // Si se quitó mientras tanto, no la vuelve a agregar.
  const updateFavorite = (show: FavoriteShow) => {
    setFavorites((prev) => prev.map((f) => (f.id === show.id ? show : f)))
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <FavoritesContext value={{ favorites, isFavorite, addFavorite, updateFavorite, removeFavorite }}>      {children}
    </FavoritesContext>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>')
  return ctx
}
