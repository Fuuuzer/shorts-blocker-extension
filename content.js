// console.log(location.href);
let lastUrl = location.href;

function checkIfUrlIsShorts() {
  console.log("verificando URL: ", location.href);
}
checkIfUrlIsShorts();

const callback = () => {
  if (lastUrl !== location.href) {
    console.log(location.href);
    checkIfUrlIsShorts();
    if (location.pathname.startsWith("/shorts")) {
      console.log("você está na aba shorts");
    }
    lastUrl = location.href;
  }
};
const observer = new MutationObserver(callback);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
