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
  });

  // Inicializar con la primera pestaña activa fuera del forEach
  const initialTab = document.querySelector('#pestañaShows');
  initialTab.classList.add('active');
  showActiveGallery(initialTab);

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

  // Manejo de gestos táctiles
  let touchStartX = 0;
  let touchEndX = 0;

  expandedImgContainer.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].screenX;
  });

  expandedImgContainer.addEventListener('touchend', (event) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipeGesture();
  });

  // Manejo de eventos de arrastre del ratón
  let mouseStartX = 0;
  let isDragging = false;

  expandedImgContainer.addEventListener('mousedown', (event) => {
      mouseStartX = event.clientX;
      isDragging = true;
      expandedImgContainer.classList.add('dragging');
  });

  expandedImgContainer.addEventListener('mousemove', (event) => {
      if (isDragging) {
          event.preventDefault(); // Previene la selección de texto mientras se arrastra
      }
  });

  expandedImgContainer.addEventListener('mouseup', (event) => {
      if (isDragging) {
          const mouseEndX = event.clientX;
          handleMouseSwipe(mouseStartX, mouseEndX);
          isDragging = false;
          expandedImgContainer.classList.remove('dragging');
      }
  });

  expandedImgContainer.addEventListener('mouseleave', (event) => {
      if (isDragging) {
          const mouseEndX = event.clientX;
          handleMouseSwipe(mouseStartX, mouseEndX);
          isDragging = false;
          expandedImgContainer.classList.remove('dragging');
      }
  });

  function handleSwipeGesture() {
      if (touchEndX < touchStartX) {
          // Desplazamiento hacia la izquierda
          currentImageIndex = (currentImageIndex + 1) % currentImages.length;
      } else if (touchEndX > touchStartX) {
          // Desplazamiento hacia la derecha
          currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
      }
      showExpandedImage(currentImages[currentImageIndex].src);
  }

  function handleMouseSwipe(startX, endX) {
      if (endX < startX) {
          // Desplazamiento hacia la izquierda
          currentImageIndex = (currentImageIndex + 1) % currentImages.length;
      } else if (endX > startX) {
          // Desplazamiento hacia la derecha
          currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
      }
      showExpandedImage(currentImages[currentImageIndex].src);
  }

  // Lógica para el carrusel de miniaturas
  const carruseles = document.querySelectorAll('.carrusel');

  carruseles.forEach(carrusel => {
      let isDragging = false;
      let startPosition = 0;
      let currentTranslate = 0;
      let previousTranslate = 0;
      let animationID;

      carrusel.addEventListener('mousedown', (e) => {
          isDragging = true;
          startPosition = e.pageX;
          carrusel.classList.add('grabbing');
          animationID = requestAnimationFrame(animation);
      });

      carrusel.addEventListener('mouseup', () => {
          isDragging = false;
          cancelAnimationFrame(animationID);
          carrusel.classList.remove('grabbing');
          previousTranslate = currentTranslate;
      });

      carrusel.addEventListener('mouseleave', () => {
          if (isDragging) {
              isDragging = false;
              cancelAnimationFrame(animationID);
              carrusel.classList.remove('grabbing');
              previousTranslate = currentTranslate;
          }
      });

      carrusel.addEventListener('mousemove', (e) => {
          if (isDragging) {
              const currentPosition = e.pageX;
              currentTranslate = previousTranslate + currentPosition - startPosition;
          }
      });

      function animation() {
          setSliderPosition();
          if (isDragging) requestAnimationFrame(animation);
      }

      function setSliderPosition() {
          carrusel.style.transform = `translateX(${currentTranslate}px)`;
      }
  });
});


