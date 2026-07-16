/* =========================================================
   MOBILE NAV TOGGLE (Hamburger Menu)
========================================================= */
function toggleMobileNav() {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.toggle("show");
}

function showPricing(type) {
  const panel = document.getElementById("pricingPanel");
  const title = document.getElementById("pricingTitle");
  const intro = document.getElementById("pricingIntro");
  const content = document.getElementById("pricingContent");

  panel.style.display = "block";

  // Add bubble glow animation
  panel.querySelector(".bubble-card").style.animation = "bubbleGlow 0.4s ease";

  const pricing = {
  mowing: {
    title: "Mowing Pricing",
    intro: "Pricing based on yard size, terrain, and obstacles.",
    html: `
      <p><strong>Small Yard (0.1–0.25 acre):</strong> <span class="price-highlight">$35–$55</span></p>
      <p><strong>Medium Yard (0.25–0.5 acre):</strong> <span class="price-highlight">$55–$75</span></p>
      <p><strong>Large Yard (0.5–1 acre):</strong> <span class="price-highlight">$75–$120</span></p>
      <p><strong>Over 1 acre:</strong> <span class="price-highlight">Custom Quote</span></p>
    `
  },

  weed: {
    title: "Weed Eating Pricing",
    intro: "Fence lines, ditches, tight areas, and property edges.",
    html: `
      <p><strong>Per Linear Foot:</strong> <span class="price-highlight">$0.25–$0.45</span></p>
      <p><strong>Heavy Overgrowth:</strong> <span class="price-highlight">+$10–$25</span></p>
    `
  },

  edging: {
    title: "Edging Pricing",
    intro: "Driveways, sidewalks, patios, and walkways.",
    html: `
      <p><strong>Per Linear Foot:</strong> <span class="price-highlight">$0.35–$0.60</span></p>
      <p><strong>Full Property Edge:</strong> <span class="price-highlight">$25–$60</span></p>
    `
  },

  bush: {
    title: "Bush Trimming Pricing",
    intro: "Shaping, height reduction, and seasonal trimming.",
    html: `
      <p><strong>Small Bushes:</strong> <span class="price-highlight">$5–$12</span></p>
      <p><strong>Medium Bushes:</strong> <span class="price-highlight">$12–$20</span></p>
      <p><strong>Large Bushes:</strong> <span class="price-highlight">$20–$40</span></p>
    `
  },

  treetrim: {
    title: "Tree Trimming Pricing",
    intro: "Branch removal, canopy shaping, and safety trimming.",
    html: `
      <p><strong>Small Trees (under 15ft):</strong> <span class="price-highlight">$75–$150</span></p>
      <p><strong>Medium Trees (15–30ft):</strong> <span class="price-highlight">$150–$350</span></p>
      <p><strong>Large Trees (30–50ft):</strong> <span class="price-highlight">$350–$800</span></p>
    `
  },

  treeremoval: {
    title: "Tree Removal Pricing",
    intro: "Safe removal of small, medium, and large trees.",
    html: `
      <p><strong>Small Trees (under 15ft):</strong> <span class="price-highlight">$150–$300</span></p>
      <p><strong>Medium Trees (15–30ft):</strong> <span class="price-highlight">$300–$700</span></p>
      <p><strong>Large Trees (30–50ft):</strong> <span class="price-highlight">$700–$1500+</span></p>
    `
  }
};

  title.textContent = pricing[type].title;
  intro.textContent = pricing[type].intro;
  content.innerHTML = pricing[type].html;
}

/* =========================================================
   SPOTLIGHT GLOW EFFECT
   (Mouse‑tracking illumination on .bubble-card)
========================================================= */
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".bubble-card").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

/* =========================================================
   BACK TO TOP BUTTON
========================================================= */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =========================================================
   PARTNER CARD CLICK
========================================================= */
document.querySelectorAll(".partner-card").forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = "partner.html";
  });
});

/* =========================================================
   SMOOTH SCROLLING FOR INTERNAL LINKS
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =========================================================
   STICKY NAV SHADOW ON SCROLL
========================================================= */
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
  } else {
    header.style.boxShadow = "none";
  }
});

/* =========================================================
   DYNAMIC TESTIMONIALS
========================================================= */
const testimonialContainer = document.getElementById("testimonialContainer");
const testimonialCards = Array.from(testimonialContainer.children);
const filterButtons = document.querySelectorAll(".filter-btn");

function showCards(cards) {
  testimonialContainer.innerHTML = "";
  cards.forEach(card => testimonialContainer.appendChild(card));
}

function pickRandom(cards, count) {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    if (filter === "all") {
      showCards(pickRandom(testimonialCards, 3));
    } else {
      const filtered = testimonialCards.filter(card => card.dataset.category === filter);
      showCards(filtered);
    }
  });
});

showCards(pickRandom(testimonialCards, 3));
