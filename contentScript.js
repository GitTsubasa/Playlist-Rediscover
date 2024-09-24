const logoElement = document.querySelector("#guide-spacer");
console.log(logoElement);
console.dir(document);
const newElement = document.createElement("div");
newElement.innerHTML = "<h1>Hello World<h1>";
if (logoElement) {
  document.parentNode.replaceChild(newElement, logoElement);
}
