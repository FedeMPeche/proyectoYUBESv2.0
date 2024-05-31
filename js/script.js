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

    while (--index && window.scrollY + navbarHeight + 1 < sections[index].offsetTop) {}

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
 const tabShows = document.querySelector('#pestañaShows');

 tabShows.classList.add('active');
});


document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.seccionesCarrusel li');

  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          
          tab.classList.add('active');
      });
  });
});


// document.addEventListener('DOMContentLoaded', () => {
//   const tabs = document.querySelectorAll('.')

// });




