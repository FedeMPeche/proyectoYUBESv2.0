'use strict';

// EVENTO DE CLICK PARA CAMBIAR DE COLOR EL NOMBRE DE LAS SECCIONES //

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-list li a');
  const navbarHeight = document.querySelector('.navbar').offsetHeight;

  function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + navbarHeight + 1 < sections[index].offsetTop) { }

    navLinks.forEach((link) => link.classList.remove('active'));

    // Asegurarse de que el índice está dentro del rango
    if (index >= 0 && index < navLinks.length) {
      navLinks[index].classList.add('active');
    } else {
      console.warn('Índice fuera de rango:', index);
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

  navLinks.forEach((link) => {
    link.addEventListener('click', scrollToSection);
  });

  changeActiveLink();
  window.addEventListener('scroll', changeActiveLink);
});
