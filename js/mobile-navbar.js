'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const navbarBoton = document.getElementById('navbarBoton');
    const navbarResponsive = document.getElementById('navbarResponsive');
    const menuLinks = document.querySelectorAll('.navlist-responsive a');
    const mainContent = document.querySelector('main');
    const footerContent = document.querySelector('footer');
    const navbar = document.querySelector('.navbar'); // Asegúrate de seleccionar la barra de navegación
    const navbarHeight = navbar.offsetHeight; // Obtener la altura de la barra de navegación

    // Función para mostrar/ocultar el menú y aplicar/quitar el efecto blur
    navbarBoton.addEventListener('click', () => {
        navbarResponsive.classList.toggle('open');
        mainContent.classList.toggle('blur'); // Agregar o quitar la clase blur al main
        footerContent.classList.toggle('blur'); // Agregar o quitar la clase blur al footer
    });

    // Función para cerrar el menú cuando se hace clic en un enlace y quitar el efecto blur
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

            const targetId = link.getAttribute('href').substring(1); // Obtener el id de la sección
            const targetElement = document.getElementById(targetId); // Obtener el elemento de la sección

            // Desplazarse suavemente a la sección
            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight,
                behavior: 'smooth'
            });

            // Cerrar el menú y quitar el efecto blur
            navbarResponsive.classList.remove('open');
            mainContent.classList.remove('blur'); // Quitar la clase blur al main
            footerContent.classList.remove('blur'); // Quitar la clase blur al footer
        });
    });

    // Cerrar el menú cuando se hace clic fuera de él
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!navbarResponsive.contains(target) && !navbarBoton.contains(target)) {
            navbarResponsive.classList.remove('open');
            mainContent.classList.remove('blur'); // Quitar la clase blur al main
            footerContent.classList.remove('blur'); // Quitar la clase blur al footer
        }
    });
});

  