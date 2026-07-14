/* -------------------------------------------------
   Spotlight Glow Effect (Your Original Code)
---------------------------------------------------*/
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".bubble-card").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

/* -------------------------------------------------
   Back To Top Button
---------------------------------------------------*/
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

/* -------------------------------------------------
   Partner Card Click (Already works via HTML)
   But this ensures ANY partner card works.
---------------------------------------------------*/
document.querySelectorAll(".partner-card").forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = "partner.html";
  });
});

/* -------------------------------------------------
   Smooth Section Scrolling for Internal Links
---------------------------------------------------*/
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* -------------------------------------------------
   Sticky Nav Enhancement (Shadow on scroll)
---------------------------------------------------*/
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
  } else {
    header.style.boxShadow = "none";
  }
});
