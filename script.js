// script.js
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const palette = document.getElementById("palette");
const ctx = canvas.getContext("2d");

// Configurar acceso a la cámara
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.addEventListener("play", () => {
      setInterval(analyzeColors, 1000); // Analiza colores cada segundo
    });
  })
  .catch((err) => {
    console.error("Error al acceder a la cámara: ", err);
  });

// Analiza colores dominantes en la imagen
function analyzeColors() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Obtener datos de píxeles
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const colors = extractColors(imageData.data);
  displayPalette(colors);
}

// Extrae colores dominantes
function extractColors(data) {
  const colorMap = {};
  const step = 4; // Saltar cada 4 valores RGBA

  for (let i = 0; i < data.length; i += step) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const color = `rgb(${r},${g},${b})`;

    if (!colorMap[color]) {
      colorMap[color] = 0;
    }
    colorMap[color]++;
  }

  // Ordenar colores por frecuencia
  const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
  const dominantColors = sortedColors.slice(0, 5).map(([color]) => color);
  return dominantColors;
}

// Muestra la paleta de colores
function displayPalette(colors) {
  palette.innerHTML = ""; // Limpiar la paleta
  colors.forEach((color) => {
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = color;
    palette.appendChild(colorBox);
  });
}
