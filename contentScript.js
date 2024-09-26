const logoElement = document.querySelector("#guide-spacer");
console.log(logoElement);
console.dir(document);
const newElement = document.createElement("div");
newElement.innerHTML = "Hello World";
if (logoElement) {
  logoElement.parentNode.replaceChild(newElement, logoElement);
}
