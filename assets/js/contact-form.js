/* Contact form — kirim ke Formspree + notifikasi */
(function () {
  "use strict";

  function init() {
    var form = document.getElementById("contact-form");
    var toast = document.getElementById("form-notification");
    if (!form || !toast) return;

    var BASE = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3000] px-5 py-3.5 rounded-xl text-sm font-medium shadow-lg whitespace-nowrap transition-all duration-300 ease-out";
    var OK = "bg-gradient-to-br from-[#ff4d6d] to-[#7a0c2e] text-white";
    var FAIL = "bg-red-900 border border-red-500/50 text-red-200";
    var timer;

    function notify(message, success) {
      clearTimeout(timer);
      toast.textContent = message;
      toast.className = BASE + " opacity-0 invisible scale-95 " + (success ? OK : FAIL);
      void toast.offsetWidth; // paksa reflow agar fade-in berjalan
      toast.classList.remove("opacity-0", "invisible", "scale-95");
      timer = setTimeout(function () { toast.classList.add("opacity-0", "invisible", "scale-95"); }, 3000);
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = "Sending...";

      try {
        var res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) { notify("✅ Message sent successfully!", true); form.reset(); }
        else notify("❌ Something went wrong. Please try again.", false);
      } catch (err) {
        notify("❌ Network error. Please try again.", false);
      } finally {
        btn.disabled = false;
        btn.innerHTML = label;
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
