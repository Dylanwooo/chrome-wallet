document.addEventListener("DOMContentLoaded", async () => {
  // Get current theme from storage
  const { theme = "light" } = await chrome.storage.sync.get("theme");
  document.body.classList.toggle("dark-theme", theme === "dark");

  // Handle theme toggle
  const themeToggle = document.querySelector(".theme-toggle");
  themeToggle.textContent = `Switch to ${
    theme === "light" ? "Dark" : "Light"
  } Theme`;

  themeToggle.addEventListener("click", async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    await chrome.storage.sync.set({ theme: newTheme });
    document.body.classList.toggle("dark-theme");
    themeToggle.textContent = `Switch to ${
      newTheme === "light" ? "Dark" : "Light"
    } Theme`;

    // Notify service worker about theme change
    chrome.runtime.sendMessage({ type: "THEME_CHANGED", theme: newTheme });
  });
});
