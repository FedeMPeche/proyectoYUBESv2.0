'use strict';

// Barra de navegación en dispositivo móvil
document.addEventListener('DOMContentLoaded', () => {
  const navbarBoton = document.getElementById('navbarBoton');
  const navbarResponsive = document.getElementById('navbarResponsive');
  const menuLinks = document.querySelectorAll('.navlist-responsive a');
  const mainContent = document.querySelector('main');
  const footerContent = document.querySelector('footer');

  // Función para mostrar/ocultar el menú y aplicar/quitar el efecto blur
  navbarBoton.addEventListener('click', () => {
      navbarResponsive.classList.toggle('open');
      mainContent.classList.toggle('blur'); // Agregar o quitar la clase blur al main
      footerContent.classList.toggle('blur'); // Agregar o quitar la clase blur al footer
  });

  // Función para cerrar el menú cuando se hace clic en un enlace y quitar el efecto blur
  menuLinks.forEach(link => {
      link.addEventListener('click', () => {
          navbarResponsive.classList.remove('open');
          mainContent.classList.remove('blur'); // Quitar la clase blur al main
          footerContent.classList.remove('blur'); // Quitar la clase blur al footer
      });
  });
});
