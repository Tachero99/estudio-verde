---
name: coherencia-visual
description: Revisa que todas las páginas del sitio de Estudio Verde (index.html, proyectos, nosotros.html, contacto.html) usen los mismos colores, tipografías, espaciados, componentes e imágenes propias de forma consistente. Usar siempre después de crear o editar una página nueva, antes de dar por terminado el sitio, o cuando el usuario diga "revisá que quede prolijo", "chequeá consistencia" o "¿quedó todo igual?". El riesgo específico de este proyecto es construir página por página en HTML/CSS puro sin componentes reutilizables, lo que hace muy fácil que una sección quede desalineada del resto — o que se cuele una imagen de un servicio externo de fotos random — sin que nadie lo note hasta el final.
---

# Revisor de coherencia visual

## Territorio de este Skill

Estructura y presentación visual del sitio: colores, tipografía, espaciados, componentes repetidos (header/footer/botones), jerarquía de encabezados, **y origen de cada imagen**. No cubre el contenido de los textos (eso es `revisor-tono-textos`), ni si se rompen las reglas firmes de la clienta como precios o dirección (eso es `verificador-reglas-cliente`), ni el comportamiento en celular (eso es `optimizador-mobile`, aunque el chequeo de imágenes responsive de tamaño/layout es de ese skill — acá solo importa el *origen* del archivo, no cómo se adapta a la pantalla).

## Qué revisar

### 1. Origen de las imágenes — TODAS deben salir de `/img/` del proyecto
Esta es la regla que más fácil se rompe: cualquier `<img src="http...">` apuntando a un servicio externo (picsum.photos, loremflickr.com, unsplash, placeholder.com, etc.) es un hallazgo, sin excepción.

```bash
grep -rnoE '<img[^>]*src="https?://[^"]*"' *.html proyectos/*.html
```

Clasificación de severidad:
- 🔴 **CRÍTICO** si la imagen está en una card o sección que presenta trabajo real del estudio como si lo fuera (ej. "Proyectos destacados", páginas de proyecto individual, cards de "Qué hacemos", fotos de Paula/Martín en Nosotros). Estas secciones afirman mostrar el estudio real — no pueden depender de un servicio de fotos aleatorias que además puede cambiar la imagen en cada visita.
- 🟡 **REVISAR** solo si es un fondo decorativo de hero ya marcado explícitamente con `<!-- TODO: reemplazar por foto real -->` en la línea anterior, Y la URL usa un seed fijo (ej. `picsum.photos/seed/nombre-fijo/...`) que garantiza la misma imagen en cada carga. Si no tiene seed fijo (puede variar por request, como loremflickr sin parámetro de lock), sube a 🔴 igual.

También revisar los `background-image` inline de los hero:
```bash
grep -rn "background-image: .*url('https\?://" *.html proyectos/*.html
```

### 2. Colores — todo debe salir de variables CSS
- Confirmar que `styles.css` defina variables en `:root` (ej. `--verde-principal`, `--tierra`, `--madera`) y que **ningún archivo HTML o CSS use un color hardcodeado** (`#2f5233`, `rgb(...)`) fuera de esas variables o de blancos/negros puros (`#fff`, `#000`) usados como color de texto sobre fondo oscuro — esos sí están permitidos sueltos porque no son parte de la paleta de marca.

```bash
grep -rn "#[0-9a-fA-F]\{3,6\}" css/ | grep -v ":root"
```
Cualquier resultado que NO sea `#fff`/`#000` puro ahí es sospechoso.

### 3. Tipografía
- Debe haber una única declaración de `font-family` base en `styles.css`, aplicada de forma consistente. Si una página tiene una fuente distinta o un `font-family` inline, marcarlo.

```bash
grep -rn "font-family" *.html proyectos/*.html
```
Cualquier resultado ahí (fuera de los `<link>` de Google Fonts en el `<head>`) es un hallazgo.

### 4. Componentes repetidos (header, footer, botón de WhatsApp, botones de CTA)
- El header y footer tienen que ser estructuralmente idénticos en las 6 páginas (mismo orden de links de navegación, mismo estilo de logo/wordmark).
- Los botones (CTA, formulario, WhatsApp) deben compartir la misma clase CSS. Un `style="color:..."` o `style="background:..."` repetido en más de un archivo para lograr el mismo efecto visual es señal de que debería ser una clase CSS compartida, no un inline.

```bash
grep -rn 'style="[^"]*color' *.html proyectos/*.html
```

### 5. Espaciados y grillas
- Confirmar que el padding/margin de secciones equivalentes (ej. el bloque "hero" de cada página de proyecto) use los mismos valores o las mismas variables de espaciado, no números sueltos distintos en cada archivo.

### 6. Jerarquía de encabezados
- Un solo `<h1>` por página.
```bash
for f in *.html proyectos/*.html; do echo "$f: $(grep -o '<h1' "$f" | wc -l) h1"; done
```
Cualquier resultado distinto de 1 es un hallazgo.

## Formato de salida

```
[🔴|🟡|🟢] archivo:línea — qué falló → cómo corregirlo
```

Ejemplo:
```
🔴 index.html:68 — card "Locales comerciales" carga la foto desde loremflickr.com (imagen random externa) en vez de /img/ → reemplazar por una foto local en img/proyectos/ (real o placeholder estable del propio proyecto)
🟡 nosotros.html:22 — color inline #3a5f3a no coincide con ninguna variable → reemplazar por var(--verde-principal)
🟢 casa-haras.html — un solo h1, estructura de header/footer correcta
```

Agrupar por archivo o por tipo de problema, lo que sea más legible. Preguntá si querés que unifique automáticamente hacia las variables/imágenes ya definidas, o que te muestre los cambios antes.
