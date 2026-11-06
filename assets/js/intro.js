/* Intro — tampil 3 detik, fade out, lalu umumkan "portfolio:ready" */
(function () {
  "use strict";
  var SHOW_MS = 3000;
  var FADE_MS = 1000;
  var root = document.documentElement;

  function announceReady() {
    root.classList.remove("is-loading");
    root.classList.add("is-ready");
    document.dispatchEvent(new CustomEvent("portfolio:ready"));
  }

  function init() {
    var intro = document.getElementById("intro-container");
    if (!intro) return announceReady();

    root.classList.add("is-loading");

    function run() {
      setTimeout(function () {
        intro.style.opacity = "0";
        document.body.classList.add("bg-red-theme");
        setTimeout(announceReady, FADE_MS / 2); // animasi hero mulai saat intro memudar
        setTimeout(function () { intro.style.display = "none"; }, FADE_MS);
      }, SHOW_MS);
    }

    if (document.readyState === "complete") run();
    else window.addEventListener("load", run);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
