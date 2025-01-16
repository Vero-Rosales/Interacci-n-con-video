// Variables globales
let video;
let poseNet;
let poses = [];
let canvas;

function setup() {
  canvas = createCanvas(640, 480);
  canvas.parent('canvas-container'); // Colocar el canvas dentro del contenedor
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Inicializar PoseNet
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', (results) => {
    poses = results;
  });

  // Fondo del lienzo
  background(255);
}

function modelReady() {
  console.log('PoseNet cargado');
}

function draw() {
  // Dibujar el video (opcional, como fondo)
  image(video, 0, 0, width, height);
  noStroke();

  // Dibujar pincel según las poses detectadas
  if (poses.length > 0) {
    let pose = poses[0].pose;
    let rightWrist = pose.rightWrist; // Muñeca derecha

    // Dibujar con la mano derecha
    if (rightWrist.confidence > 0.5) {
      fill(0, 0, 255, 150); // Azul con transparencia
      ellipse(rightWrist.x, rightWrist.y, 15, 15);
    }
  }
}

// Borrar el lienzo con la tecla "C"
function keyPressed() {
  if (key === 'c' || key === 'C') {
    background(255); // Restablecer el lienzo a blanco
  }
}
