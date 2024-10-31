console.log("Content script loaded");

// static element tester
// const testElement = document.querySelector("#yt-logo");
// const newElement2 = document.createElement("div");
// newElement2.innerHTML = "hihihi";
// testElement.parentNode.replaceChild(newElement2, testElement);
// if (testElement) {
//   console.log("Found element");
//   testElement.style.backgroundColor = "red";
// }

const targetNode = document.body;
const config = { childList: true, subtree: true };

function showUnavailableVideos() {
  const kebabButton = document.querySelector(
    // "ytd-alert-with-button-renderer"
    ".yt-flexible-actions-view-model-wiz__action--icon-only-button .yt-spec-button-shape-next"
  );
  if (kebabButton) {
    console.log("Found KebabButton");
    kebabButton.click();
    const SUVContainer = document.querySelector(
      ".yt-core-attributed-string.yt-list-item-view-model-wiz__title.yt-core-attributed-string--white-space-pre-wrap"
    );
    if (SUVContainer) {
      console.log("Found SUVContainer");
      // SUVContainer.click();
    }
  } else {
    console.log("KebabButton could not be found.");
  }
}

const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      setTimeout(() => {
        showUnavailableVideos();
        observer.disconnect();
      }, 1000);
      // keep mutationobserver around b/c I want to keep track of the stages of the DOM
      // examine each of the mutation after I click the SUVButton
      // let hiddenElement = document.querySelector(
      // ".yt-flexible-actions-view-model-wiz__action--icon-only-button .yt-spec-button-shape-next"
      // "#yt-logo"
      //   "ytd-alert-with-button-renderer"
      // );
      // if (hiddenElement) {
      //   console.log("Found hidden element");
      // }
      // break;
    }
  }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

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
