---
name: revisor-tono-textos
description: Revisa ortografía, claridad y tono de cualquier texto que se escriba para el sitio de Estudio Verde (títulos, párrafos, textos de "Nosotros", descripciones de proyectos), contra una lista concreta de frases prohibidas y frases modelo. Usar siempre que se redacte o edite texto visible del sitio, o cuando el usuario pida "revisá el texto", "escribí la sección de...", "che este párrafo suena raro". El tono correcto para este cliente es cercano y profesional, nunca corporativo ni frío — ese es el criterio de corrección, medido contra ejemplos concretos, no una opinión general de "buena escritura".
---

# Revisor de tono y textos

## Territorio de este Skill

Estilo, voz y calidad de la redacción — únicamente. **No** vuelve a marcar si un texto contiene un precio o una dirección exacta (eso ya lo cubre `verificador-reglas-cliente`; si un párrafo viola una regla dura Y además suena corporativo, este Skill comenta solo el tono, no repite el hallazgo del precio). Tampoco es su trabajo revisar si el CTA empuja a la acción correcta (eso es `cta-contacto`) ni la estructura visual (`coherencia-visual`).

## Tono objetivo (definido por la clienta)

Paula fue explícita: vio una web de un estudio grande y le pareció "linda pero muy corporativa" — el sitio de Estudio Verde tiene que sonar **cercano**, como quien te explica algo tomando un café, no como un informe institucional.

## Lista negra — si aparece cualquiera de estas frases (o su equivalente), marcarlo siempre

```
soluciones integrales
excelencia en el servicio / excelencia operativa
comprometidos con la calidad / con la excelencia
líderes en el sector / líderes del mercado
brindamos servicios de
equipo de profesionales altamente calificados
a la vanguardia de
Contáctenos
Solicite información
Complete el formulario a continuación
los proyectos son desarrollados por / son diseñados por (voz pasiva de agente)
```

```bash
grep -rniE "soluciones integrales|excelencia|comprometidos con|líderes (en|del)|brindamos servicios|altamente calificados|vanguardia|contáctenos|solicite (información|un presupuesto)|complete el formulario" *.html proyectos/*.html
```
Cualquier resultado es 🔴 automático — no hace falta juicio subjetivo, es lista negra literal.

## Tabla de equivalencias — corporativo → Estudio Verde

| ❌ Corporativo (nunca) | ✅ Estudio Verde (tono objetivo) |
|---|---|
| "Nuestro estudio brinda soluciones integrales en arquitectura." | "Diseñamos casas y locales pensando en cada detalle, con foco en materiales sustentables." |
| "Contamos con un equipo de profesionales altamente calificados." | "Somos Paula y Martín, y a veces sumamos a alguien más según el proyecto." |
| "Los proyectos son desarrollados bajo los más altos estándares de calidad." | "Cuidamos cada detalle, de la primera charla a la entrega." |
| "Solicite un presupuesto sin cargo." | *(no aplica — no se ofrecen presupuestos en el sitio, ver `verificador-reglas-cliente`)* |
| "Estamos comprometidos con la excelencia y la innovación." | "Nos importa hacer bien las cosas, para vos y para el ambiente." |

Cuando encuentres una frase corporativa que no esté en la tabla, proponé el reemplazo siguiendo el mismo patrón: primera persona plural, frase corta, sin adjetivos vacíos ("integral", "excelencia", "calidad" sin nada concreto detrás).

## Otros chequeos

1. **Ortografía y gramática** — errores de tipeo, concordancia, tildes.
2. **Frases confusas** — si una oración necesita leerse dos veces para entenderse, reescribirla más corta.
3. **Primera persona del plural a favor**: "hacemos", "diseñamos", "te acompañamos" — no "el equipo realiza" o "se llevan a cabo".
4. **Paula y Martín como personas reales** en "Nosotros" — nombre y apellido, rol concreto, nunca "el equipo de profesionales". Confirmar que los `alt` de sus fotos también usen nombre y apellido completos.
5. **Consistencia del mensaje central**: todo texto sobre arquitectura o paisajismo debe poder conectar, aunque sea sutilmente, con sustentabilidad/conciencia ambiental (mensaje repetido 3 veces por la clienta).
6. **Paridad arquitectura/paisajismo**: en textos comparativos (ej. "qué hacemos"), ninguna de las dos patas debe tener menos desarrollo textual que la otra — contá palabras si hay duda.

## Formato de salida

```
[🔴|🟡|🟢] archivo:línea — qué falló → cómo corregirlo
```

Para hallazgos de tono, mostrar además original → sugerido:
```
🔴 index.html:14 — "Nuestro estudio brinda soluciones integrales en arquitectura." (frase de la lista negra: "soluciones integrales")
   Sugerido: "Diseñamos casas y locales pensando en cada detalle, con foco en materiales sustentables."
🟢 nosotros.html — tono cercano, primera persona, sin jerga corporativa
```

Si el texto ya está bien, decilo directamente — no hace falta inventar cambios para justificar la revisión.
