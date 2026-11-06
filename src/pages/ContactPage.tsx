import { useState, type FormEvent } from 'react'
import { LoaderCircle, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FormField from '../components/FormField'
import ConfirmDialog from '../components/ConfirmDialog'
import { useToast } from '../context/ToastContext'

interface ContactForm {
  name: string
  email: string
  message: string
}

type Errors = Partial<Record<keyof ContactForm, string>>

const EMPTY_FORM: ContactForm = { name: '', email: '', message: '' }
const MESSAGE_MIN = 10
const MESSAGE_MAX = 500
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate({ name, email, message }: ContactForm): Errors {
  const errors: Errors = {}
  if (name.trim().length < 2) errors.name = 'Escribe tu nombre (al menos 2 letras).'
  if (!EMAIL_REGEX.test(email.trim())) errors.email = 'Escribe un correo válido, como ana@correo.com.'
  if (message.trim().length < MESSAGE_MIN) errors.message = `Cuéntanos un poco más (al menos ${MESSAGE_MIN} caracteres).`
  return errors
}

const inputClass =
  'w-full rounded-2xl border bg-surface px-4 text-base text-ink placeholder:text-muted focus:border-fucsia focus:outline-none aria-[invalid=true]:border-danger-text'

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM)
  // Solo mostramos el error de un campo después de que el usuario salió de él
  const [touched, setTouched] = useState<Partial<Record<keyof ContactForm, boolean>>>({})
  const [confirming, setConfirming] = useState(false)
  const [sending, setSending] = useState(false)
  const { showToast } = useToast()

  const errors = validate(form)
  const isValid = Object.keys(errors).length === 0
  const visibleError = (field: keyof ContactForm) => (touched[field] ? errors[field] : undefined)

  function handleChange(field: keyof ContactForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleBlur(field: keyof ContactForm) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isValid || sending) return
    setConfirming(true)
  }

  async function send() {
    setConfirming(false)
    setSending(true)
    // No hay backend: simulamos el envío con una espera
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setSending(false)
    showToast('success', `Mensaje enviado. Gracias, ${form.name.trim()}: te respondemos antes de tu próxima meta.`)
    setForm(EMPTY_FORM)
    setTouched({})
  }

  const fieldProps = (field: keyof ContactForm) => ({
    id: `contacto-${field}`,
    value: form[field],
    onBlur: () => handleBlur(field),
    'aria-invalid': Boolean(visibleError(field)),
    'aria-describedby': visibleError(field) ? `contacto-${field}-error` : undefined,
  })

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="min-w-0">
          <PageHeader
            eyebrow="Contacto"
            title="Habla con la organización"
            description="¿Una serie que no encuentras, una idea para la app o un error en la ruta? Escríbenos y lo revisamos."
          />
          <ul className="space-y-3 text-sm">
            {['Sugerencias de series y funciones', 'Errores en los datos o en la app', 'Cualquier duda sobre tu maratón'].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-volt" aria-hidden="true" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <form noValidate onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-surface-2 p-6 sm:p-8" aria-label="Formulario de contacto">
          <FormField id="contacto-name" label="Nombre" error={visibleError('name')}>
            <input
              {...fieldProps('name')}
              type="text"
              autoComplete="name"
              placeholder="Ana Pérez"
              onChange={(e) => handleChange('name', e.target.value)}
              className={`${inputClass} h-12 border-line`}
            />
          </FormField>

          <FormField id="contacto-email" label="Correo" error={visibleError('email')}>
            <input
              {...fieldProps('email')}
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="ana@correo.com"
              onChange={(e) => handleChange('email', e.target.value)}
              className={`${inputClass} h-12 border-line`}
            />
          </FormField>

          <FormField
            id="contacto-message"
            label="Mensaje"
            error={visibleError('message')}
            hint={`${form.message.length}/${MESSAGE_MAX}`}
          >
            <textarea
              {...fieldProps('message')}
              rows={5}
              maxLength={MESSAGE_MAX}
              placeholder="Me encantaría poder filtrar por plataforma…"
              onChange={(e) => handleChange('message', e.target.value)}
              className={`${inputClass} resize-y border-line py-3`}
            />
          </FormField>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={!isValid || sending}
              className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-volt px-8 whitespace-nowrap font-semibold text-tinta transition-transform duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {sending ? (
                <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="size-5" aria-hidden="true" />
              )}
              {sending ? 'Enviando…' : 'Enviar mensaje'}
            </button>
            {/* Un botón deshabilitado no explica por qué: lo decimos en texto */}
            {!isValid && !sending && (
              <p className="text-sm text-muted">Completa los tres campos para poder enviar.</p>
            )}
          </div>
        </form>
      </div>

      <ConfirmDialog
        open={confirming}
        tone="primary"
        title="¿Enviar mensaje?"
        description={
          <p>
            Lo enviaremos a la organización con el correo <strong className="text-ink">{form.email.trim()}</strong> para
            responderte.
          </p>
        }
        confirmLabel="Sí, enviar"
        cancelLabel="Revisar"
        onConfirm={send}
        onCancel={() => setConfirming(false)}
      />
    </section>
  )
}
