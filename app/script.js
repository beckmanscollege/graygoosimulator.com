let lastImageIndex = -1; // Initialize with an index that won't match any valid index
let lastItemShown = ""; // Initialize with an empty string

const gridContainer = document.getElementById("pixelGrid");
const gridSize = 40;
let pixelsToTurnGray = 1;
const canvas = document.getElementById('canvas');
const bildButton = document.getElementById('bildButton');

for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);
  }
}

function colorPixels() {
  for (let i = 0; i < pixelsToTurnGray; i++) {
    const randomGridItem = getRandomGridItem();
    randomGridItem.style.backgroundColor = "gray";
  }

  pixelsToTurnGray *= 2;
}

function resetColors() {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach(item => {
    item.style.backgroundColor = ""; // Clear background color
  });

  pixelsToTurnGray = 1; // Reset pixelsToTurnGray
}

function getRandomGridItem() {
  const randomRowIndex = Math.floor(Math.random() * gridSize);
  const randomColIndex = Math.floor(Math.random() * gridSize);
  return gridContainer.children[randomRowIndex * gridSize + randomColIndex];
}

var refreshButton = document.getElementById("refreshButton");

refreshButton.onclick = function () {
  reload();
  resetColors();
};






let imageIndex = 0; // Start with the first image
const images = [
    "https://cdn.glitch.global/0cbf2b2c-b551-4c52-a321-0864339ea682/Bergbild.png?v=1707139526449",
    "https://cdn.glitch.global/0cbf2b2c-b551-4c52-a321-0864339ea682/solenS.png?v=1707139530138",
    "https://cdn.glitch.global/0cbf2b2c-b551-4c52-a321-0864339ea682/flod.png?v=1707140320285",
];
const cont = document.getElementById("bg");
const webcamContainer = document.getElementById("webcam");

var refreshButton = document.getElementById("refreshButton");

refreshButton.onclick = function () {
  reload();
  resetColors();
};

document.addEventListener("DOMContentLoaded", function () {
  reload();
});

function captureImagesWithDelay(video, canvas, pixelHeight, pixelWidth, numberOfCaptures) {
    function captureImageAndScheduleNext() {
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        pixelate(canvas, pixelHeight, pixelWidth);

        if (numberOfCaptures > 1) {
            numberOfCaptures--;
            setTimeout(captureImageAndScheduleNext, 1000); // 500 milliseconds (0.5 seconds) delay
        }
    }

    captureImageAndScheduleNext(); // Start the capturing process
}


refreshButton.addEventListener('click', function() {
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('canvas');
    const pixelHeight = 32;
    const pixelWidth = 50;
    const numberOfCaptures = Infinity;

    captureImagesWithDelay(video, canvas, pixelHeight, pixelWidth, numberOfCaptures);
});



function pixelate(canvas, pixelHeight, pixelWidth) {
    const ctx = canvas.getContext('2d');
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, originalWidth, originalHeight, 0, 0, pixelWidth, pixelHeight);
    ctx.drawImage(canvas, 0, 0, pixelWidth, pixelHeight, 0, 0, originalWidth, originalHeight);
}

refreshButton.addEventListener('click', function() {
    if (!'webcam'.paused) { // Only start capturing if the video is not paused
        captureImagesWithDelay('webcam', canvas, 'pixelHeight', 'pixelWidth', 'numberOfCaptures');
    }
});

function reload() {
    const showWebcam = imageIndex === images.length;
    
    if (showWebcam) {
        cont.style.display = "none"; // Hide the image container
        webcamContainer.style.display = "block"; // Show the webcam container

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(function (stream) {
                    webcamContainer.srcObject = stream;
                    webcamContainer.play();
                    
                    // Take a picture and pixelate it
                    const canvas = document.getElementById('canvas');
                    canvas.getContext('2d').drawImage(webcamContainer, 0, 0, canvas.width, canvas.height);
                    pixelate(canvas, 10);
                })
                .catch(function (error) {
                    console.error("Error accessing webcam:", error);
                });
        } else {
            console.error("getUserMedia is not supported");
        }
    } else {
        cont.style.display = "block"; // Show the image container
        webcamContainer.style.display = "none"; // Hide the webcam container

        cont.src = images[imageIndex];
        imageIndex = (imageIndex + 1) % images.length;
    }
    imageIndex = (imageIndex + 1) % (images.length + 1);
}

function changeColor() {
    var button = document.getElementById('colorButton');
    
    // Change button color
    button.style.backgroundColor = 'rgb(40, 60, 260)';
    
    // Revert back to original color after 0.1 second (100 milliseconds)
    setTimeout(function() {
        button.style.backgroundColor = 'rgb(70, 90, 290)';
    }, 100);
}

function changeBolor() {
    var button = document.getElementById('refreshButton');
    
    // Change button color
    button.style.backgroundColor = 'rgb(40, 60, 260)';
    
    // Revert back to original color after 0.1 second (100 milliseconds)
    setTimeout(function() {
        button.style.backgroundColor = 'rgb(70, 90, 290)';
    }, 100);
}