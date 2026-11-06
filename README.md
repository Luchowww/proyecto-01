# Maratón · Tu vida en series

**Maratón** es una SPA para fans de las series que trata cada serie como una carrera: mide cuántas
horas toma verla completa, la clasifica por distancia y te deja armar tu propia maratón con una
fecha estimada para cruzar la meta.

Proyecto 01 · Semana 12 (UX, Dark Mode y Build) — desarrollo web frontend.

- **Demo:** _pendiente (URL de Vercel)_
- **Datos:** [API de TVMaze](https://www.tvmaze.com/api) (pública, sin API key, licencia CC BY-SA)

## La idea

Cada serie se mide en horas: episodios de todas las temporadas × duración media. Con eso se
clasifica en una de cuatro distancias:

| Distancia       | Horas totales |
|-----------------|---------------|
| Sprint          | menos de 10 h |
| Media maratón   | 10 a 40 h     |
| Maratón         | 40 a 100 h    |
| Ultra           | más de 100 h  |

Tus series favoritas forman *tu maratón*: la app suma las horas, detecta tu género dominante y,
según tu ritmo diario (1, 2 o 4 h), calcula el día exacto en que terminas.

## Vistas

| Ruta            | Vista       | Qué hace |
|-----------------|-------------|----------|
| `/`             | Inicio      | Hero con una serie destacada y sus horas, guía de distancias, top 8 mejor valoradas |
| `/explorar`     | Explorar    | Grid de series con búsqueda, filtros (género, estado, nota) y orden |
| `/serie/:id`    | Detalle     | Ficha de carrera: horas, distancia, ritmo, temporadas, reparto y sinopsis |
| `/mi-maraton`   | Favoritos   | Resumen de tu maratón y tus series guardadas |
| `/contacto`     | Contacto    | Formulario controlado con validación |
| `*`             | 404         | "KM 404: te saliste de la ruta" |

## Requisitos cubiertos

- **Vite + React + TypeScript** y **React Router** con ruta dinámica (`useParams`) y `NavLink`.
- **Dos fetches:** lista (`/shows`, `/search/shows`) y detalle por ID (`/shows/:id` con temporadas y reparto embebidos).
- **Estados visibles:** loading (skeletons), error (con reintentar) y empty (búsqueda sin resultados, favoritos vacíos, serie inexistente).
- **Búsqueda y filtrado en tiempo real:** búsqueda con *debounce* contra la API + filtros instantáneos en el cliente. Todo queda en la URL (`?q=&genero=…`).
- **Favoritos en estado global** (Context por encima del router) que persisten entre rutas y en `localStorage`.
- **Formulario controlado** (nombre, email, mensaje) con validación por campo y botón deshabilitado mientras no es válido.
- **Toasts** de éxito, error e info con auto-dismiss, hechos desde cero con `useState` + `setTimeout`.
- **Modal de confirmación** con `<dialog>` nativo + `useRef` + `showModal()` para quitar favoritos y enviar el formulario.
- **Modal con dark pattern intencional** (`src/components/StreakModal.tsx`): falsa urgencia, prueba social falsa, *confirmshaming* y jerarquía visual engañosa, con un comentario que explica cada técnica.
- **Tailwind CSS** para todo el estilo, responsive con prefijos (`sm:`, `md:`, `lg:`).
- **Modo oscuro** con alternador (variante `dark:` por clase) y tokens de color semánticos.
- **Accesibilidad:** HTML semántico, `alt`, `aria-label`, `aria-pressed`, `aria-invalid`, `aria-describedby`, `htmlFor`, regiones `aria-live`, enlace "Saltar al contenido", foco visible y `prefers-reduced-motion`.
- **26 componentes** en archivos `.tsx` separados.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · Lucide (íconos)

## Cómo correrlo

```bash
npm install
npm run dev
```

Otros scripts: `npm run build` (compila a `dist/`), `npm run preview` y `npm run lint`.

## Estructura

```
src/
├── components/   # UI reutilizable (tarjetas, filtros, estados, modales, toasts…)
├── context/      # Favoritos, toasts y tema (estado global)
├── hooks/        # useFetch, useDebounce, useFavoriteToggle, useCompleteFavorites
├── pages/        # Una página por ruta
├── services/     # Llamadas a la API de TVMaze
├── types/        # Tipos de la API
└── utils/        # Cálculo de la maratón y formateo/traducciones
design-system/    # Decisiones de diseño (paleta, tipografía, accesibilidad)
```

## Créditos

Datos de series, imágenes y sinopsis: [TVMaze](https://www.tvmaze.com), bajo licencia
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Las sinopsis están en inglés
porque así las entrega la API.
