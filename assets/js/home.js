(() => {
  if (window.location.hostname === "cys1102.github.io") {
    window.location.replace("https://yunsungchung.github.io" + window.location.pathname + window.location.search + window.location.hash);
    return;
  }

  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let preference = "system";
  try {
    preference = localStorage.getItem("theme") || "system";
  } catch {
    // Color controls still work when browser storage is unavailable.
  }
  const applyTheme = () => {
    const dark = preference === "dark" || (preference !== "light" && systemTheme.matches);
    root.dataset.theme = dark ? "dark" : "light";
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  };
  applyTheme();
  systemTheme.addEventListener("change", applyTheme);

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    toggle.hidden = false;
    applyTheme();
    toggle.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", preference);
      } catch {
        // The choice remains active for this page without persistence.
      }
      applyTheme();
    });
  });
})();
