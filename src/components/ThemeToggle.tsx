import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro (Domingo de sofá)' : 'Cambiar a modo oscuro (Maratón de madrugada)'}
      title={isDark ? 'Domingo de sofá' : 'Maratón de madrugada'}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors duration-200 hover:bg-surface-2"
    >
      {isDark ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}
    </button>
  )
}
