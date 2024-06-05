'use strict';

// CAPTCHA 
function onSubmit(token) {
  document.getElementById("formularioContacto").submit();
}

document.addEventListener('DOMContentLoaded', () => {
  const formularioContacto = document.getElementById('formularioContacto');

  formularioContacto.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevenir el envío del formulario temporalmente para mostrar la alerta

      // Mostrar la alerta
      alert("Muchas gracias por ponerte en contacto con YUBES, pronto nos estaremos comunicando!");

      // Continuar con el envío del formulario después de mostrar la alerta
      formularioContacto.submit();
  });
});
