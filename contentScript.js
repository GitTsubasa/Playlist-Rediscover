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
let processedVideos = new Set(); // Tracking the processed videos

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

  if (state === "waiting-for-button") {
    if (kebabButton) {
      console.log("Found KebabButton");
      kebabButton.click();
      state = "waiting-for-dropdown";
    }
  } else if (state === "waiting-for-dropdown") {
    if (SUVContainer) {
      console.log("Found SUVContainer");
      SUVContainer.click();
      state = "waiting-for-videoselector";
    }
  } else if (state === "waiting-for-videoselector") {
    let videoArray = Array.from(document.querySelectorAll("#video-title"))
      .filter((el) => el.textContent.match(/\[(Deleted Video|Private video)\]/))
      .map((el) => {
        const url = new URL(el.href);
        url.searchParams.delete("list");
        url.searchParams.delete("index");
        url.searchParams.delete("pp");
        return url.toString();
      });
    // videoArray.forEach((el) => {
    //   fetchURL(el);
    // });
    videoArray.forEach((el) => {
      if (!processedVideos.has(el)) {
        processedVideos.add(el);
        fetchURL(el);
      }
      if (videoArray.length > 0 && videoArray.length === processedVideos.size) {
        observer.disconnect();
        console.log("All videos processed, disconnect observer");
      }
    });
  }
}
// https://www.youtube.com/watch?v=LSjB39es2x4&index=7&pp=gAQBiAQB8AUB
// https://www.youtube.com/watch?v=HiQPlqtnm24&index=23&pp=gAQBiAQB8AUB
// https://www.youtube.com/watch?v=3stAaLqFfYY&index=45&pp=gAQBiAQB8AUB

// const fetchURL = async function (hrefs) {
//   const waybackMachineEndpoint = `https://archive.org/wayback/available?url=${hrefs}`;
//   try {
//     const response = await fetch(waybackMachineEndpoint);
//     const data = await response.json();
//     if (data && data.archived_snapshots && data.archived_snapshots.closest) {
//       let URL = data.archived_snapshots.closest.url;
//       URL = URL.replace("http://", "https://");
//       console.log("fetchurl:", URL);
//       const archivedPageResponse = await fetch(URL);
//       const html = await archivedPageResponse.text();
//       console.log("fetchhtml:", html);
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// };

const fetchURL = function (hrefs) {
  const waybackMachineEndpoint = `https://archive.org/wayback/available?url=${hrefs}`;
  chrome.runtime.sendMessage(
    { type: "fetchWaybackData", endpoint: waybackMachineEndpoint },
    (response) => {
      // const { closestUrl, archivedPageHtml } = response.data;
      if (response && response.success) {
        console.log("fetchurl:", response);
      } else {
        console.log("fetchurlerror:", response);
        console.error("Error:", response.error || "Unknown error occurred.");
      }
    }
  );
};

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
