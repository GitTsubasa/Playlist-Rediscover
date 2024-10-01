let logoElement = document.querySelector("#logo-icon");
console.log(logoElement);
console.dir(document);
const newElement = document.createElement("div");
newElement.innerHTML = "Hello World";
if (logoElement) {
  logoElement.parentNode.replaceChild(newElement, logoElement);
}
