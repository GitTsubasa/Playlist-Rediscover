console.log("Content script loaded");
document.addEventListener("DOMContentLoaded", function () {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        let hiddenElement = document.querySelector(
          "ytd-alert-with-button-renderer"
        );
        if (hiddenElement) {
          const newElement = document.createElement("div");
          newElement.innerHTML = "Hello World";
          hiddenElement.parentNode.replaceChild(newElement, hiddenElement);
          console.log("Replaced hidden element");

          const nodesSnapshot = document.evaluate(
            "//ytd-alert-with-button-renderer",
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
          );
          for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
            console.log(nodesSnapshot.snapshotItem(i).textContent);
          }
          // Stop observing after the target element is found and replaced
          observer.disconnect();
          break;
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  console.log("DOM fully loaded and parsed");
});
