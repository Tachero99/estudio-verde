---
name: coherencia-visual
description: Revisa que todas las páginas del sitio de Estudio Verde (index.html, proyectos, nosotros.html, contacto.html) usen los mismos colores, tipografías, espaciados y componentes de forma consistente. Usar siempre después de crear o editar una página nueva, antes de dar por terminado el sitio, o cuando el usuario diga "revisá que quede prolijo", "chequeá consistencia" o "¿quedó todo igual?". El riesgo específico de este proyecto es construir página por página en HTML/CSS puro sin componentes reutilizables, lo que hace muy fácil que una sección quede desalineada del resto sin que nadie lo note hasta el final.
---

# Revisor de coherencia visual

## Por qué este Skill es necesario en este proyecto

El sitio es HTML/CSS/JS puro, multi-página, sin framework de componentes. Eso significa que cada `.html` repite estructura a mano, y es fácil que color, tipografía o espaciados diverjan de una página a otra sin querer.

## Qué revisar

### 1. Colores — todo debe salir de variables CSS
- Confirmar que `styles.css` defina variables en `:root` (ej. `--verde-principal`, `--tierra`, `--madera`) y que **ningún archivo HTML o CSS use un color hardcodeado** (`#2f5233`, `rgb(...)`) fuera de esas variables.

```bash
grep -rn "#[0-9a-fA-F]\{3,6\}" css/ | grep -v ":root"
```
Cualquier resultado ahí es sospechoso — probablemente sea un color que se coló sin pasar por la variable.

### 2. Tipografía
- Debe haber una única declaración de `font-family` base en `styles.css`, aplicada de forma consistente. Si una página tiene una fuente distinta o un `font-family` inline, marcarlo.

### 3. Componentes repetidos (header, footer, botón de WhatsApp, botones de CTA)
- El header y footer tienen que ser estructuralmente idénticos en las 6 páginas (mismo orden de links de navegación, mismo estilo de logo/wordmark).
- Los botones (CTA, formulario, WhatsApp) deben compartir la misma clase CSS y no reinventarse con estilos inline página por página.

```bash
grep -rn "style=" *.html proyectos/*.html
```
Estilos inline son señal de que algo no está usando el sistema compartido — revisar caso por caso.

### 4. Espaciados y grillas
- Confirmar que el padding/margin de secciones equivalentes (ej. el bloque "hero" de cada página de proyecto) use los mismos valores o las mismas variables de espaciado, no números sueltos distintos en cada archivo.

### 5. Jerarquía de encabezados
- Un solo `<h1>` por página. Confirmar que `<h2>`/`<h3>` seudo-similares se usen con el mismo criterio en todas las páginas (por ejemplo, todos los títulos de sección con `<h2>`, nunca mezclado con `<h3>` para lo mismo).

## Formato de salida

Reporte por archivo, agrupando por tipo de problema:

```
COLORES
🔴 nosotros.html:22 → color inline #3a5f3a, no coincide con --verde-principal (#2f5233 en variables)

TIPOGRAFÍA
🟡 casa-haras.html → usa font-family distinta a la del resto

COMPONENTES
🔴 contacto.html → botón de WhatsApp con estilo inline en vez de clase .btn-whatsapp
```

Preguntá si querés que unifique automáticamente hacia las variables ya definidas, o que te muestre los cambios antes.
