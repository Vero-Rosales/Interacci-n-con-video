let video;

function setup() {
  createCanvas(640, 480); // Crea el lienzo
  video = createCapture(VIDEO); // Activa la cámara
  video.size(width, height); // Ajusta el tamaño del video al canvas
  video.hide(); // Oculta el elemento de video
}

function draw() {
  background(255); // Fondo blanco
  image(video, 0, 0, width, height); // Muestra el video en el canvas
}
