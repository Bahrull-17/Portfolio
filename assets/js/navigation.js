/* Navigation — menu mobile + highlight menu aktif saat scroll */
(function () {
  "use strict";

  var HIDDEN = ["opacity-0", "invisible", "-translate-y-5", "scale-95"];
  var ACTIVE = ["bg-gradient-to-r", "from-pink-600", "to-red-900", "text-white", "shadow-lg"];
  var INACTIVE = ["text-rose-200", "hover:bg-rose-500/20"];

  function initMobileMenu() {
    var btn = document.getElementById("hamburger");
    var menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;
    var lines = btn.querySelectorAll(".hb-line");

    function isOpen() { return !menu.classList.contains("invisible"); }

    function open() {
      menu.classList.remove.apply(menu.classList, HIDDEN);
      lines[0].style.transform = "translateY(5px) rotate(45deg)";
      lines[1].style.opacity = "0";
      lines[2].style.transform = "translateY(-5px) rotate(-45deg)";
      document.body.classList.add("overflow-hidden");
      btn.setAttribute("aria-expanded", "true");
    }

    function close() {
      menu.classList.add.apply(menu.classList, HIDDEN);
      lines[0].style.transform = "";
      lines[1].style.opacity = "1";
      lines[2].style.transform = "";
      document.body.classList.remove("overflow-hidden");
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      isOpen() ? close() : open();
    });
    menu.querySelectorAll(".mobile-link").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("click", function (e) {
      if (isOpen() && !menu.contains(e.target) && !btn.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen()) close(); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 768 && isOpen()) close(); });
  }

  function initScrollSpy() {
    var sections = document.querySelectorAll("section[id]");
    var items = document.querySelectorAll(".nav-item");
    if (!sections.length || !items.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        items.forEach(function (item) {
          item.classList.remove.apply(item.classList, ACTIVE.concat(INACTIVE));
          var on = item.dataset.nav === id;
          item.classList.add.apply(item.classList, on ? ACTIVE : INACTIVE);
        });
      });
    }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  function init() { initMobileMenu(); initScrollSpy(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
