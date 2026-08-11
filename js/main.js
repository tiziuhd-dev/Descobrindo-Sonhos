// =====================================================
// DESVENDANDO SEUS SONHOS — MAIN JS (mobile-first)
// =====================================================

(function () {
  "use strict";

  /* ============================================
     HEADER — efeito ao rolar
  ============================================ */
  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ============================================
     STICKY MOBILE CTA — esconder no hero e no CTA final
  ============================================ */
  function initStickyCta() {
    const sticky = document.getElementById("sticky-cta");
    const hero = document.getElementById("hero");
    const ctaFinal = document.getElementById("cta-final");
    if (!sticky || !hero) return;

    function handle(entries) {
      entries.forEach(function (entry) {
        if (entry.target === hero) {
          sticky.dataset.heroVisible = entry.isIntersecting ? "1" : "0";
        }
        if (entry.target === ctaFinal) {
          sticky.dataset.finalVisible = entry.isIntersecting ? "1" : "0";
        }
      });
      const hide = sticky.dataset.heroVisible === "1" || sticky.dataset.finalVisible === "1";
      sticky.style.transform = hide ? "translateY(100%)" : "translateY(0)";
    }

    const observer = new IntersectionObserver(handle, { threshold: 0.2 });
    observer.observe(hero);
    if (ctaFinal) observer.observe(ctaFinal);
  }

  /* ============================================
     REVEAL ON SCROLL
  ============================================ */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================
     ACCORDION — FAQ
  ============================================ */
  function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(function (header) {
      header.addEventListener("click", function () {
        const item = header.closest(".accordion-item");
        const wasActive = item.classList.contains("active");

        item.parentElement
          .querySelectorAll(".accordion-item")
          .forEach(function (el) {
            el.classList.remove("active");
          });

        if (!wasActive) {
          item.classList.add("active");
        }
      });
    });
  }

  /* ============================================
     SMOOTH SCROLL para links internos
  ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        const targetId = link.getAttribute("href");
        if (targetId.length > 1) {
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  /* ============================================
     FOOTER YEAR
  ============================================ */
  function setFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initStickyCta();
    initReveal();
    initAccordion();
    initSmoothScroll();
    setFooterYear();
  });
})();
