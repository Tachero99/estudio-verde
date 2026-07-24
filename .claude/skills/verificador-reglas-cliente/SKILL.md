---
name: verificador-reglas-cliente
description: Verifica que el sitio de Estudio Verde respete las reglas firmes y los datos literales de contacto que puso la clienta (Paula), definidos en CLAUDE.md. Usar SIEMPRE antes de dar por terminada una página, antes de un commit, o cuando el usuario diga "revisá", "está listo", "chequeá" o "terminé esta sección". No esperar a que el usuario lo pida explícitamente por nombre — es un chequeo de seguridad que debe correr solo, en cualquier archivo .html del proyecto que se haya tocado.
---

# Verificador de reglas firmes del cliente

Este Skill existe porque romper una de estas reglas es el error más caro posible en este proyecto: la clienta las remarcó de forma explícita y firme en `CLAUDE.md`. No son sugerencias de estilo, son restricciones duras con valores literales conocidos — no hace falta interpretar nada, solo comparar contra estos datos exactos.

## Territorio de este Skill

Restricciones duras de negocio y datos de contacto exactos. **No** cubre si el texto suena corporativo o cercano (eso es `revisor-tono-textos`, aunque ambos puedan tocar la misma oración: si un párrafo menciona un precio Y encima suena a brochure corporativo, este Skill marca el precio y `revisor-tono-textos` marca el tono — no te repitas el mismo hallazgo dos veces). Tampoco cubre estructura visual (`coherencia-visual`) ni redacción de botones (`cta-contacto`).

## Los datos y reglas literales (no hace falta buscarlos en otro lado)

| Dato | Valor exacto permitido |
|---|---|
| WhatsApp | `+54 9 11 6409-9986` → link `https://wa.me/5491164099986` |
| Mail | `estudioverde@gmail.com` |
| Instagram | `@estudioverde` → `https://instagram.com/estudioverde` |
| Zona | únicamente **"Rosario, con cita previa"** — nunca una dirección más específica |
| Nombre del estudio | "Estudio Verde" (sin logo definitivo, se usa como wordmark tipografiado) |

## Qué revisar (en orden)

### 1. Precios — PROHIBIDO en cualquier forma
Buscar en todo el HTML/texto visible:
- Símbolos de moneda: `$`, `ARS`, `USD`
- Palabras: "precio", "presupuesto", "cotización", "desde $", "a partir de", "tarifa", "costo"
- Excepción: si aparece dentro de un formulario donde el propio usuario del sitio escribe su presupuesto (input del visitante, no contenido publicado por el estudio) — no cuenta como violación. Tampoco cuenta si el texto explica *que no se dan precios* (ej. FAQ "cada proyecto es un mundo, no manejamos precios de referencia") — eso refuerza la regla, no la rompe.

```bash
grep -rniE '\$|precio|presupuesto|cotizaci|tarifa|costo|desde \$' --include="*.html" .
```

### 2. Dirección exacta — PROHIBIDA
- El sitio debe decir únicamente **"Rosario, con cita previa"**. Cualquier variante con calle, altura, barrio específico, o un embed de mapa con marcador/pin en una dirección puntual es una violación. Un mapa general de la ciudad (sin pin, zoom de ciudad) SÍ está permitido — así se implementó la sección "Trabajamos en Rosario" en la home.

```bash
grep -rniE '(calle|av\.|avenida|n°|nro\.|maps\.google.*&q=[0-9]|goo\.gl/maps)' --include="*.html" .
```

### 3. Datos de contacto — deben ser exactamente los de la tabla, en todos lados
```bash
grep -rn "wa.me/" *.html proyectos/*.html | grep -v "5491164099986"
grep -rn "mailto:" *.html proyectos/*.html | grep -v "estudioverde@gmail.com"
grep -rn "instagram.com/" *.html proyectos/*.html | grep -v "instagram.com/estudioverde"
```
Cualquier resultado (un número, mail o usuario distinto al de la tabla) es 🔴 crítico — probablemente un typo o un dato viejo que quedó de un copy-paste.

### 4. Paisajismo con el mismo peso que arquitectura
- "Paisajismo" no debe ser el último ítem, ni tener menos texto, ni carecer de foto propia comparado con "Arquitectura" o "Locales comerciales" en la sección "Qué hacemos" de la home.
- Comparar longitud de los tres párrafos de esa sección (deberían diferir en menos de ~5 palabras entre sí) y el orden en que aparecen.

### 5. Paleta de colores
- Ningún verde flúor/neón: `lime`, `#00ff00`, `#0f0`, o HSL con saturación >90% en tonos verdes.

```bash
grep -rniE "lime|#0f0\b|#00ff00|neon" css/ *.html proyectos/*.html
```

### 6. Sustentabilidad presente
- La home debe mencionar "sustentab...", "conciencia ambiental" o "impacto ambiental" al menos una vez de forma visible (no en un comentario HTML).

```bash
grep -nic "sustentab\|conciencia ambiental\|impacto ambiental" index.html
```
Si el resultado es 0, es una falta grave — es el mensaje #1 del proyecto.

## Formato de salida

```
[🔴|🟡|🟢] archivo:línea — qué falló → cómo corregirlo
```

Ejemplo:
```
🔴 contacto.html:12 — dirección con altura de calle visible → reemplazar por "Rosario, con cita previa"
🔴 nosotros.html:88 — link de WhatsApp usa 5491199998888, no coincide con +54 9 11 6409-9986 → corregir el número
🟢 index.html — mensaje de sustentabilidad presente en el hero y la FAQ
```

Nunca corrijas en silencio. Después del reporte, preguntá si querés que corrija los 🔴 directamente o que te muestre antes/después.
