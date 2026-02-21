// console.log(location.href);
let lastPath = location.pathname;

function createWarningOverlay() {
  if (!document.getElementById("shorts-blocker-overlay")) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.id = "shorts-blocker-overlay";
    overlay.style.zIndex = "999999";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.textContent = "Para de assistir shorts e vá fazer algo da vida";
    overlay.style.fontSize = "5rem";
    overlay.style.backgroundColor = "red";
    document.body.style.overflow = "hidden";
    // console.log("overlay criado");
    document.body.appendChild(overlay);
  }
}

function pauseVideos() {
  const videos = document.querySelectorAll("video");

  const intervalPauseVideos = setInterval(() => {
    videos.forEach((video) => {
      video.pause();
      // console.log("video pausado");
      if (video.paused) {
        clearInterval(intervalPauseVideos);
      }
    });
  }, 500);
  createWarningOverlay();
}

function checkIfUrlIsShorts() {
  if (location.pathname.startsWith("/shorts")) {
    // console.log("você está na aba shorts");
    pauseVideos();
  }
}
checkIfUrlIsShorts();

document.addEventListener("yt-navigate-finish", () => {
  if (lastPath !== location.pathname) {
    lastPath = location.pathname;
    // console.log("Mudou o path");
    checkIfUrlIsShorts();
  }
});

// const callback = () => {
//   if (lastPath !== location.pathname) {
//     lastPath = location.href;
//     checkIfUrlIsShorts();
//   }
// };
// const observer = new MutationObserver(callback);
// observer.observe(document.body, {
//   childList: true,
//   subtree: true,
// });
