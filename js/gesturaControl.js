'use strict';

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
