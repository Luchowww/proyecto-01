import { useCallback, useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  retry: () => void
}

// Ejecuta un fetch cuando cambian las dependencias y expone loading / error / data.
// El AbortController cancela la petición anterior si el componente se desmonta
// o si las dependencias cambian antes de que termine.
export function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>, deps: unknown[]): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const result = await fetcher(controller.signal)
        setData(result)
      } catch (err) {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Algo salió mal.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  return { data, loading, error, retry }
}
