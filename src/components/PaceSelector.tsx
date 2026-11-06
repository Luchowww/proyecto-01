import { PACES } from '../utils/marathon'

interface PaceSelectorProps {
  name: string
  value: number
  onChange: (pace: number) => void
}

// Control segmentado con radios reales: accesible con flechas del teclado
export default function PaceSelector({ name, value, onChange }: PaceSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">Tu ritmo diario</legend>
      <div className="mt-2 inline-flex rounded-full bg-surface-2 p-1">
        {PACES.map((p) => (
          <label
            key={p}
            className={[
              'grid min-h-11 cursor-pointer place-items-center rounded-full px-4 text-sm font-semibold transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-fucsia',
              value === p ? 'bg-volt text-tinta' : 'text-muted hover:text-ink',
            ].join(' ')}
          >
            <input type="radio" name={name} value={p} checked={value === p} onChange={() => onChange(p)} className="sr-only" />
            {p} h/día
          </label>
        ))}
      </div>
    </fieldset>
  )
}
