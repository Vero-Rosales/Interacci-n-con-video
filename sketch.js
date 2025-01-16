let poseNet;
let video;
let poses = [];

function setup() {
  createCanvas(640, 480);

  // Crear un elemento de captura de video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Verifica que ml5 está cargado antes de usarlo
  if (typeof ml5 !== "undefined") {
    // Inicializa PoseNet
    poseNet = ml5.poseNet(video, () => console.log("PoseNet cargado"));
    poseNet.on("pose", (results) => {
      poses = results;
    });
  } else {
    console.error("ml5 no está disponible.");
  }
}

function draw() {
  background(255);

  // Muestra el video
  image(video, 0, 0, width, height);

  // Dibuja puntos si se detectan poses
  if (poses.length > 0) {
    let pose = poses[0].pose;
    let rightWrist = pose.rightWrist;

    if (rightWrist.confidence > 0.5) {
      fill(255, 0, 0);
      ellipse(rightWrist.x, rightWrist.y, 20);
    }
  }
}
