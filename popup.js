document.addEventListener("DOMContentLoaded", async () => {
  // Get current theme from storage
  let { theme = "light" } = await chrome.storage.sync.get("theme");

  // Get DOM elements
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.querySelector(".theme-label");

  // Set initial states
  document.body.classList.toggle("dark-theme", theme === "dark");
  themeToggle.checked = theme === "dark";
  updateLabel(theme);

  themeToggle.addEventListener("change", async () => {
    // Update theme based on checkbox state
    theme = themeToggle.checked ? "dark" : "light";
    await chrome.storage.sync.set({ theme });

    // Update UI
    document.body.classList.toggle("dark-theme", theme === "dark");
    updateLabel(theme);

    // Notify service worker about theme change
    chrome.runtime.sendMessage({ type: "THEME_CHANGED", theme });
  });
});

function updateLabel(theme) {
  const themeLabel = document.querySelector(".theme-label");
  themeLabel.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
}
