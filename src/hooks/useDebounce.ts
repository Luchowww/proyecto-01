import { useEffect, useState } from 'react'

// Devuelve el valor solo cuando deja de cambiar durante `delay` ms.
// Sirve para no pedir a la API en cada tecla.
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
