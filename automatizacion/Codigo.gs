/**
 * Estudio Verde — Asistente de borradores de mail
 *
 * Revisa periódicamente la bandeja en busca de consultas nuevas que llegaron
 * por Formspree (el servicio que usa el formulario de contacto del sitio).
 * Para cada una, le pide a Claude que decida si es una consulta real y, si lo es,
 * redacte un borrador de respuesta usando el Skill de tono del repo del proyecto.
 * El borrador se crea en Gmail pero NUNCA se envía solo — eso lo decide el dueño
 * del negocio a mano.
 *
 * Ver GUIA-DE-INSTALACION.md para los pasos de instalación.
 */

const CLAUDE_API_KEY = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
const SKILL_URL = 'https://raw.githubusercontent.com/Tachero99/estudio-verde/master/.claude/skills/tono-respuestas-email/SKILL.md';
const ETIQUETA_PROCESADO = 'EstudioVerde/Procesado';
const REMITENTE_FORMSPREE = 'notifications@formspree.io'; // confirmar el remitente real, ver GUIA-DE-INSTALACION.md

function revisarConsultas() {
  const label = obtenerOCrearEtiqueta(ETIQUETA_PROCESADO);
  const consulta = `from:${REMITENTE_FORMSPREE} -label:"${ETIQUETA_PROCESADO}" newer_than:2d`;
  const hilos = GmailApp.search(consulta);

  if (hilos.length === 0) {
    Logger.log('No hay consultas nuevas.');
    return;
  }

  const skillTexto = obtenerSkill();

  hilos.forEach(function (hilo) {
    try {
      const mensajes = hilo.getMessages();
      const ultimoMensaje = mensajes[mensajes.length - 1];
      const cuerpo = ultimoMensaje.getPlainBody();

      const datos = extraerDatosFormspree(cuerpo);

      if (!datos) {
        Logger.log('No se pudieron extraer datos del mail, se marca como procesado igual.');
        hilo.addLabel(label);
        return;
      }

      const resultado = clasificarYRedactar(datos, skillTexto);

      if (resultado.esConsulta) {
        GmailApp.createDraft(datos.email, resultado.asunto, resultado.cuerpo);
        Logger.log('Borrador creado para: ' + datos.nombre + ' <' + datos.email + '>');
      } else {
        Logger.log('No es una consulta, se ignora: ' + datos.nombre);
      }

      hilo.addLabel(label);
    } catch (error) {
      Logger.log('Error procesando un hilo: ' + error);
    }
  });
}

function extraerDatosFormspree(cuerpo) {
  const nombreMatch = cuerpo.match(/nombre:\s*(.+)/i);
  const emailMatch = cuerpo.match(/email:\s*(.+)/i);
  const mensajeMatch = cuerpo.match(/mensaje:\s*([\s\S]+?)(?:\n\n|\n-{2,}|$)/i);

  if (!nombreMatch || !emailMatch || !mensajeMatch) {
    return null;
  }

  return {
    nombre: nombreMatch[1].trim(),
    email: emailMatch[1].trim(),
    mensaje: mensajeMatch[1].trim()
  };
}

function obtenerSkill() {
  const respuesta = UrlFetchApp.fetch(SKILL_URL);
  return respuesta.getContentText();
}

function clasificarYRedactar(datos, skillTexto) {
  const prompt = [
    'Sos el asistente de mail de Estudio Verde. Este es el Skill que define el tono de las respuestas a consultas de clientes:',
    '',
    skillTexto,
    '',
    'Llegó este mensaje por el formulario de contacto del sitio:',
    'Nombre: ' + datos.nombre,
    'Email: ' + datos.email,
    'Mensaje: ' + datos.mensaje,
    '',
    'Paso 1: Decidí si esto es una CONSULTA real de un cliente potencial (pregunta sobre un proyecto, servicios, o similar) o si es otra cosa (spam, prueba sin sentido sin relación al negocio, mensaje vacío).',
    'Paso 2: Si ES una consulta, redactá el asunto y el cuerpo de la respuesta siguiendo EXACTAMENTE el tono, la estructura y las reglas del Skill (sin precios, sin dirección exacta, firma acorde).',
    '',
    'Respondé ÚNICAMENTE con un JSON válido, sin texto adicional antes ni después, con este formato exacto:',
    '{"esConsulta": true, "asunto": "...", "cuerpo": "..."}',
    'Si esConsulta es false, dejá asunto y cuerpo como strings vacíos.'
  ].join('\n');

  const payload = {
    model: 'claude-sonnet-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  };

  const opciones = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const respuesta = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', opciones);
  const datosRespuesta = JSON.parse(respuesta.getContentText());

  if (!datosRespuesta.content || !datosRespuesta.content[0]) {
    Logger.log('Respuesta inesperada de la API: ' + respuesta.getContentText());
    return { esConsulta: false, asunto: '', cuerpo: '' };
  }

  const textoJson = datosRespuesta.content[0].text;

  try {
    return JSON.parse(textoJson);
  } catch (e) {
    Logger.log('No se pudo parsear el JSON de Claude: ' + textoJson);
    return { esConsulta: false, asunto: '', cuerpo: '' };
  }
}

function obtenerOCrearEtiqueta(nombre) {
  let etiqueta = GmailApp.getUserLabelByName(nombre);
  if (!etiqueta) {
    etiqueta = GmailApp.createLabel(nombre);
  }
  return etiqueta;
}

/**
 * Correr ESTA función una sola vez a mano (desde el editor de Apps Script) para
 * instalar el disparador automático que ejecuta revisarConsultas() cada 5 minutos.
 */
function instalarDisparador() {
  const disparadoresExistentes = ScriptApp.getProjectTriggers();
  disparadoresExistentes.forEach(function (t) {
    if (t.getHandlerFunction() === 'revisarConsultas') {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger('revisarConsultas')
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log('Disparador instalado: revisarConsultas() cada 5 minutos.');
}
