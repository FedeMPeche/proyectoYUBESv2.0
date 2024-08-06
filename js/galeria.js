document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.seccionesCarrusel li');
  const carruselContainers = document.querySelectorAll('.carrusel-container');

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
      const handleTabClick = () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          showActiveGallery(tab);
      };

      tab.addEventListener('click', handleTabClick);
      tab.addEventListener('touchstart', handleTabClick);
  });

  const initialTab = document.querySelector('#pestañaShows');
  initialTab.classList.add('active');
  showActiveGallery(initialTab);

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
      if (event.target.tagName !== 'IMG') {
          closeExpandedImage();
      }
  });

  function showExpandedImage(src) {
      expandedImgContainer.innerHTML = '';

      const expandedImg = document.createElement('img');
      expandedImg.src = src;
      expandedImgContainer.appendChild(expandedImg);

      const swipeText = document.createElement('div');
      swipeText.classList.add('swipe-text');
      swipeText.textContent = 'DESLIZA PARA VER MAS ➝';
      expandedImgContainer.appendChild(swipeText);
  }

  function closeExpandedImage() {
      expandedImgContainer.innerHTML = '';
      expandedImgContainer.classList.remove('show-expanded-img');
      galeriaContent.classList.remove('blur-background');
  }

  let touchStartX = 0;
  let touchEndX = 0;
  const threshold = 50;

  expandedImgContainer.addEventListener('touchstart', handleTouchStart);
  expandedImgContainer.addEventListener('touchend', handleTouchEnd);

  function handleTouchStart(event) {
      touchStartX = event.changedTouches[0].screenX;
  }

  function handleTouchEnd(event) {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipeGesture();
  }

  function handleSwipeGesture() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) >= threshold) {
          if (swipeDistance > 0) {
              currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
          } else {
              currentImageIndex = (currentImageIndex + 1) % currentImages.length;
          }
          showExpandedImage(currentImages[currentImageIndex].src);
      }
  }

  let mouseStartX = 0;
  let isDragging = false;

  expandedImgContainer.addEventListener('mousedown', (event) => {
      mouseStartX = event.clientX;
      isDragging = true;
      expandedImgContainer.classList.add('dragging');
  });

  expandedImgContainer.addEventListener('mousemove', (event) => {
      if (isDragging) {
          event.preventDefault();
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

  function handleMouseSwipe(startX, endX) {
      if (endX < startX) {
          currentImageIndex = (currentImageIndex + 1) % currentImages.length;
      } else if (endX > startX) {
          currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
      }
      showExpandedImage(currentImages[currentImageIndex].src);
  }
});

