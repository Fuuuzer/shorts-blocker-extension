// console.log(location.href);
let lastUrl = location.href;

function checkIfUrlIsShorts() {
  console.log("verificando URL: ", location.href);
}
checkIfUrlIsShorts();

const callback = () => {
  if (lastUrl !== location.href) {
    lastUrl = location.href;
    console.log("URL mudou");
  }
  checkIfUrlIsShorts();
};
const observer = new MutationObserver(callback);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
