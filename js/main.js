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

  /* ============================================
     COUNTDOWN TIMER — 10 minutos
  ============================================ */
  function initCountdown() {
    var display = document.getElementById("countdown-display");
    if (!display) return;

    var DURATION = 10 * 60; // 10 minutos em segundos
    var KEY = "dssonhos_countdown_end";

    // Persiste o tempo final na sessão para não resetar ao rolar
    var endTime = sessionStorage.getItem(KEY);
    if (!endTime) {
      endTime = Date.now() + DURATION * 1000;
      sessionStorage.setItem(KEY, endTime);
    } else {
      endTime = parseInt(endTime, 10);
    }

    function tick() {
      var remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      var mins = Math.floor(remaining / 60);
      var secs = remaining % 60;
      display.textContent = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;

      // Urgência: últimos 60 segundos
      if (remaining <= 60) {
        display.classList.add("urgent");
      } else {
        display.classList.remove("urgent");
      }

      // Ao chegar em zero, reseta
      if (remaining === 0) {
        sessionStorage.removeItem(KEY);
        endTime = Date.now() + DURATION * 1000;
        sessionStorage.setItem(KEY, endTime);
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ============================================
     CARROSSEL — Veja por dentro
  ============================================ */
  function initCarousel() {
    var track    = document.getElementById("carouselTrack");
    var outer    = track && track.parentElement;
    var prevBtn  = document.getElementById("carouselPrev");
    var nextBtn  = document.getElementById("carouselNext");
    var dots     = document.querySelectorAll(".carousel-dot");

    if (!track || !outer) return;

    var slides      = track.querySelectorAll(".carousel-slide");
    var total       = slides.length;
    var current     = 0;
    var autoplayId  = null;
    var isDragging  = false;
    var startX      = 0;
    var startScroll = 0;

    // Calcula offset de um slide (largura + gap)
    function slideWidth() {
      var gap = parseInt(getComputedStyle(track).gap) || 16;
      return slides[0].offsetWidth + gap;
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, total - 1));
      track.style.transform = "translateX(-" + (current * slideWidth()) + "px)";
      dots.forEach(function (d, i) {
        d.classList.toggle("active", i === current);
      });
      if (prevBtn) prevBtn.classList.toggle("hidden", current === 0);
      if (nextBtn) nextBtn.classList.toggle("hidden", current === total - 1);
    }

    // Setas
    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(current - 1); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(current + 1); resetAutoplay(); });

    // Dots
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        goTo(parseInt(dot.dataset.index));
        resetAutoplay();
      });
    });

    // --- Touch / drag (mouse) ---
    function onDragStart(x) {
      isDragging = true;
      startX = x;
      startScroll = current;
      track.style.transition = "none";
      outer.style.cursor = "grabbing";
    }
    function onDragMove(x) {
      if (!isDragging) return;
      var diff = startX - x;
      var tentative = startScroll * slideWidth() + diff;
      var maxOffset = (total - 1) * slideWidth();
      tentative = Math.max(0, Math.min(tentative, maxOffset));
      track.style.transform = "translateX(-" + tentative + "px)";
    }
    function onDragEnd(x) {
      if (!isDragging) return;
      isDragging = false;
      outer.style.cursor = "grab";
      track.style.transition = "";
      var diff = startX - x;
      var threshold = slideWidth() * 0.2;
      if (diff > threshold) goTo(startScroll + 1);
      else if (diff < -threshold) goTo(startScroll - 1);
      else goTo(startScroll);
      resetAutoplay();
    }

    // Mouse
    outer.addEventListener("mousedown", function (e) { onDragStart(e.clientX); });
    window.addEventListener("mousemove", function (e) { if (isDragging) onDragMove(e.clientX); });
    window.addEventListener("mouseup",   function (e) { if (isDragging) onDragEnd(e.clientX); });

    // Touch
    outer.addEventListener("touchstart", function (e) { onDragStart(e.touches[0].clientX); }, { passive: true });
    outer.addEventListener("touchmove",  function (e) { if (isDragging) onDragMove(e.touches[0].clientX); }, { passive: true });
    outer.addEventListener("touchend",   function (e) { if (isDragging) onDragEnd(e.changedTouches[0].clientX); });

    // Pausa ao interagir
    outer.addEventListener("mouseenter", function () { clearInterval(autoplayId); });
    outer.addEventListener("mouseleave", function () { startAutoplay(); });
    outer.addEventListener("touchstart", function () { clearInterval(autoplayId); }, { passive: true });

    // Autoplay lento (6 s), apenas loop suave
    function startAutoplay() {
      clearInterval(autoplayId);
      autoplayId = setInterval(function () {
        goTo(current < total - 1 ? current + 1 : 0);
      }, 6000);
    }
    function resetAutoplay() {
      clearInterval(autoplayId);
      startAutoplay();
    }

    // Init
    goTo(0);
    startAutoplay();

    // Recalcula ao redimensionar
    window.addEventListener("resize", function () { goTo(current); });
  }

  /* ============================================
     LIGHTBOX — clique nas imagens do carrossel
  ============================================ */
  function initLightbox() {
    var overlay  = document.getElementById("lightboxOverlay");
    var lightImg = document.getElementById("lightboxImg");
    var closeBtn = document.getElementById("lightboxClose");
    if (!overlay || !lightImg) return;

    // Abre ao clicar em imagem do carrossel
    document.querySelectorAll(".carousel-slide img").forEach(function (img) {
      img.addEventListener("click", function () {
        lightImg.src = img.src;
        lightImg.alt = img.alt;
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      // Pequeno delay para limpar src e evitar flash na próxima abertura
      setTimeout(function () { lightImg.src = ""; }, 250);
    }

    // Fecha ao clicar no overlay (fora da imagem)
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeLightbox();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    // Fecha com Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initStickyCta();
    initReveal();
    initAccordion();
    initSmoothScroll();
    setFooterYear();
    initCountdown();
    initCarousel();
    initLightbox();
  });
})();

