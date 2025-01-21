let video;
let faceapi;
let detections = [];
let emotion = "Neutral";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Carga el modelo de reconocimiento facial
  const faceOptions = {
    withLandmarks: true,
    withDescriptors: false,
    minConfidence: 0.5,
  };
  faceapi = ml5.faceApi(video, faceOptions, modelReady);
}

function modelReady() {
  console.log("Modelo cargado");
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.error(err);
    return;
  }
  detections = result;

  if (detections && detections.length > 0 && detections[0].expressions) {
    // Analiza la emoción más fuerte
    const emotions = detections[0].expressions;
    emotion = getDominantEmotion(emotions);
  } else {
    emotion = "Neutral"; // Si no hay detecciones o datos, mostrar Neutral
  }

  faceapi.detect(gotResults); // Sigue detectando
}

function getDominantEmotion(emotions) {
  let maxConfidence = 0;
  let dominantEmotion = "Neutral";

  // Agrega un mapeo más descriptivo para las emociones
  const emotionMapping = {
    neutral: "Neutral",
    happy: "Feliz",
    sad: "Triste",
    angry: "Enojado",
    surprised: "Sorprendido",
    disgusted: "Disgustado", // Opcional, dependiendo del modelo
    fearful: "Con miedo", // Opcional
  };

  if (emotions) {
    for (let [key, value] of Object.entries(emotions)) {
      if (value > maxConfidence) {
        maxConfidence = value;
        dominantEmotion = emotionMapping[key] || key; // Usa el mapeo, o la clave original si no existe
      }
    }
  }
  return dominantEmotion;
}

function draw() {
  image(video, 0, 0, width, height);

  // Dibuja el cuadro de texto de emoción
  fill(0, 255, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(emotion, width / 2, height - 40);
}
