'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const navbarBoton = document.getElementById('navbarBoton');
    const navbarResponsive = document.getElementById('navbarResponsive');
    const menuLinks = document.querySelectorAll('.navlist-responsive a');
    const mainContent = document.querySelector('main');
    const footerContent = document.querySelector('footer');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    function closeResponsiveMenu() {
        navbarResponsive.classList.remove('open');
        if (mainContent) mainContent.classList.remove('blur');
        if (footerContent) footerContent.classList.remove('blur');
    }

    navbarBoton.addEventListener('click', () => {
        navbarResponsive.classList.toggle('open');
        if (mainContent) mainContent.classList.toggle('blur');
        if (footerContent) footerContent.classList.toggle('blur');
    });

    menuLinks.forEach(link => {
        const handleClick = (event) => {
            event.preventDefault();
            const href = link.getAttribute('href');

            if (href.startsWith("/index.html")) {
                window.location.href = href;
            } else {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }

                closeResponsiveMenu();
            }
        };

        link.addEventListener('click', handleClick);
        link.addEventListener('touchstart', handleClick);
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!navbarResponsive.contains(target) && !navbarBoton.contains(target)) {
            closeResponsiveMenu();
        }
    });
});



  