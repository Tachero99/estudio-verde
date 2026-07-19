// Estudio Verde — JS mínimo: menú mobile, WhatsApp flotante, validación de formulario

document.addEventListener('DOMContentLoaded', () => {
  iniciarMenuMobile();
  iniciarFormularioContacto();
});

function iniciarMenuMobile() {
  const boton = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!boton || !menu) return;

  boton.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
    });
  });
}

function iniciarFormularioContacto() {
  const form = document.querySelector('#form-contacto');
  if (!form) return;

  const estado = form.querySelector('.form-mensaje-estado');

  form.addEventListener('submit', (evento) => {
    if (form.querySelector('.campo-oculto input').value) {
      // honeypot lleno → probablemente un bot, no enviar
      evento.preventDefault();
      return;
    }

    let valido = true;

    form.querySelectorAll('[required]').forEach((campo) => {
      const errorEl = document.querySelector(`[data-error-de="${campo.name}"]`);
      let mensaje = '';

      if (!campo.value.trim()) {
        mensaje = 'Este campo es obligatorio.';
      } else if (campo.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value)) {
        mensaje = 'Ingresá un email válido.';
      }

      if (errorEl) errorEl.textContent = mensaje;
      if (mensaje) valido = false;
    });

    if (!valido) {
      evento.preventDefault();
      if (estado) {
        estado.textContent = 'Revisá los campos marcados antes de enviar.';
        estado.classList.remove('exito');
        estado.classList.add('visible', 'error');
      }
    }
  });
}
