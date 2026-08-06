const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let siteLenis = null;

function initLenis() {
  if (!window.Lenis || prefersReduced) return;

  siteLenis = new window.Lenis({
    duration: 1.15,
    smoothWheel: true,
    syncTouch: false,
  });

  siteLenis.on("scroll", () => window.ScrollTrigger?.update());

  const raf = (time) => {
    siteLenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
}

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initProductMenu() {
  document.querySelectorAll(".nav-product").forEach((menu) => {
    const trigger = menu.querySelector(".nav-product-trigger");
    const panel = menu.querySelector(".product-menu");
    if (!trigger || !panel) return;

    const close = () => {
      panel.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = !panel.classList.contains("open");
      document.querySelectorAll(".product-menu.open").forEach((otherPanel) => otherPanel.classList.remove("open"));
      document.querySelectorAll(".nav-product-trigger[aria-expanded='true']").forEach((otherTrigger) => otherTrigger.setAttribute("aria-expanded", "false"));
      panel.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", String(open));
    });

    panel.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("click", close);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  });
}

function initEntryPortal() {
  const entry = document.querySelector(".entry-portal");
  const main = document.querySelector("#main");
  if (!entry || !main) return;

  const requestedVariant = new URLSearchParams(window.location.search).get("intro");
  const variant = requestedVariant === "1" ? "1" : "2";
  document.body.classList.toggle("intro-option-1", variant === "1");
  document.body.classList.toggle("intro-option-2", variant === "2");

  const reverseVideo = entry.querySelector(".entry-film--reverse");
  if (prefersReduced && reverseVideo) reverseVideo.pause();

  const updateHeader = () => {
    document.body.classList.toggle("entry-in-view", entry.getBoundingClientRect().bottom > 120);
  };

  const enterSite = () => {
    if (siteLenis) {
      siteLenis.scrollTo(main, { duration: 1.15, offset: 0 });
      return;
    }
    main.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
  };

  entry.querySelectorAll("[data-entry-exit]").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      enterSite();
    });
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", updateHeader);
  updateHeader();

  if (!window.gsap || prefersReduced) return;

  const { gsap } = window;
  if (window.MotionPathPlugin) gsap.registerPlugin(window.MotionPathPlugin);

  if (variant === "1") {
    gsap.to(".entry-film--pulse", {
      scale: 1.08,
      xPercent: -1.4,
      yPercent: -0.6,
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }

  if (variant === "2") {
    const captionLines = gsap.utils.toArray(".entry-caption-line");
    const progressBar = entry.querySelector(".entry-progress span");
    const beats = [
      { start: 0.55, end: 2.5 },
      { start: 2.75, end: 5.4 },
      { start: 5.65, end: 8.25 },
      { start: 8.5, end: 11.5 },
    ];
    const narrative = gsap.timeline({ paused: true });

    captionLines.forEach((line, index) => {
      const beat = beats[index];
      narrative
        .fromTo(
          line,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.52, ease: "power3.out" },
          beat.start,
        )
        .to(line, { autoAlpha: 0, y: -10, duration: 0.42, ease: "power2.in" }, beat.end - 0.42);
    });

    narrative.to({}, { duration: 0.01 }, 11.99);

    const syncNarrative = () => {
      const currentTime = Math.min(reverseVideo.currentTime || 0, 11.99);
      narrative.time(currentTime, false);
      if (progressBar && reverseVideo.duration) {
        gsap.set(progressBar, { scaleX: currentTime / reverseVideo.duration });
      }
    };

    reverseVideo.addEventListener("timeupdate", syncNarrative);
    reverseVideo.addEventListener("seeked", syncNarrative);
    reverseVideo.addEventListener("loadedmetadata", syncNarrative);
    syncNarrative();
    return;
  }

  const progress = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
  progress.fromTo(".entry-progress span", { scaleX: 0 }, { scaleX: 1, duration: 7.2, ease: "none" }, 0);

  const livePath = entry.querySelector(".entry-trace-live");
  const pathLength = livePath?.getTotalLength() || 1600;

  gsap.set(livePath, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });
  gsap.set(".entry-signal", { transformOrigin: "50% 50%" });
  gsap.set(".entry-loss-halo, .entry-loss-core", { opacity: 0, scale: 0.55, transformOrigin: "50% 50%" });

  gsap.to(".entry-scan", {
    opacity: 0.64,
    scale: 1.08,
    duration: 3.4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  progress
    .to(livePath, { strokeDashoffset: 0, duration: 5.8, ease: "power1.inOut" }, 0.35)
    .to(
      ".entry-signal",
      {
        motionPath: {
          path: livePath,
          align: livePath,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 1,
        },
        duration: 5.8,
        ease: "power1.inOut",
      },
      0.35,
    )
    .to(".entry-loss-halo, .entry-loss-core", { opacity: 1, scale: 1, duration: 0.24, ease: "back.out(2)" }, 3.48)
    .to(".entry-loss-halo", { scale: 1.72, opacity: 0, duration: 0.9, ease: "power2.out" }, 3.78)
    .to(".entry-loss-core", { opacity: 0.5, duration: 0.65, yoyo: true, repeat: 1 }, 3.78)
    .to(livePath, { opacity: 0.3, duration: 0.6 }, 6.5);
}

function initGsap() {
  if (!window.gsap || prefersReduced) {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
    return;
  }

  const { gsap } = window;
  const plugins = [window.ScrollTrigger, window.MotionPathPlugin].filter(Boolean);
  if (plugins.length) gsap.registerPlugin(...plugins);

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 28,
      duration: 0.72,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 84%",
      },
    });
  });

  if (document.querySelector(".trace-line")) {
    gsap.to(".trace-line", {
      backgroundPosition: "420px 0",
      duration: 5,
      ease: "none",
      repeat: -1,
      stagger: 0.8,
    });
  }

  if (document.querySelector(".trace-node")) {
    gsap.to(".trace-node", {
      scale: 1.28,
      opacity: 0.58,
      duration: 1.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.35,
    });
  }

  gsap.utils.toArray(".glass-chip, .product-node").forEach((el, index) => {
    gsap.to(el, {
      y: index % 2 === 0 ? -12 : 12,
      duration: 3.6 + index * 0.24,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });

  gsap.utils.toArray(".count-up").forEach((el) => {
    const target = Number(el.dataset.target || 0);
    const decimals = Number(el.dataset.decimals || 0);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 1.35,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        const value = obj.value.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        el.textContent = `${prefix}${value}${suffix}`;
      },
    });
  });

  gsap.utils.toArray(".moving-dot").forEach((dot, index) => {
    const map = dot.closest(".integration-map");
    if (!map) return;
    const angle = index * 70;
    gsap.to(dot, {
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: Math.cos(angle) * 120, y: Math.sin(angle) * 70 },
          { x: Math.cos(angle + 1.4) * 220, y: Math.sin(angle + 1.4) * 120 },
          { x: 0, y: 0 },
        ],
        curviness: 1.4,
      },
      duration: 7 + index,
      ease: "none",
      repeat: -1,
    });
  });

  gsap.utils.toArray(".dashboard-frame, .showcase-screen, .product-dashboard").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, rotateX: 4 },
      {
        y: -12,
        rotateX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      },
    );
  });
}

function initDashboardShowcase() {
  const tabs = [...document.querySelectorAll(".showcase-tab")];
  const images = [...document.querySelectorAll(".showcase-screen img")];
  if (!tabs.length || !images.length) return;

  const setActive = (id) => {
    tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.screen === id)));
    images.forEach((img) => img.classList.toggle("active", img.dataset.screen === id));
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActive(tab.dataset.screen));
  });

  let index = 0;
  window.setInterval(() => {
    if (document.hidden || prefersReduced) return;
    index = (index + 1) % tabs.length;
    setActive(tabs[index].dataset.screen);
  }, 5200);
}

function initTestimonials() {
  const buttons = [...document.querySelectorAll(".testimonial-button")];
  const quote = document.querySelector("[data-quote]");
  const cite = document.querySelector("[data-cite]");
  if (!buttons.length || !quote || !cite) return;

  const data = {
    ewa: {
      quote: "We finally stopped arguing about which shift caused the loss. KiloTrace gave us one shared trail from batch event to cost.",
      cite: "Ewa Zielińska, Quality Director, Novaplast Łódź",
    },
    mateusz: {
      quote: "The first useful dashboard was not another chart. It was the moment finance, process engineering, and the line leader saw the same scrap story.",
      cite: "Mateusz Kowalczyk, Operations Manager, MetalForm Kraków",
    },
    anna: {
      quote: "Supplier conversations changed because we could show material fingerprints, not opinions. That moved recovery work from debate to action.",
      cite: "Anna Wiśniewska, Plant Controller, Vistula Components",
    },
  };

  const setActive = (id) => {
    buttons.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.testimonial === id)));
    if (window.gsap && !prefersReduced) {
      window.gsap.to([quote, cite], {
        opacity: 0,
        y: 8,
        duration: 0.18,
        onComplete: () => {
          quote.textContent = data[id].quote;
          cite.textContent = data[id].cite;
          window.gsap.to([quote, cite], { opacity: 1, y: 0, duration: 0.28 });
        },
      });
    } else {
      quote.textContent = data[id].quote;
      cite.textContent = data[id].cite;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => setActive(button.dataset.testimonial));
  });
}

function initPricing() {
  const toggle = document.querySelector("[data-pricing-toggle]");
  if (!toggle) return;
  const prices = [...document.querySelectorAll("[data-monthly]")];
  toggle.addEventListener("click", () => {
    const annual = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(annual));
    toggle.querySelector("span").textContent = annual ? "Annual pricing shown" : "Monthly pricing shown";
    prices.forEach((price) => {
      price.textContent = annual ? price.dataset.annual : price.dataset.monthly;
    });
  });
}

function initForms() {
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const success = form.querySelector(".form-success");
      if (success) success.classList.add("visible");
      form.reset();
    });
  });

  document.querySelectorAll("form[data-auth-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const success = form.querySelector(".form-success");
      if (success) success.classList.add("visible");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initLenis();
  initEntryPortal();
  initMenu();
  initProductMenu();
  initDashboardShowcase();
  initTestimonials();
  initPricing();
  initForms();
  initGsap();
});
