const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const photobooth = document.querySelector('.photobooth');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(pixels, 0, 0);
  }, 0);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  const data = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'pretty');
  link.innerHTML = `<img src="${data}" alt="pretty Kitty" />`;
  strip.insertBefore(link, strip.firstChild);
}


function Screen(pixels) {
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);