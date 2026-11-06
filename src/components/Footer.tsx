export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display text-ink">Maratón</span> · Tu vida en series
        </p>
        <p>
          Datos de{' '}
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent-text underline underline-offset-4"
          >
            TVMaze
          </a>{' '}
          bajo licencia CC BY-SA
        </p>
      </div>
    </footer>
  )
}
