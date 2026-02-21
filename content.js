// console.log(location.href);
let lastPath = location.pathname;
let observer = null;
let observerActive = false;
const overlay = document.createElement("div");

function removeOverlay() {
  if (overlay) overlay.remove();
}

function createWarningOverlay() {
  if (!document.getElementById("shorts-blocker-overlay")) {
    overlay.style.position = "fixed";
    overlay.id = "shorts-blocker-overlay";
    overlay.style.zIndex = "999999";
    overlay.style.width = "50vw";
    overlay.style.height = "50vh";
    overlay.textContent = "Para de assistir shorts e vá fazer algo da vida";
    overlay.style.fontSize = "5rem";
    overlay.style.color = "white";
    overlay.style.backgroundColor = "red";
    document.body.style.overflow = "hidden";
    // console.log("overlay criado");
    document.body.appendChild(overlay);
  }
}

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
  createWarningOverlay();
}

function checkIfUrlIsShorts() {
  if (location.pathname.startsWith("/shorts")) {
    // console.log("você está na aba shorts");
    pauseVideos();
    startObserver();
  } else {
    if (observer) {
      observer.disconnect();
      observerActive = false;
      removeOverlay();
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
  if (!observer) {
    observer = new MutationObserver(() => {
      if (location.pathname.startsWith("/shorts")) {
        createWarningOverlay();
        pauseVideos();
      }
    });
    observerActive = true;
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if (observer && observerActive === false) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    observerActive = true;
  }
}
