# Maratón — Design System (MASTER)

> Fuente de verdad visual del proyecto. Si una página necesita reglas propias, se crean en
> `design-system/maraton/pages/<pagina>.md` y esas reglas prevalecen sobre este archivo.

## Concepto

**Maratón** es una app para fans de las series que trata cada serie como una carrera:
se mide en horas, se clasifica por distancia y tus favoritas forman *tu maratón*.

- Voz: cercana, enérgica, con humor de corredor. Tuteo. Sin signos de exclamación en mensajes de sistema
  (salvo el modal con dark pattern, que es intencionalmente exagerado).
- La metáfora vive en títulos y textos de cada página. **La navegación usa etiquetas claras**
  (Inicio · Explorar · Mi Maratón · Contacto) para no sacrificar usabilidad.

## Categorías por distancia

Horas totales = Σ `episodeOrder` de las temporadas × `averageRuntime` / 60.

| Categoría      | Rango        | Color   |
|----------------|--------------|---------|
| Sprint         | < 10 h       | volt    |
| Media maratón  | 10 – 40 h    | naranja |
| Maratón        | 40 – 100 h   | fucsia  |
| Ultra          | > 100 h      | violeta |

El color nunca va solo: siempre acompaña al nombre de la categoría.

## Color

Tokens semánticos (cambian con el modo) + colores de marca (fijos).

| Token          | Madrugada (dark, por defecto) | Domingo de sofá (light) |
|----------------|-------------------------------|-------------------------|
| `bg`           | `#0E0E14`                     | `#F6F4EF`               |
| `surface`      | `#181822`                     | `#FFFFFF`               |
| `surface-2`    | `#22222E`                     | `#ECE9E1`               |
| `ink` (texto)  | `#F6F4EF`                     | `#0E0E14`               |
| `muted`        | `#A9A8B4`                     | `#55545F`               |
| `line`         | `#2E2E3B`                     | `#D9D5CA`               |
| `accent-text`  | `#D7FF3A`                     | `#B0124F`               |
| `danger-text`  | `#FF6B6B`                     | `#B91C1C`               |

| Marca     | Hex       | Texto encima |
|-----------|-----------|--------------|
| volt      | `#D7FF3A` | `#0E0E14`    |
| fucsia    | `#FF2D7A` | `#0E0E14`    |
| naranja   | `#FF7A1A` | `#0E0E14`    |
| violeta   | `#7C5CFF` | `#0E0E14`    |
| danger    | `#FF4545` | `#0E0E14`    |

**Regla de contraste:** los colores de marca se usan como *fondo* con texto tinta encima.
Nunca como color de texto sobre papel (no pasan 4.5:1). Para texto de acento usar `accent-text`.

## Tipografía

- **Display:** Archivo, ancho expandido (125 %), peso 800–900, mayúsculas. Solo títulos y cifras grandes.
- **Texto:** Inter 400/500/600, base 16 px, interlineado 1.5–1.7.
- **Cifras:** `tabular-nums` siempre que un número cambie o se compare.

## Forma y espacio

- Radios: 8 px controles, 16 px tarjetas, `full` para chips/píldoras.
- Bloques grandes y separación generosa (estilo *Vibrant & Block-based*).
- Sin sombras pesadas; la jerarquía viene de color de superficie y tamaño tipográfico.

## Movimiento

- Transiciones 150–300 ms en hover/focus; salida más rápida que entrada.
- Respetar `prefers-reduced-motion` (sin animaciones decorativas).

## Accesibilidad (obligatorio)

- Contraste ≥ 4.5:1 en texto, en ambos modos.
- Focus visible en todo elemento interactivo (anillo volt/fucsia).
- Botones solo-ícono con `aria-label`; íconos decorativos con `aria-hidden`.
- Imágenes con `alt` descriptivo; HTML semántico (`header`, `nav`, `main`, `footer`, `article`).
- Formularios con `label` + `htmlFor`, errores junto al campo y `aria-invalid` / `aria-describedby`.
- Toasts en región `aria-live`.
- Íconos: Lucide (SVG). Nada de emojis como íconos.

## Textos de estado

| Estado   | Copy |
|----------|------|
| Loading  | Calentando motores… |
| Error    | Calambre: no pudimos cargar los datos. + Reintentar |
| Empty (búsqueda) | Ninguna carrera con ese nombre. |
| Empty (favoritos) | Aún no te inscribes en ninguna carrera. + Explorar series |
| 404      | KM 404: te saliste de la ruta. |
| Confirmar quitar favorito | ¿Abandonar esta carrera? (DNF) |
| Dark pattern | Falsa urgencia de racha + confirmshaming ("No, prefiero rendirme") |
