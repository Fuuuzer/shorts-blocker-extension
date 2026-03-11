// console.log(location.href);
let lastPath = location.pathname;
let observer = null;
let observerActive = false;
let blockingEnabled = true;
const audioFlash = new Audio(chrome.runtime.getURL("flashAudio.mp3"));
audioFlash.volume = 0.2;

const closeButton = document.createElement("button");
closeButton.addEventListener("click", () => {
  hideOverlay();
});

// function createText() {
//   const text = document.createElement("p");
//   text.textContent = "Você perdeu x minutos assistindo shorts";
//   text.style.color = "white";
//   text.style.fontSize = "4rem";
//   text.style.padding = "2rem";
//   text.style.background = "#c46060";

//   overlay.appendChild(text);
// }

// function createCloseButton() {
//   closeButton.textContent = "✕";
//   closeButton.style.position = "absolute";
//   closeButton.style.top = "0px";
//   closeButton.style.right = "0px";

//   overlay.appendChild(closeButton);
// }

// function showOverlay() {
//   overlay.style.display = "block";
// }

function hideOverlay() {
  if (overlay) overlay.style.display = "none";
  blockingEnabled = false;
  resumeVideos();
}

function createWarningOverlay() {
  const overlay = document.createElement("div");
  // overlay.style.display = "none";
  // if (document.getElementById("shorts-blocker-overlay")) return;

  Object.assign(overlay.style, {
    position: "fixed",
    zIndex: "23423423423",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "white",
  });
  const flashAnimation = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 4000,
    fill: "forwards",
  });
  flashAnimation.onfinish = () => {
    overlay.remove();
  };
  // overlay.id = "shorts-blocker-overlay";
  document.body.appendChild(overlay);
  audioFlash.currentTime = 0;
  audioFlash.play();
  // createText();
  // createCloseButton();
  observerActive = false;
}

// function removeOverlay() {
//   if (overlay) overlay.remove();
// }

function muteVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.muted = true;
  });
}

function pauseVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.pause();
    // console.log("video pausado");
  });

  setTimeout(() => {
    createWarningOverlay();
  }, 1000);

  setTimeout(() => {
    createWarningOverlay();
  }, 3000);
  createWarningOverlay();
}

function resumeVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.play();
  });
}

function checkIfUrlIsShorts() {
  if (location.pathname.startsWith("/shorts") && blockingEnabled) {
    // console.log("você está na aba shorts");
    pauseVideos();
    startObserver();
  } else {
    if (observer) {
      observer.disconnect();
      observerActive = false;
      resumeVideos();
      blockingEnabled = true;
    }
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

function startObserver() {
  const checkContainer = setInterval(() => {
    const containerShortsDiv = document.getElementById("short-video-container");

    if (containerShortsDiv) {
      clearInterval(checkContainer);

      observer = new MutationObserver(() => {
        if (location.pathname.startsWith("/shorts") && blockingEnabled) {
          pauseVideos();
        }
      });
      observer.observe(containerShortsDiv, {
        childList: true,
        subtree: true,
      });
      observerActive = true;
    }
  }, 500);
}
