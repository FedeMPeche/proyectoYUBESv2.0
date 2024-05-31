'use strict';

// ---------------- AUDIO PLAYER -------------------------------------

const audioFiles = [
  'audio/Bailando.mp3',
  'audio/ElEspectador.mp3',
  'audio/Robotizado.mp3',
  'audio/NoParesdeBrillar.mp3',
  'audio/LLevame.mp3',
  'audio/PechoFrio.mp3',
  'audio/Sueños.mp3',
  'audio/EnelFondodelBar.mp3',
  'audio/Meditare.mp3',
  'audio/DeReojo.mp3',
  'audio/Toxicar.mp3',
  'audio/LaMaquinadelTiempo.mp3',
  'audio/Loveland.mp3',
  'audio/VendedordeIlusiones.mp3',
  'audio/Rutero.mp3',
  'audio/Portuguesa.mp3',
  'audio/Naufragio.mp3',
  'audio/EsTarde.mp3',
];

let audio;
let currentSongIndex = 0;
let isPaused = true;
let audioPosition = 0;

const playerTitle = document.getElementById('player-title');
const songInfo = document.getElementById('song-info');
const songTitle = document.getElementById('song-title');
const playPauseButton = document.getElementById('playPauseButton');
const playPauseIcon = document.getElementById('playPauseIcon');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');

playPauseButton.addEventListener("click", function () {
  if (isPaused) {
    if (!audio) {
      playerTitle.style.display = 'none';
      songTitle.textContent = songTitles[currentSongIndex];
      songInfo.style.opacity = 1;
      audio = new Audio(audioFiles[currentSongIndex]);
      audio.addEventListener('ended', playNextSong);
    }
    audio.play();
    playPauseIcon.src = "img/pause.svg";
    isPaused = false;
  } else {
    audio.pause();
    playPauseIcon.src = "img/play_circle.svg";
    isPaused = true;
  }
});

previousButton.addEventListener("click", function () {
  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = audioFiles.length - 1;
  }
  updateSongInfo();
  playSong();
});

nextButton.addEventListener("click", function () {
  if (currentSongIndex < audioFiles.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }
  updateSongInfo();
  playSong();
});

function createAudioElements() {
  const audio = new Audio(audioFiles[currentSongIndex]);
  audio.preload = "auto";
  audio.addEventListener('ended', playNextSong);
  return audio;
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
  playSong();
}

const songTitles = [
  '[DESTINO A] 01 - Bailando entre las nubes',
  '[DESTINO A] 02 - El espectador',
  '[DESTINO A] 03 - Robotizado',
  '[DESTINO A] 04 - No pares de brillar',
  '[DESTINO A] 05 - Llevame',
  '[DESTINO A] 06 - Pecho frio',
  '[DESTINO A] 07 - Sueños',
  '[DESTINO A] 08 - En el fondo del bar',
  '[DESTINO B] 01 - Meditare',
  '[DESTINO B] 02 - De reojo',
  '[DESTINO B] 03 - Toxicar',
  '[DESTINO B] 04 - La maquina del tiempo',
  '[DESTINO B] 05 - Loveland',
  '[DESTINO B] 06 - Vendedor de ilusiones',
  '[DESTINO B] 07 - Rutero',
  '[DESTINO B] 08 - Portuguesa',
  '[DESTINO B] 09 - Naufragio',
  '[DESTINO B] 10 - Es tarde',
];

function updateSongInfo() {
  playerTitle.style.display = 'none';
  songTitle.textContent = songTitles[currentSongIndex];
  songInfo.style.opacity = 1;
}

function playSong() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audioPosition = 0;
  }
  audio = createAudioElements();
  updateSongInfo();
  audio.play();
  playPauseIcon.src = "img/pause.svg";
  isPaused = false;
}

const buttons = document.querySelectorAll("#audio-controls button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.add("button-clicked");
    setTimeout(() => {
      button.classList.remove("button-clicked");
    }, 3000);
  });
});


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
    document.addEventListener('DOMContentLoaded', () => {
      const initialTab = document.querySelector('#pestañaShows');
      initialTab.classList.add('active');
      showActiveGallery(initialTab);
    });
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
});


// Barra de navegación en dispositivo móvil
const navbarBoton = document.querySelector('#navbarBoton');
const navbarImg = document.querySelector('#navbarImg');
const navbar = document.querySelector('#navbarResponsive');

navbarBoton.onclick = function () {
  navbar.classList.toggle('open');

  if (navbarImg.src.match('img/menu.svg')) {
    navbarImg.src = 'img/close.svg'
  } else {
    navbarImg.src = 'img/menu.svg'
  }
}





