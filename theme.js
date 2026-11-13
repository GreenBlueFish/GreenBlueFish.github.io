// theme.js — the light/dark switch. The theme is data-theme on <html>; the
// inline script in each page's <head> sets it before first paint (the saved
// choice, else the system setting). This adds the button that flips it and
// saves the choice. The key is shared with the Library of Alexandria
// (/Information-Library/), so one choice applies to both.
(function () {
  var KEY = "alexandria-theme";
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function saved() {
    try { var t = localStorage.getItem(KEY); return t === "light" || t === "dark" ? t : null; } catch (e) { return null; }
  }
  function system() { return mq && mq.matches ? "dark" : "light"; }
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "theme-toggle";
  function apply(t) {
    root.setAttribute("data-theme", t);
    var dark = t === "dark";
    btn.textContent = dark ? "☀ Light" : "☾ Dark";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
  }
  apply(saved() || system());
  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(next);
  });
  if (mq && mq.addEventListener) mq.addEventListener("change", function () { if (!saved()) apply(system()); });
  document.body.appendChild(btn);
})();
