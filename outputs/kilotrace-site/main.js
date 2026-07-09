const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  initMenu();
  initProductMenu();
  initDashboardShowcase();
  initTestimonials();
  initPricing();
  initForms();
  initGsap();
});
