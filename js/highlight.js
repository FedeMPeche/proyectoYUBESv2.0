'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-list li a');
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar.offsetHeight;

  function changeActiveLink() {
    let index = -1;
    
    // Buscar la sección actual
    sections.forEach((section, i) => {
      const sectionTop = section.offsetTop - navbarHeight;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        index = i;
      }
    });

    // Establecer la clase 'active' en el enlace correspondiente
    if (index >= 0 && index < navLinks.length) {
      navLinks.forEach((link) => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    } else {
    }
  }

  function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - navbarHeight,
        behavior: 'smooth'
      });

      navLinks.forEach((link) => link.classList.remove('active'));
      event.currentTarget.classList.add('active');
    } else {
      console.warn('No se encontró la sección:', targetId);
    }
  }

  // Asignar la clase 'active' a la sección "Inicio" cuando la página se carga
  navLinks[0].classList.add('active');

  // Asignar eventos de clic a los enlaces de la barra de navegación
  navLinks.forEach((link) => {
    link.addEventListener('click', scrollToSection);
  });

  // Actualizar el estado de la navegación al desplazarse
  window.addEventListener('scroll', changeActiveLink);
});
