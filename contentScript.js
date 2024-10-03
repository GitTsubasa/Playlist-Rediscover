// let logoElement = document.querySelector("#logo-icon");
let hiddenElement = document.querySelector(
  "ytd-alert-with-button-renderer yt-formatted-string#text"
);
console.log(hiddenElement);
const newElement = document.createElement("div");
newElement.innerHTML = "Hello World";
if (hiddenElement) {
  hiddenElement.parentNode.replaceChild(newElement, hiddenElement);
}
