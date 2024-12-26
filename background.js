chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchURL") {
    fetch(message.url)
      .then((response) => response.text())
      .then((data) => sendResponse({ data }))
      .catch((error) => sendResponse({ error: error.message }));
    return true; // Indicates that the response will be sent asynchronously
  }
});
