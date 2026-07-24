---
name: optimizador-mobile
description: Revisa específicamente cómo se ve y funciona cada página del sitio de Estudio Verde en celular — botones tocables, texto legible, imágenes que no rompen el layout, botón flotante de WhatsApp que no tape contenido. Usar siempre después de crear o editar una página, o cuando el usuario diga "revisá el mobile", "chequeá el celular" o "¿anda bien en el teléfono?". La mayoría de las visitas van a llegar desde el link en Instagram, es decir desde el celular — el chequeo mobile no es opcional ni secundario en este proyecto.
---

# Optimizador para el celular

## Territorio de este Skill

Renderizado y usabilidad específicamente en pantallas chicas: viewport, tamaño de tap targets, legibilidad, layout de imágenes/galerías, menú mobile, tipo de teclado del formulario. **No** revisa si una imagen viene de una URL externa o de `/img/` del proyecto (eso es `coherencia-visual`) — acá solo importa si esa imagen, sea cual sea su origen, se comporta responsive. Tampoco revisa el texto de los botones (`cta-contacto`) ni el copy en general (`revisor-tono-textos`).

## Por qué es crítico acá

El tráfico va a entrar mayormente desde el link en el Instagram del estudio (@estudioverde, ~4k seguidores) — eso es tráfico casi 100% mobile. Si el sitio se ve mal en el teléfono, se pierde justo el canal que más consultas puede traer.

## Qué revisar en cada página

### 1. Viewport y meta tags
- Confirmar que exista `<meta name="viewport" content="width=device-width, initial-scale=1">` en cada `.html`.

```bash
grep -L "viewport" *.html proyectos/*.html
```
Cualquier archivo listado ahí NO tiene el meta tag — falta crítica.

### 2. Botones y elementos tocables
- Tamaño mínimo recomendado: 44x44px de área tocable (botones, links de navegación, ítems del menú).
- El botón flotante de WhatsApp no debe superponerse con el formulario de contacto ni con el footer de forma que tape campos o botones al hacer scroll.

### 3. Texto legible sin zoom
- Tamaño de fuente base no menor a 16px en mobile (evita el zoom automático de iOS en inputs, y mejora legibilidad general).
- Confirmar que los textos de la ficha técnica de proyectos (ubicación, tipo, superficie, servicios) no queden apretados o cortados en pantallas chicas.

### 4. Imágenes
- Las fotos de proyectos (el punto fuerte visual del sitio) tienen que usar `max-width: 100%` / `height: auto` o estar dentro de un contenedor responsive — nunca con ancho fijo en px que rompa el layout en pantallas angostas.
- Verificar que la galería de cada proyecto (Casa Haras, Casa La Toscana) no se desborde horizontalmente ni obligue a hacer scroll lateral no intencional.

### 5. Menú de navegación
- Confirmar que exista una versión mobile del menú (hamburguesa o similar) y no el menú de desktop comprimido/ilegible.

### 6. Formulario de contacto
- Los campos del formulario deben ser fáciles de tocar y completar con el teclado del celular (`type="email"` para el mail, `type="tel"` si hay teléfono, etc.), para que aparezca el teclado correcto.

## Formato de salida

```
[🔴|🟡|🟢] archivo:línea — qué falló → cómo corregirlo
```

Ejemplo:
```
🔴 proyectos/casa-haras.html:5 — falta meta viewport → agregar <meta name="viewport" content="width=device-width, initial-scale=1">
🟡 contacto.html — botón flotante de WhatsApp podría tapar "Enviar mensaje" en pantallas <380px al hacer scroll → confirmar en un celular real; si tapa, sumar padding-bottom al formulario o mover el botón al hacer focus en el form
🟢 nosotros.html — responsive correcto
```

Si es posible, sugerí el fix concreto (línea de CSS o atributo a agregar), no solo señalar el problema.
