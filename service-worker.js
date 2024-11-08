// Listen for installation event
chrome.runtime.onInstalled.addListener(() => {
  console.log("Service Worker installed");
  // Set default theme
  chrome.storage.sync.get("theme", (result) => {
    if (!result.theme) {
      chrome.storage.sync.set({ theme: "light" });
    }
  });
});

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "THEME_CHANGED") {
    console.log("Theme changed to:", message.theme);
    // You can add additional theme-related logic here
  }
  return true;
});
