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

let state = "waiting-for-button";
console.log(document.querySelectorAll('span[role="text"]'));

function showUnavailableVideos() {
  const kebabButton = document.querySelector(
    // this selector does not work because it's very specific and subject to change in a dynamic element
    // ".yt-flexible-actions-view-model-wiz__action--icon-only-button .yt-spec-button-shape-next"
    `button[aria-label="More actions"]`
  );
  // Get all elements with the specified selector and find the one with the matching text
  // by converting into array and finding the specific text
  const SUVContainer = Array.from(
    // ".yt-core-attributed-string.yt-list-item-view-model-wiz__title.yt-core-attributed-string--white-space-pre-wrap"
    document.querySelectorAll('span[role="text"]')
  ).find((el) => el.textContent.includes("Show unavailable videos"));
  // const playlistVideos = Array.from(
  //   document.querySelectorAll("ytd-playlist-video-renderer")
  // ).find((el) => el.textContent.includes("[Deleted Video]"));
  const playlistVideos = document.querySelectorAll(
    "ytd-playlist-video-renderer"
  );

  // Loop through each video and check if it contains "[Deleted video]"
  playlistVideos.forEach((video) => {
    const titleElement = video.querySelector("#video-title");

    // Check if the title text includes "[Deleted video]"
    if (titleElement && titleElement.textContent.includes("[Deleted video]")) {
      console.log("Deleted video found:", titleElement.href);
    }
  });
  if (state === "waiting-for-button") {
    if (kebabButton) {
      console.log("Found KebabButton");
      kebabButton.click();
      state = "waiting-for-dropdown";
      console.log(state);
    }
  } else if (state === "waiting-for-dropdown") {
    console.log("hi");
    if (SUVContainer) {
      console.log("Found SUVContainer");
      SUVContainer.click();
      state = "waiting-for-videoselector";
    }
  } else if (state === "waiting-for-videoselector") {
    if (playlistVideos) {
      console.log("Found playlistVideos");
      state = "waiting for something";
    }
  }
}

const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      showUnavailableVideos();
      // observer.disconnect();
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
