# Estudio Verde — sitio institucional

Sitio institucional de Estudio Verde (arquitectura + paisajismo), armado en HTML/CSS/JS puro, sin frameworks ni build tools.

## Cómo abrir el sitio localmente

No requiere instalación ni build. Alcanza con abrir `index.html` directamente en el navegador, o levantar un servidor estático simple desde la raíz del proyecto, por ejemplo:

```
npx serve .
```

o, con Python:

```
python -m http.server 8000
```

y entrar a `http://localhost:8000`.

## Estructura de archivos

```
estudio-verde/
├── index.html                    Home
├── nosotros.html                 Nosotros (Paula y Martín)
├── contacto.html                 Formulario + WhatsApp + Instagram
├── proyectos/
│   ├── index.html                Grilla de proyectos
│   ├── casa-haras.html           Proyecto individual (plantilla)
│   └── casa-la-toscana.html      Proyecto individual (plantilla)
├── css/
│   └── styles.css                Estilos compartidos + variables de paleta
├── js/
│   └── main.js                   Menú mobile, WhatsApp, validación de formulario
├── img/
│   └── proyectos/                Fotos reales de Casa Haras y Casa La Toscana
└── README.md
```

Para sumar un proyecto nuevo a la grilla: duplicar `proyectos/casa-haras.html`, cambiar textos/fotos/ficha técnica, y agregar la card correspondiente en `proyectos/index.html` (y opcionalmente en la sección de destacados de `index.html`).

## Pendientes

- **Proceso de trabajo (Home):** la sección está armada con 4 pasos genéricos (charla → diseño → obra → entrega), marcada con `<!-- TODO: confirmar con la clienta -->` en `index.html`. Falta confirmar con Paula si se incluye y con qué pasos exactos.
- **Logo definitivo:** por ahora se usa el nombre "Estudio Verde" tipografiado como wordmark en el header. El logo real queda pendiente para más adelante.
- **Fotos reales faltantes:** hero de Home, "qué hacemos" (arquitectura y locales comerciales), fotos de Paula y Martín en Nosotros, y hero de las páginas internas siguen con placeholders (`picsum.photos`), marcados con comentarios `<!-- TODO -->` en el HTML. Las fotos de Casa Haras y Casa La Toscana ya están cargadas en `img/proyectos/`.
- ~~**Formulario de contacto (Formspree)**~~ — resuelto: el formulario en `contacto.html` ya envía a través de `https://formspree.io/f/mykrbyva`, que reenvía a `santiago.romano@davinci.edu.ar`.
- **Ficha técnica de proyectos:** los datos de ubicación exacta, superficie y servicios en las páginas de Casa Haras y Casa La Toscana son placeholders — completar con la información real de cada proyecto.
- **Proyectos destacados:** confirmados como Casa Haras y Casa La Toscana según lo indicado por la clienta. Si se agregan más proyectos "destacados" a futuro, ajustar la sección correspondiente en `index.html`.

## Reglas firmes del proyecto (no negociables)

- Sin precios ni rangos de precio en ningún lado.
- Sin dirección exacta — solo "Rosario, con cita previa".
- Sin paleta flúor.
- Arquitectura y paisajismo con el mismo peso visual.
- Tono cercano, no corporativo.
