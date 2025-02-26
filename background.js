chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "fetchWaybackData") {
    const waybackMachineEndpoint = message.endpoint;
    fetch(waybackMachineEndpoint)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          data.archived_snapshots &&
          data.archived_snapshots.closest
        ) {
          let URL = data.archived_snapshots.closest.url;
          URL = URL.replace("http://", "https://");
          return fetch(URL)
            .then((archivedPageResponse) => archivedPageResponse.text())
            .then((html) => {
              sendResponse({
                success: true,
                data: { closestUrl: URL, archivedPageHtml: html },
              });
            });
        } else {
          sendResponse({
            success: false,
            error: "No archived snapshots found.",
          });
        }
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });

    // Required for async sendResponse
    return true;
  }
});
