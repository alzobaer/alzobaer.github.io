/* Small, dependency-free enhancements: year, theme toggle, scroll reveal. */
(function () {
  "use strict";

  // current year in footer
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ---- theme toggle (persists in localStorage; respects OS default) ----
  var root = document.documentElement;
  var btn = document.getElementById("themeToggle");
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored) root.setAttribute("data-theme", stored);

  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paint() { if (btn) btn.textContent = isDark() ? "☀️" : "🌙"; }
  paint();

  if (btn) {
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      paint();
    });
  }

  // ---- reveal on scroll ----
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- friendly reminder for unfinished profile links ----
  document.querySelectorAll('a[data-todo]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (a.getAttribute("href") === "#") {
        e.preventDefault();
        alert("Add your " + a.getAttribute("data-todo") +
              " URL in index.html (search for data-todo=\"" +
              a.getAttribute("data-todo") + "\").");
      }
    });
  });
})();
