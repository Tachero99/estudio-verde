# Guía de instalación — Asistente de borradores de mail

Automatización con Google Apps Script que revisa la bandeja de entrada cada 5 minutos,
detecta consultas nuevas que llegaron por el formulario de contacto (vía Formspree),
y crea un **borrador** de respuesta con el tono de Estudio Verde. Nunca envía nada sola.

## 1. Conseguir una API key de Anthropic

1. Andá a [console.anthropic.com](https://console.anthropic.com)
2. Creá una cuenta si no tenés (es distinta de tu login de claude.ai)
3. Cargá crédito prepago — con USD 5 alcanza para probar bastante, cada mail procesado cuesta centavos
4. En **API Keys**, creá una key nueva y copiala (la vas a necesitar en el paso 4)

## 2. Crear el proyecto de Apps Script

1. Andá a [script.google.com](https://script.google.com)
2. **Nuevo proyecto**
3. Borrá el código de ejemplo que trae por defecto
4. Pegá todo el contenido de `Codigo.gs`

## 3. Confirmar el remitente real de Formspree

1. Buscá en tu Gmail un mail de una consulta de prueba que ya te haya llegado (ej. la de Valentina o Tomás)
2. Fijate la dirección exacta del remitente ("De:", o "Mostrar original" para verla completa)
3. Si no es `notifications@formspree.io`, cambiá la constante `REMITENTE_FORMSPREE` en `Codigo.gs` por la dirección correcta
4. Revisá también que el cuerpo del mail tenga literalmente las palabras `nombre:`, `email:` y `mensaje:` seguidas del valor — si Formspree lo manda en otro formato, avisá para ajustar las expresiones regulares de `extraerDatosFormspree()`

## 4. Guardar la API key de forma segura

**No la pegues directo en el código.** En el editor de Apps Script:

1. Ícono de engranaje (⚙) → **Configuración del proyecto**
2. Bajá hasta **Propiedades del script** → **Agregar propiedad del script**
3. Nombre: `CLAUDE_API_KEY` — Valor: tu key de console.anthropic.com
4. Guardar

## 5. Autorizar y activar el disparador automático

1. En el desplegable de funciones (arriba del editor), elegí **instalarDisparador**
2. Hacé clic en **Ejecutar** (▶)
3. Google va a pedir autorización — como es un script personal tuyo, va a avisar "La app no está verificada": hacé clic en **Configuración avanzada** → **Ir a [nombre del proyecto] (no seguro)** → **Permitir**
4. Listo — a partir de acá `revisarConsultas()` corre sola cada 5 minutos, sin que tengas que hacer nada más

## 6. Probar

1. Mandá una consulta de prueba desde el formulario de `contacto.html` del sitio
2. Esperá unos minutos, o ejecutá manualmente **revisarConsultas** desde el editor para no esperar
3. Revisá **Ejecuciones** (ícono del reloj con flecha, en el menú lateral) para ver los logs
4. Revisá tu carpeta de **Borradores** en Gmail

## Cómo desactivarlo

Apps Script → ícono del reloj (**Disparadores**) en el menú lateral → borrar el disparador de `revisarConsultas`.

## Qué hace y qué no hace

- ✅ Revisa mails nuevos de Formspree cada 5 minutos
- ✅ Usa el Skill `tono-respuestas-email` del repo (siempre la versión más reciente, lo trae de GitHub)
- ✅ Clasifica: solo arma borrador si es una consulta real, ignora spam/pruebas sin sentido
- ✅ Crea el borrador en Gmail
- ❌ **Nunca envía un mail automáticamente** — el envío lo hacés vos a mano, revisando el borrador primero
