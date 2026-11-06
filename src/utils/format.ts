import type { ShowStatus } from '../types/show'

// La API devuelve la sinopsis como HTML ("<p><b>...</b></p>"): la convertimos a texto plano
// en vez de usar dangerouslySetInnerHTML.
export function stripHtml(html: string | null): string {
  if (!html) return ''
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent?.trim() ?? ''
}

const GENRES_ES: Record<string, string> = {
  Action: 'Acción',
  Adult: 'Adultos',
  Adventure: 'Aventura',
  Anime: 'Anime',
  Children: 'Infantil',
  Comedy: 'Comedia',
  Crime: 'Crimen',
  DIY: 'Hazlo tú',
  Drama: 'Drama',
  Espionage: 'Espionaje',
  Family: 'Familiar',
  Fantasy: 'Fantasía',
  Food: 'Cocina',
  History: 'Historia',
  Horror: 'Terror',
  Legal: 'Legal',
  Medical: 'Médica',
  Music: 'Música',
  Mystery: 'Misterio',
  Nature: 'Naturaleza',
  Romance: 'Romance',
  'Science-Fiction': 'Ciencia ficción',
  Sports: 'Deportes',
  Supernatural: 'Sobrenatural',
  Thriller: 'Suspenso',
  Travel: 'Viajes',
  War: 'Bélica',
  Western: 'Western',
}

export function translateGenre(genre: string): string {
  return GENRES_ES[genre] ?? genre
}

const STATUS_ES: Record<ShowStatus, string> = {
  Running: 'En emisión',
  Ended: 'Finalizada',
  'To Be Determined': 'Por confirmar',
  'In Development': 'En desarrollo',
}

export function translateStatus(status: ShowStatus): string {
  return STATUS_ES[status] ?? status
}

const LANGUAGES_ES: Record<string, string> = {
  English: 'Inglés',
  Spanish: 'Español',
  Portuguese: 'Portugués',
  French: 'Francés',
  German: 'Alemán',
  Italian: 'Italiano',
  Japanese: 'Japonés',
  Korean: 'Coreano',
  Chinese: 'Chino',
  Hindi: 'Hindi',
  Danish: 'Danés',
  Swedish: 'Sueco',
  Norwegian: 'Noruego',
  Dutch: 'Neerlandés',
  Russian: 'Ruso',
  Turkish: 'Turco',
}

export function translateLanguage(language: string): string {
  return LANGUAGES_ES[language] ?? language
}

// "2008–2013", "2019–" o "" si no hay fecha
export function formatYears(premiered: string | null, ended: string | null): string {
  if (!premiered) return ''
  const start = premiered.slice(0, 4)
  const end = ended ? ended.slice(0, 4) : ''
  return start === end ? start : `${start}–${end}`
}
