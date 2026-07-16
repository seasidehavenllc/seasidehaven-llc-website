/* =========================================================
   MOBILE NAV TOGGLE (Hamburger Menu)
========================================================= */
function toggleMobileNav() {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.toggle("show");
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
