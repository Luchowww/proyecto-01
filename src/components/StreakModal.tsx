import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Flame } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

const SESSION_KEY = 'maraton-streak-shown'
const COUNTDOWN_SECONDS = 5 * 60

// sessionStorage puede fallar (modo privado): en ese caso el modal se muestra igual una vez por carga
let shownInMemory = false
function alreadyShown() {
  try {
    return shownInMemory || sessionStorage.getItem(SESSION_KEY) === 'true'
  } catch {
    return shownInMemory
  }
}
function markShown() {
  shownInMemory = true
  try {
    sessionStorage.setItem(SESSION_KEY, 'true')
  } catch {
    // Sin almacenamiento: nos quedamos con la marca en memoria
  }
}

/*
 * ⚠️ DARK PATTERN INTENCIONAL (ejercicio académico)
 *
 * Este modal aparece después de guardar la primera serie y usa a propósito
 * varias técnicas manipuladoras para que el usuario siga agregando series:
 *
 * 1. Falsa urgencia: la cuenta regresiva no significa nada. Al acabar vuelve a empezar
 *    y no se pierde ninguna "racha", porque la racha no existe.
 * 2. Prueba social falsa: el número de "maratonistas" es inventado (aleatorio).
 * 3. Confirmshaming: la opción de rechazo culpabiliza al usuario
 *    ("No, prefiero rendirme…") para que le dé vergüenza elegirla.
 * 4. Jerarquía visual engañosa: aceptar es un botón enorme y llamativo;
 *    rechazar es un enlace pequeño y gris, fácil de pasar por alto.
 *
 * Lo que NO hicimos, aunque es común: bloquear la tecla Escape o esconder el cierre
 * ("roach motel"). Eso dejaría atrapadas a las personas que navegan con teclado o
 * lector de pantalla, y la accesibilidad no se negocia ni en un ejemplo.
 *
 * En un producto real, la alternativa honesta sería un aviso discreto con dos
 * opciones del mismo peso visual y sin cuentas regresivas inventadas.
 */
export default function StreakModal() {
  const { favorites } = useFavorites()
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previousCount = useRef(favorites.length)
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS)
  // Prueba social falsa: un número al azar que parece real
  const [fakeRunners] = useState(() => 1000 + Math.floor(Math.random() * 900))

  // Se dispara una vez por sesión, justo cuando el usuario guarda una serie
  useEffect(() => {
    const added = favorites.length > previousCount.current
    previousCount.current = favorites.length
    if (!added || alreadyShown()) return

    const timer = setTimeout(() => {
      markShown()
      dialogRef.current?.showModal()
    }, 1500)
    return () => clearTimeout(timer)
  }, [favorites.length])

  // Falsa urgencia: cuando llega a cero, simplemente reinicia
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? COUNTDOWN_SECONDS : s - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const close = () => dialogRef.current?.close()
  const accept = () => {
    close()
    navigate('/explorar')
  }

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const seconds = String(secondsLeft % 60).padStart(2, '0')

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="racha-title"
      onClick={(e) => e.target === dialogRef.current && close()}
      className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl border-0 bg-fucsia p-0 text-tinta backdrop:bg-tinta/80"
    >
      <div className="p-6 text-center sm:p-8">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-tinta text-volt">
          <Flame className="size-8" aria-hidden="true" />
        </span>
        <h2 id="racha-title" className="mt-5 font-display text-3xl">
          ¡No pierdas tu racha!
        </h2>
        <p className="mt-3 font-medium">
          Guarda 3 series más antes de que acabe el tiempo y desbloquea tu insignia de maratonista.
        </p>

        <p className="mt-6 font-display text-5xl tabular-nums" aria-label={`Quedan ${minutes} minutos y ${seconds} segundos`}>
          {minutes}:{seconds}
        </p>
        <p className="mt-2 text-sm font-semibold">
          {fakeRunners.toLocaleString('es')} maratonistas guardaron series en la última hora
        </p>

        <button
          type="button"
          onClick={accept}
          autoFocus
          className="mt-8 min-h-14 w-full cursor-pointer rounded-full bg-tinta px-6 text-lg font-bold text-volt transition-transform hover:scale-[1.02]"
        >
          ¡Sí, quiero mi insignia!
        </button>
        <button type="button" onClick={close} className="mt-4 min-h-11 cursor-pointer text-xs text-tinta underline">
          No, prefiero rendirme y perderme lo mejor
        </button>
      </div>
    </dialog>
  )
}
