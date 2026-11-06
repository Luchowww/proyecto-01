import { useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import type { FavoriteShow, Show } from '../types/show'

export function toFavorite(show: Show, totalEpisodes: number | null = null): FavoriteShow {
  const { id, name, image, genres, rating, premiered, ended, status, averageRuntime } = show
  return { id, name, image, genres, rating, premiered, ended, status, averageRuntime, totalEpisodes }
}

// Agregar es inmediato; quitar pide confirmación con un <dialog>.
// Devuelve el handler y el diálogo, que la página debe renderizar una sola vez.
export function useFavoriteToggle() {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { showToast } = useToast()
  const [pending, setPending] = useState<Pick<FavoriteShow, 'id' | 'name'> | null>(null)

  const toggleFavorite = (show: FavoriteShow) => {
    if (isFavorite(show.id)) {
      setPending({ id: show.id, name: show.name })
    } else {
      addFavorite(show)
      showToast('success', `${show.name} entró a tu maratón.`)
    }
  }

  const confirmRemove = () => {
    if (!pending) return
    removeFavorite(pending.id)
    showToast('info', `Abandonaste ${pending.name}. Queda como DNF.`)
    setPending(null)
  }

  const dialog = (
    <ConfirmDialog
      open={pending !== null}
      title="¿Abandonar esta carrera?"
      description={
        <p>
          <strong className="text-ink">{pending?.name}</strong> saldrá de tu maratón y sus horas dejarán de contar.
        </p>
      }
      confirmLabel="Sí, abandonar"
      cancelLabel="Seguir corriendo"
      onConfirm={confirmRemove}
      onCancel={() => setPending(null)}
    />
  )

  return { isFavorite, toggleFavorite, dialog }
}
