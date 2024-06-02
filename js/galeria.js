// INTERACCIONES EN GALERIA //

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.seccionesCarrusel li');
    const carruselContainers = document.querySelectorAll('.carrusel-container');
  
    // Función para ocultar todas las galerías y mostrar solo la activa
    function showActiveGallery(activeTab) {
      carruselContainers.forEach(container => {
        container.classList.remove('active');
      });
  
      if (activeTab.id === 'pestañaShows') {
        document.querySelector('.carrusel-container.shows').classList.add('active');
      } else if (activeTab.id === 'pestañaProduccion') {
        document.querySelector('.carrusel-container.produccion').classList.add('active');
      } else if (activeTab.id === 'pestañaIntimidad') {
        document.querySelector('.carrusel-container.intimidad').classList.add('active');
      } else if (activeTab.id === 'pestañaMas') {
        document.querySelector('.carrusel-container.mas').classList.add('active');
      }
    }
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        showActiveGallery(tab);
      });
  
      // Inicializar con la primera pestaña activa
        const initialTab = document.querySelector('#pestañaShows');
        initialTab.classList.add('active');
        showActiveGallery(initialTab);
    });
  
    // Lógica para expandir la imagen al hacer clic y navegación por desplazamiento
    const galeriaContent = document.querySelector('.galeria-content');
    const expandedImgContainer = document.createElement('div');
    expandedImgContainer.classList.add('expanded-img-container');
    document.body.appendChild(expandedImgContainer);
  
    let currentImageIndex = 0;
    let currentImages = [];
  
    galeriaContent.addEventListener('click', (event) => {
      if (event.target.tagName === 'IMG') {
        const imgElements = event.target.closest('.carrusel').querySelectorAll('img');
        currentImages = Array.from(imgElements);
        currentImageIndex = currentImages.indexOf(event.target);
  
        showExpandedImage(currentImages[currentImageIndex].src);
        expandedImgContainer.classList.add('show-expanded-img');
        galeriaContent.classList.add('blur-background');
      }
    });
  
    expandedImgContainer.addEventListener('click', (event) => {
      // Solo cerrar si se hace clic fuera de la imagen
      if (event.target.tagName !== 'IMG') {
        closeExpandedImage();
      }
    });
  
    // Función para mostrar la imagen expandida
    function showExpandedImage(src) {
      expandedImgContainer.innerHTML = '';
      const expandedImg = document.createElement('img');
      expandedImg.src = src;
      expandedImgContainer.appendChild(expandedImg);
    }
  
    // Función para cerrar la imagen expandida
    function closeExpandedImage() {
      expandedImgContainer.classList.remove('show-expanded-img');
      galeriaContent.classList.remove('blur-background');
    }
});  