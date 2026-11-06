/* Scroll reveal — elemen [data-reveal] bergerak masuk saat di-scroll (laptop, tablet, HP).
   Mulai setelah intro selesai. Elemen yang muncul bersamaan diberi jeda bertahap (stagger). */
(function () {
  "use strict";
  var root = document.documentElement;

  function init() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!els.length || !("IntersectionObserver" in window)) return; // tanpa dukungan: semua tetap tampil

    root.classList.add("reveal-on");
    var started = false;

    function start() {
      if (started) return;
      started = true;

      var observer = new IntersectionObserver(function (entries) {
        entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return a.target.compareDocumentPosition(b.target) & 4 ? -1 : 1; })
          .forEach(function (entry, i) {
            var el = entry.target;
            var custom = el.getAttribute("data-reveal-delay");
            var delay = custom !== null ? parseFloat(custom) : Math.min(i * 0.1, 0.5);
            el.style.setProperty("--reveal-delay", delay + "s");
            el.classList.add("is-visible");
            observer.unobserve(el);
          });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      els.forEach(function (el) { observer.observe(el); });
    }

    if (root.classList.contains("is-ready")) start();
    else {
      document.addEventListener("portfolio:ready", start, { once: true });
      setTimeout(start, 8000); // pengaman: konten tidak pernah tersembunyi selamanya
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
