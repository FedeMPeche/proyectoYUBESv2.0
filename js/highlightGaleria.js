function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
  
    // Separar el ID del target del archivo
    const [file, sectionId] = targetId.split("#");
  
    // Verificar que el targetId comienza con el archivo correcto
    if (file === "/index.html") {
      const targetSection = document.getElementById(sectionId);
  
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - navbarHeight,
          behavior: 'smooth'
        });
  
        navLinks.forEach((link) => link.classList.remove('active'));
        event.currentTarget.classList.add('active');
      } else {
        console.warn('No se encontró la sección:', sectionId);
      }
    } else {
      console.warn('El enlace no pertenece a index.html:', targetId);
    }
}
  