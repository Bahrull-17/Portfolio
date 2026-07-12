document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // Element
  // ==============================
  const intro = document.getElementById("intro-container");
  const nav = document.getElementById("main-nav");
  const mainContent = document.getElementById("main-content");

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const hbLines = hamburger.querySelectorAll(".hb-line");
  const menuItems = mobileMenu.querySelectorAll(".menu-item");

  // ==============================
  // Open Mobile Menu
  // ==============================
  function openMenu() {
    mobileMenu.classList.remove("opacity-0", "invisible", "-translate-y-5", "scale-95");
    hbLines[0].style.transform = "translateY(5px)";
    hbLines[1].style.opacity = "0";
    hbLines[2].style.transform = "translateY(-5px) rotate(-45deg)";

    document.body.classList.add("overflow-hidden");
  }

  // ==============================
  // Close Mobile Menu
  // ==============================
  function closeMobileMenu() {
    mobileMenu.classList.add("opacity-0", "invisible", "-translate-y-5", "scale-95");

    document.body.classList.remove("overflow-hidden");

    hbLines[0].style.transform = "";
    hbLines[1].style.opacity = "1";
    hbLines[2].style.transform = "";
  }

  // ==============================
  // Toggle Hamburger
  // ==============================
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();

      if (mobileMenu.classList.contains("invisible")) {
        openMenu();
      } else {
        closeMobileMenu();
      }
    });
  }

  // ==============================
  // Close Button (X)
  // ==============================
  if (closeMenu) {
    closeMenu.addEventListener("click", closeMobileMenu);
  }

  // ==============================
  // Close Menu When Link Clicked
  // ==============================
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // ==============================
  // Close Menu When Click Outside
  // ==============================
  document.addEventListener("click", (e) => {
    if (mobileMenu && hamburger && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");

  const activeClasses = ["bg-gradient-to-r", "from-pink-600", "to-red-900", "text-white", "shadow-lg"];
  const inactiveClasses = ["text-rose-200", "hover:bg-rose-500/20"];

  if (sections.length && navItems.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");

            navItems.forEach((item) => {
              item.classList.remove(...activeClasses, ...inactiveClasses);
              if (item.dataset.nav === id) {
                item.classList.add(...activeClasses);
              } else {
                item.classList.add(...inactiveClasses);
              }
            });
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  const contactForm = document.getElementById("contact-form");
  const notification = document.getElementById("form-notification");

  function showNotification(message, isSuccess) {
    notification.textContent = message;
    notification.className = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3000] px-5 py-3.5 rounded-xl text-sm font-medium shadow-lg whitespace-nowrap transition-all duration-300 ease-out ${
      isSuccess ? "bg-gradient-to-br from-[#ff4d6d] to-[#7a0c2e] text-white" : "bg-red-900 border border-red-500/50 text-red-200"
    }`;
    requestAnimationFrame(() => {
      notification.classList.remove("opacity-0", "invisible", "scale-95");
    });
    setTimeout(() => {
      notification.classList.add("opacity-0", "invisible", "scale-95");
    }, 3000);
  }
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending...";

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          showNotification("✅ Message sent successfully!", true);
          contactForm.reset();
        } else {
          showNotification("❌ Something went wrong. Please try again.", false);
        }
      } catch (error) {
        showNotification("❌ Network error. Please try again.", false);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  const revealLeftEl = document.querySelector(".reveal-left");
  const revealRightEl = document.querySelector(".reveal-right");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === revealLeftEl) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("anim-left");
            entry.target.style.animationDelay = "0s";
          }
          if (entry.target === revealRightEl) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("anim-right");
            entry.target.style.animationDelay = "0.3s";
          }
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  if (revealLeftEl) revealObserver.observe(revealLeftEl);
  if (revealRightEl) revealObserver.observe(revealRightEl);

  // ==============================
  // Intro Animation
  // ==============================
  window.addEventListener("load", () => {
    // Intro tampil selama 3 detik
    setTimeout(() => {
      if (intro) {
        // Fade out intro
        intro.style.opacity = "0";

        // Ganti background body
        document.body.classList.add("bg-red-theme");

        // Setelah fade selesai
        setTimeout(() => {
          intro.style.display = "none";

          // Tampilkan navbar dan konten utama
          if (nav) nav.classList.add("visible");
          if (mainContent) mainContent.classList.add("visible");
        }, 1000);
      }
    }, 3000);
  });
});
