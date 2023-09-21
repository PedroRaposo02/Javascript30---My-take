const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// Request access to the user's webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        // Attach the stream to the video element as the source
        video.srcObject = stream;
        video.play();
    })
    .catch(error => console.error('Error accessing webcam:', error));

function drawToCanvas() {
    // Get the width and height of the video element
    const width = video.videoWidth;
    const height = video.videoHeight;

    // Set the canvas width and height to match the video
    canvas.width = width;
    canvas.height = height;

    // Every 16ms, take a frame from the video and draw it to the canvas
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}

function takePhoto() {
    // Play the camera shutter sound
    snap.currentTime = 0;
    snap.play();

    // Get the data from the canvas
    const data = canvas.toDataURL('image/jpeg');
    // Create a link element
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', `handsome`);
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);

}

video.addEventListener('canplay', drawToCanvas);

