import { Link2 } from 'lucide-react'
import { useToast } from '../context/ToastContext'

interface ShareButtonProps {
  title: string
}

// Copia el enlace de la ficha: toast de éxito si funciona, de error si el navegador lo bloquea
export default function ShareButton({ title }: ShareButtonProps) {
  const { showToast } = useToast()

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('success', `Enlace de ${title} copiado. Compártelo con tu equipo de maratón.`)
    } catch {
      showToast('error', 'No pudimos copiar el enlace. Cópialo desde la barra de direcciones.')
    }
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-line px-6 font-semibold transition-colors duration-200 hover:bg-surface-2"
    >
      <Link2 className="size-5" aria-hidden="true" />
      Copiar enlace
    </button>
  )
}
