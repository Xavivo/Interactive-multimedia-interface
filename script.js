// background video loop
const videoFondo = document.getElementById('backgroundVideo');
videoFondo.addEventListener('ended', function() {
    // definimos el segundo donde se va a empezar el bucle del video
    videoFondo.currentTime = 16; 
    videoFondo.play();
});

// Array con los mensajes que van a ir alternando en pantalla (los puntos suspensivos al ser animados se añaden con CSS)
const loadingMessages = [
    "JOINING SERVER",
    "PREPARING ASSETS",
    "ESTABLISHING CONNECTION",
    "LOADING TEXTURES",
    "RENDERING CHUNKS"
];

// Array de Canciones
const songs = [
    "audio/cancion1.mp3",
    "audio/cancion2.mp3",
    "audio/cancion3.mp3"
];

const textElement = document.getElementById('loadingText');
const audioPlayer = document.getElementById('musicPlayer');
const volDisplay = document.getElementById('volActual');
const muteStatus = document.getElementById('muteStatus');

// variable de estado para la cancion actual
let currentSongIndex = 0;


// cambiar texto cada cierto tiempo
let mensajeIndex = 0;
setInterval(() => {
    mensajeIndex = (mensajeIndex + 1) % loadingMessages.length; // ciclo infinito
    textElement.textContent = loadingMessages[mensajeIndex]; 
}, 5000); // cambia cada 5 segundos

// función que vamos a llamar para cargar una canción aleatoria
function playRandomSong() {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadAndPlaySong();
}

function loadAndPlaySong() {
    audioPlayer.src = songs[currentSongIndex];
    audioPlayer.volume = 0.5; // empezar al 50% siempre
    audioPlayer.play().catch(error => {
        console.log("debes interactuar con la página para reproducir audio"); // IMPORTANTE: los navegadores bloquean la reproducción automática de audio sin antes haber interactuado con la página
    });
}

function changeSong(direction) {
    if (direction === 'next') {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    } else {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    loadAndPlaySong();
}

// control de Volumen
function updateVolume(change) {
    let newVolume = audioPlayer.volume + change;
    // limitamos entre 0 y 1
    if (newVolume > 1) newVolume = 1;
    if (newVolume < 0) newVolume = 0;
    
    audioPlayer.volume = newVolume;
    volDisplay.textContent = Math.round(newVolume * 100) + "%";
}

// mute/unmute
function toggleMute() {
    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        muteStatus.textContent = "MUTEAR";
        console.log("desmuteado");
    } else {
        audioPlayer.muted = true;
        muteStatus.textContent = "DESMUTEAR";
        console.log("muteado");
    }
}

// cargar canción aleatoria de las 5 que hay al inicio
window.onload = playRandomSong;

// lógica de los botones de volumen y cambio de canción
document.getElementById('volUp').addEventListener('click', () => updateVolume(0.1));
document.getElementById('volDown').addEventListener('click', () => updateVolume(-0.1));
document.getElementById('btnNext').addEventListener('click', () => changeSong('next'));
document.getElementById('btnPrev').addEventListener('click', () => changeSong('prev'));

// teclado
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Para que la página no haga scroll hacia abajo con el espacio
        toggleMute();
    } else if (event.code === 'ArrowRight') {
        changeSong('next');
    } else if (event.code === 'ArrowLeft') {
        changeSong('prev');
    }
});