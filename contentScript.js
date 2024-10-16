console.log("Content script loaded");
// const testElement = document.querySelector("#logo-icon");
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
  const SUVButtonContainer = document.querySelector(
    "yt-list-item-view-model-wiz__label yt-list-item-view-model-wiz__container yt-list-item-view-model-wiz__container--compact yt-list-item-view-model-wiz__container--tappable yt-list-item-view-model-wiz__container--in-popup"
  );
  if (SUVButtonContainer) {
    const SUVSpanContainer = document.querySelector(
      "yt-core-attributed-string yt-list-item-view-model-wiz__title yt-core-attributed-string--white-space-pre-wrap"
    );
    console.log("Found SUVButtonContainer");
    if (SUVSpanContainer) {
      console.log("FoundSUVSpanContainer");
      SUVButtonContainer.click();
    }
  } else {
    console.log("SUVButtonContainer could not be found.");
  }
}

const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      showUnavailableVideos();
      observer.disconnect();
      break;
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
