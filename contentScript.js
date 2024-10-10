console.log("Content script loaded");
document.addEventListener("DOMContentLoaded", function () {
  // // let logoElement = document.querySelector("#logo-icon");
  // let hiddenElement = document.querySelector("ytd-alert-with-button-renderer");
  // // console.log(logoElement);
  // const newElement = document.createElement("div");
  // newElement.innerHTML = "Hello World";
  // if (hiddenElement) {
  //   hiddenElement.parentNode.replaceChild(newElement, hiddenElement);
  // }

  // const nodesSnapshot = document.evaluate(
  //   "//ytd-alert-with-button-renderer",
  //   document,
  //   null,
  //   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  //   null
  // );
  // for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
  //   console.log(nodesSnapshot.snapshotItem(i).textContent);
  // }
  console.log("DOM fully loaded and parsed");
});
