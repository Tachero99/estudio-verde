---
name: verificador-reglas-cliente
description: Verifica que el sitio de Estudio Verde respete las reglas firmes que puso la clienta (Paula). Usar SIEMPRE antes de dar por terminada una página, antes de un commit, o cuando el usuario diga "revisá", "está listo", "chequeá" o "terminé esta sección". No esperar a que el usuario lo pida explícitamente por nombre — es un chequeo de seguridad que debe correr solo, en cualquier archivo .html del proyecto que se haya tocado.
---

# Verificador de reglas firmes del cliente

Este Skill existe porque romper una de estas reglas es el error más caro posible en este proyecto: la clienta las remarcó de forma explícita y firme en `CLAUDE.md`. No son sugerencias de estilo, son restricciones duras.

## Qué revisar (en orden)

### 1. Precios — PROHIBIDO en cualquier forma
Buscar en todo el HTML/texto visible:
- Símbolos de moneda: `$`, `ARS`, `USD`
- Palabras: "precio", "presupuesto", "cotización", "desde $", "a partir de", "tarifa", "costo"
- Excepción: si aparece dentro de un formulario donde el propio usuario del sitio escribe su presupuesto (ese es input del visitante, no contenido publicado por el estudio) — no cuenta como violación.

Comando sugerido para barrer el proyecto:
```bash
grep -rniE '\$|precio|presupuesto|cotizaci|tarifa|costo|desde \$' --include="*.html" .
```

### 2. Dirección exacta — PROHIBIDA
- El sitio debe decir únicamente **"Rosario, con cita previa"**.
- Marcar como error cualquier calle, altura, barrio específico, o link a una dirección de Google Maps con pin exacto.

```bash
grep -rniE '(calle|av\.|avenida|n°|nro\.|maps\.google|goo\.gl/maps)' --include="*.html" .
```
Si aparece un embed de mapa, señalarlo igual — probablemente esté mostrando ubicación exacta, que no corresponde.

### 3. Paisajismo con el mismo peso que arquitectura
- Chequear que "Paisajismo" no aparezca como último ítem, más chico, con menos texto o sin foto propia comparado con "Arquitectura" o "Locales comerciales".
- Si en el home los tres bloques (Arquitectura / Locales / Paisajismo) no tienen estructura simétrica (mismo tamaño de foto, misma extensión de texto), marcarlo como hallazgo — aunque no rompa el sitio, va contra un pedido explícito de la clienta ("no somos solo los de las plantas").

### 4. Paleta de colores
- Ningún verde flúor/neón. Si encontrás colores CSS tipo `#00ff00`, `lime`, o valores HSL con saturación muy alta en verdes, marcarlo.

### 5. Sustentabilidad presente
- Confirmar que la home mencione diseño sustentable / conciencia ambiental / materiales sustentables de forma clara — es el mensaje #1 del proyecto. Si no aparece en ningún lado visible, marcarlo como falta grave.

## Formato de salida

Nunca corrijas en silencio. Mostrale al usuario un reporte así:

```
🔴 CRÍTICO — precios.html:34 → aparece "$" en el texto del footer
🔴 CRÍTICO — contacto.html:12 → dirección con altura de calle visible
🟡 REVISAR — index.html → bloque de "Paisajismo" tiene la mitad de texto que "Arquitectura"
🟢 OK — mensaje de sustentabilidad presente en el hero
```

Después del reporte, preguntá si querés que corrija los `🔴` directamente o que te muestre antes/después.
