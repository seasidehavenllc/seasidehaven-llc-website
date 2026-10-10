/* =========================================================
   SEASIDE HAVEN LLC — SITE SCRIPT
========================================================= */
document.documentElement.classList.add("js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Header: solid + compact after scrolling ---------- */
const header = document.querySelector(".site-header");
const callFab = document.querySelector(".call-fab");

function onScroll() {
  const y = window.scrollY;
  if (header) header.classList.toggle("is-scrolled", y > 24);
  if (callFab) callFab.classList.toggle("show", y > 420);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const menuToggle = document.querySelector(".menu-toggle");

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
}
if (menuToggle) {
  menuToggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  document.querySelectorAll(".mobile-menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 920) setMenu(false); });
}

/* ---------- Scroll reveal ---------- */
// Children of [data-stagger] reveal one after another
document.querySelectorAll("[data-stagger]").forEach(group => {
  const step = parseFloat(group.dataset.stagger) || 0.08;
  Array.from(group.children).forEach((child, i) => {
    child.classList.add("reveal");
    child.style.setProperty("--d", (i * step).toFixed(2) + "s");
  });
});

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("in"));
}

/* ---------- "How it works" steps light up in order ---------- */
document.querySelectorAll(".steps").forEach(list => {
  const items = Array.from(list.children);
  const light = () => {
    items.forEach((li, i) => {
      setTimeout(() => {
        li.classList.add("lit");
        list.style.setProperty("--progress", Math.round(((i + 1) / items.length) * 100) + "%");
      }, prefersReducedMotion ? 0 : 250 + i * 320);
    });
  };
  if (!("IntersectionObserver" in window) || prefersReducedMotion) return light();
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { light(); io.disconnect(); }
  }, { threshold: 0.4 });
  io.observe(list);
});

/* ---------- Accordions (FAQ + price lists) ---------- */
document.querySelectorAll(".acc-trigger").forEach(btn => {
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
  });
});

/* ---------- Reviews carousel ---------- */
document.querySelectorAll("[data-track]").forEach(wrap => {
  const track = wrap.querySelector(".reviews-track");
  const prev = wrap.querySelector(".prev");
  const next = wrap.querySelector(".next");
  if (!track) return;
  const move = dir => {
    const card = track.querySelector(".review");
    const amount = card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
    track.scrollBy({ left: dir * amount, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };
  if (prev) prev.addEventListener("click", () => move(-1));
  if (next) next.addEventListener("click", () => move(1));
});

/* ---------- Tabs (contact page) ---------- */
const tabs = Array.from(document.querySelectorAll(".tab"));
function selectTab(id, focus) {
  tabs.forEach(t => {
    const on = t.dataset.tab === id;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute("aria-controls"));
    if (panel) panel.hidden = !on;
    if (on && focus) t.focus();
  });
}
if (tabs.length) {
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => {
      selectTab(t.dataset.tab);
      history.replaceState(null, "", "#" + t.dataset.tab);
    });
    t.addEventListener("keydown", e => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      selectTab(n.dataset.tab, true);
    });
  });
  const fromHash = window.location.hash.replace("#", "");
  if (tabs.some(t => t.dataset.tab === fromHash)) selectTab(fromHash);
}

/* ---------- Careers: "Apply" buttons pre-fill the form ---------- */
document.querySelectorAll("[data-apply]").forEach(btn => {
  btn.addEventListener("click", () => {
    const select = document.getElementById("hirePosition");
    if (select) select.value = btn.dataset.apply;
    const form = document.getElementById("apply");
    if (form) form.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    setTimeout(() => { const n = document.getElementById("hireName"); if (n) n.focus({ preventScroll: true }); }, 600);
  });
});

/* =========================================================
   GET A QUOTE WIZARD
   One real form (#quoteForm) split into 5 steps. It posts to
   FormSubmit, which emails the request (and photos) to you.
========================================================= */
const quoteForm = document.getElementById("quoteForm");
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // FormSubmit limit: 10MB total

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}
function setError(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? "block" : "none";
}
function showStep(step) {
  document.querySelectorAll(".quote-step").forEach(s => { s.hidden = s.id !== "step" + step; });
  document.querySelectorAll(".progress li").forEach((li, i) => {
    li.classList.toggle("done", i + 1 < step);
    li.classList.toggle("current", i + 1 === step);
  });
  const wizard = document.getElementById("quoteWizard");
  if (wizard && step > 1) wizard.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  const first = document.querySelector("#step" + step + " textarea, #step" + step + " input:not([readonly]):not([type=hidden])");
  if (first && step > 1) setTimeout(() => first.focus({ preventScroll: true }), 450);
}
function selectService(service) {
  const field = document.getElementById("selectedService");
  if (!field) return;
  field.value = service;
  showStep(2);
}
function totalUploadSize() {
  let total = 0;
  document.querySelectorAll('#quoteForm input[type="file"]').forEach(input => {
    Array.from(input.files || []).forEach(f => { total += f.size; });
  });
  return total;
}
function photoCount() {
  return Array.from(document.querySelectorAll('#quoteForm input[type="file"]'))
    .reduce((n, input) => n + (input.files ? input.files.length : 0), 0);
}
function fillQuoteReview() {
  const box = document.getElementById("quoteReview");
  if (!box) return;
  const rows = [
    ["Service", val("selectedService")],
    ["Project", val("projectDetails")],
    ["Photos", photoCount() ? photoCount() + " attached" : "None"],
    ["Name", val("quoteFirstName") + " " + val("quoteLastName")],
    ["Address", val("quoteAddress")],
    ["Email", val("quoteEmail")],
    ["Phone", val("quotePhone")]
  ];
  box.innerHTML = "";
  rows.forEach(([k, v]) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = k;
    dd.textContent = v;
    row.append(dt, dd);
    box.appendChild(row);
  });
}
function nextStep(step) {
  if (step === 3) {
    if (val("projectDetails").length < 5) return setError("errorStep2", true);
    setError("errorStep2", false);
  }
  if (step === 4) {
    if (totalUploadSize() > MAX_UPLOAD_BYTES) return setError("errorStep3", true);
    setError("errorStep3", false);
  }
  if (step === 5) {
    const required = ["quoteFirstName", "quoteLastName", "quoteAddress", "quoteEmail", "quotePhone"];
    const email = document.getElementById("quoteEmail");
    if (required.some(id => !val(id)) || (email && !email.checkValidity())) return setError("errorStep4", true);
    setError("errorStep4", false);
    fillQuoteReview();
  }
  showStep(step);
}
function prevStep(step) { showStep(step); }
function submitQuote() {
  if (!quoteForm) return;
  const required = ["selectedService", "projectDetails", "quoteFirstName", "quoteLastName", "quoteAddress", "quoteEmail", "quotePhone"];
  if (required.some(id => !val(id))) return setError("errorStep5", true);
  setError("errorStep5", false);
  const btn = document.getElementById("quoteSubmitBtn");
  if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
  quoteForm.submit();
}

if (quoteForm) {
  // Enter key shouldn't submit the wizard early
  quoteForm.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") e.preventDefault();
  });
  // Pre-select from links like getquote.html?service=Landscaping
  const service = new URLSearchParams(window.location.search).get("service");
  if (["Remodeling", "Landscaping", "Junk Removal"].includes(service)) selectService(service);
}

/* ---------- Address autocomplete (Google Places) ---------- */
function initAddressAutocomplete() {
  const input = document.getElementById("quoteAddress");
  if (!input || typeof google === "undefined" || !google.maps || !google.maps.places) return;
  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["address"],
    componentRestrictions: { country: "us" }
  });
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) input.value = place.formatted_address;
  });
}
window.addEventListener("load", initAddressAutocomplete);

/* ---------- "Thank you" notice after a form is sent (?success=true) ---------- */
(function showSuccess() {
  if (new URLSearchParams(window.location.search).get("success") !== "true") return;
  const main = document.querySelector("main");
  if (!main) return;
  const note = document.createElement("div");
  note.className = "wrap";
  note.innerHTML = '<p class="notice" role="status">Thanks — your message was sent. We\'ll get back to you shortly, usually the same day.</p>';
  const target = main.querySelector(".page-hero") ? main.querySelector(".page-hero").nextElementSibling : main.firstChild;
  main.insertBefore(note, target);
  note.style.paddingTop = "28px";
})();

/* ---------- Footer year ---------- */
document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

/* =========================================================
   GLASS CARD SPOTLIGHT — glow follows the mouse
========================================================= */
if (window.matchMedia("(hover: hover)").matches && !prefersReducedMotion) {
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".glass");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px");
    card.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });
}

/* =========================================================
   PRICING SWITCHER (Home repairs / Landscaping / Junk removal)
========================================================= */
document.querySelectorAll(".switcher").forEach(sw => {
  const buttons = Array.from(sw.querySelectorAll("button[role=tab]"));
  const thumb = sw.querySelector(".thumb");
  const moveThumb = (btn) => {
    if (!thumb || !btn) return;
    thumb.style.width = btn.offsetWidth + "px";
    thumb.style.transform = "translateX(" + btn.offsetLeft + "px)";
  };
  const select = (btn, focus) => {
    buttons.forEach(b => {
      const on = b === btn;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(b.getAttribute("aria-controls"));
      if (panel) {
        panel.hidden = !on;
        if (on) panel.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
      }
    });
    moveThumb(btn);
    if (focus) btn.focus();
  };
  buttons.forEach((b, i) => {
    b.addEventListener("click", () => select(b));
    b.addEventListener("keydown", e => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      select(buttons[(i + (e.key === "ArrowRight" ? 1 : buttons.length - 1)) % buttons.length], true);
    });
  });
  const current = buttons.find(b => b.getAttribute("aria-selected") === "true") || buttons[0];
  moveThumb(current);
  window.addEventListener("resize", () => moveThumb(buttons.find(b => b.getAttribute("aria-selected") === "true")));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveThumb(buttons.find(b => b.getAttribute("aria-selected") === "true")));
});
