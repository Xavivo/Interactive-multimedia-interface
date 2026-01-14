
// background video loop
const videoFondo = document.getElementById('backgroundVideo');
videoFondo.addEventListener('ended', function() {
    // Definimos el segundo donde se va a empezar el bucle del video
    videoFondo.currentTime = 15; 
    videoFondo.play();
});