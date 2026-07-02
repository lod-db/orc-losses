/* Light/dark theme handling shared by all prototypes.
 * URL param ?theme= wins (useful for screenshots), then localStorage, then OS preference. */
"use strict";

function detectTheme(defaultTheme) {
  const p = new URLSearchParams(location.search).get("theme");
  if (p === "light" || p === "dark") return p;
  const s = localStorage.getItem("uwl-theme");
  if (s === "light" || s === "dark") return s;
  if (defaultTheme) return defaultTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("uwl-theme", theme);
  document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

function initTheme(defaultTheme) {
  const theme = detectTheme(defaultTheme);
  document.documentElement.dataset.theme = theme;
  return theme;
}

function wireThemeToggle(btn) {
  const sync = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.title = dark ? "Switch to light theme" : "Switch to dark theme";
  };
  btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    sync();
  });
  sync();
}
