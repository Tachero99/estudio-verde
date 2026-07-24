---
name: tono-respuestas-email
description: Define cómo tiene que sonar un mail de respuesta a una consulta de un cliente de Estudio Verde (arquitectura + paisajismo) — saludo, cuerpo, cierre y firma. Usar siempre que se redacte un borrador de respuesta a una consulta que llegó por el formulario de contacto, WhatsApp o mail, típicamente junto con el MCP de Gmail para crear el borrador. El tono es cercano y natural, como si Paula o Martín escribieran personalmente, nunca una respuesta automática o de call center.
---

# Tono para respuestas de mail — Estudio Verde

## Territorio de este Skill

Cómo suena un mail de respuesta *individual* a una consulta puntual de una persona. Es distinto de `revisor-tono-textos` (que audita el copy ya publicado en las páginas del sitio) — este Skill es para redactar, no para revisar contenido existente, y su unidad es "un mail a una persona", no "una sección de la web". Comparte la lista negra de frases corporativas y el objetivo de tono de `revisor-tono-textos`; si hay dudas de fondo sobre qué es "sonar corporativo", ese Skill tiene la referencia completa.

Las reglas duras del cliente (sin precios, sin dirección exacta) siguen aplicando acá igual que en el sitio — ver `verificador-reglas-cliente` para los valores literales exactos (WhatsApp `+54 9 11 6409-9986`, mail `santiago.romano@davinci.edu.ar`, zona "Rosario, con cita previa").

## Tono objetivo

Cercano y natural — como si Paula o Martín le estuvieran respondiendo personalmente a alguien que escribió por el formulario de la web, no un sistema de tickets. La persona que consulta tiene que sentir que un humano leyó su mensaje específico, no un texto genérico reciclado.

## Estructura de un buen mail de respuesta

1. **Saludo con el nombre de la persona.** Nunca "Estimado/a" ni "Sr./Sra." — un "¡Hola [Nombre]!" o "Hola [Nombre], ¿cómo estás?" alcanza.
2. **Reconocer puntualmente lo que preguntó**, no una respuesta genérica. Si preguntó por paisajismo de un patio, la respuesta tiene que hablar de patios y paisajismo, no de "nuestros servicios en general".
3. **Responder la consulta** con la información que sí se puede dar (proceso, cómo se trabaja, qué necesitan para avanzar) sin inventar datos que no están confirmados (superficies, plazos exactos, disponibilidad) — si falta un dato, decirlo con naturalidad ("te cuento mejor los tiempos cuando charlemos") en vez de inventarlo.
4. **Nunca mencionar precio, presupuesto ni rango** — ni siquiera "te paso un estimado". Si la persona preguntó por costos, la respuesta reconoce la pregunta y explica que se define charlando el proyecto puntual (mismo criterio que la FAQ del sitio: "cada proyecto es un mundo").
5. **Invitar al siguiente paso concreto**: coordinar una charla, seguir por WhatsApp, o pasar por Rosario con cita previa — nunca dejar el mail en un final abierto sin acción sugerida.
6. **Cierre y firma** con nombre de pila (Paula o Martín, según a quién le corresponda el tipo de consulta — arquitectura/locales a Paula, paisajismo a Martín; si la consulta mezcla ambas, firmar como "Paula y Martín" o "el equipo de Estudio Verde" solo en ese caso mixto) — nunca "Atentamente" ni "Saludos cordiales".

## Lista negra (igual que `revisor-tono-textos`, aplicada acá a mails)

Evitar: "estimado/a", "por medio de la presente", "en respuesta a su consulta", "quedamos a su disposición", "saludos cordiales", "solicite un presupuesto", "brindamos soluciones integrales", "nuestro equipo de profesionales".

## Ejemplo

**Consulta recibida:**
> Nombre: Julián Ferreyra — Mail: julian.ferreyra@mail.com
> Mensaje: "Hola, tenemos un patio bastante descuidado en Fisherton y queríamos ver si nos pueden ayudar a rediseñarlo, algo con plantas nativas si se puede. ¿Cómo arrancamos?"

**Borrador de respuesta esperado:**
> Asunto: Sobre el paisajismo de tu patio en Fisherton
>
> ¡Hola Julián! Gracias por escribirnos.
>
> Nos encanta la idea de trabajar con especies nativas — es justo el tipo de proyecto que más disfrutamos, porque además de verse lindo, ayuda a que el jardín necesite menos mantenimiento y agua con el tiempo.
>
> Para arrancar, lo que solemos hacer es una charla inicial donde nos contás más del espacio (tamaño, cómo lo usás, qué te gustaría lograr) y de ahí armamos una propuesta a medida — cada patio es distinto, así que preferimos verlo o charlarlo en detalle antes de tirar ideas al aire.
>
> ¿Te copa si coordinamos por WhatsApp para sacar una fecha? Te dejo el número: +54 9 11 6409-9986. Estamos en Rosario, con cita previa.
>
> ¡Hablamos pronto!
> Martín

## Formato de salida al generar un borrador

Antes de crear el borrador en Gmail, mostrar:
```
Para: [mail de la persona]
Asunto: [asunto corto y específico a su consulta]
---
[cuerpo del mail]
---
Firma: [Paula / Martín / Paula y Martín, según corresponda]
```
Así se puede revisar antes de confirmar que se cree el borrador.
