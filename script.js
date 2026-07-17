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
    },

    kitchen: {
      title: "Kitchen Remodeling",
      intro: "Cabinets, countertops, backsplashes, lighting, and full kitchen transformations.",
      html: `
        <p><strong>Basic Kitchen Refresh:</strong> $4,000–$8,000</p>
        <p><strong>Mid-Level Remodel:</strong> $8,000–$18,000</p>
        <p><strong>Full Custom Remodel:</strong> $18,000–$35,000+</p>
      `
    },

    bathroom: {
      title: "Bathroom Remodeling",
      intro: "Showers, tubs, tile work, vanities, plumbing upgrades, and full bathroom remodels.",
      html: `
        <p><strong>Basic Bathroom:</strong> $3,500–$7,500</p>
        <p><strong>Mid-Level Remodel:</strong> $7,500–$15,000</p>
        <p><strong>Luxury Remodel:</strong> $15,000–$30,000+</p>
      `
    },

    flooring: {
      title: "Flooring Installation",
      intro: "Hardwood, laminate, vinyl plank, tile, and custom flooring installations.",
      html: `
        <p><strong>Laminate:</strong> $2–$4 per sq ft</p>
        <p><strong>Vinyl Plank:</strong> $3–$6 per sq ft</p>
        <p><strong>Hardwood:</strong> $6–$12 per sq ft</p>
        <p><strong>Tile:</strong> $8–$15 per sq ft</p>
      `
    },

    interiorpaint: {
      title: "Interior Painting",
      intro: "Walls, ceilings, trim, doors, accent walls, and full interior repainting.",
      html: `
        <p><strong>Walls:</strong> $1.50–$3.50 per sq ft</p>
        <p><strong>Ceilings:</strong> $1–$2.50 per sq ft</p>
        <p><strong>Trim & Doors:</strong> $25–$75 each</p>
      `
    },

    exteriorpaint: {
      title: "Exterior Painting",
      intro: "Siding, shutters, trim, porches, decks, and full exterior repainting.",
      html: `
        <p><strong>Small Home:</strong> $2,500–$6,000</p>
        <p><strong>Medium Home:</strong> $6,000–$12,000</p>
        <p><strong>Large Home:</strong> $12,000–$20,000+</p>
      `
    },

    exteriorupgrades: {
      title: "Exterior Upgrades",
      intro: "Siding repair, deck restoration, porch rebuilds, and outdoor structural improvements.",
      html: `
        <p><strong>Siding Repair:</strong> $300–$2,500</p>
        <p><strong>Deck Restoration:</strong> $800–$4,000</p>
        <p><strong>Porch Rebuild:</strong> $2,500–$10,000+</p>
      `
    },

    fullreno: {
      title: "Full Renovations",
      intro: "Complete home transformations, structural updates, and full interior/exterior redesigns.",
      html: `
        <p><strong>Interior Renovation:</strong> $15,000–$60,000+</p>
        <p><strong>Exterior Renovation:</strong> $10,000–$50,000+</p>
        <p><strong>Full Home Transformation:</strong> $40,000–$150,000+</p>
      `
    },
    turnover: {
      title: "Rental Turnover Pricing",
      intro: "Full clean, reset, and prep between tenants or guests.",
      html: `
        <p><strong>Basic Turnover:</strong> $75–$150</p>
        <p><strong>Deep Turnover:</strong> $150–$300</p>
        <p><strong>Full Airbnb Reset:</strong> $120–$250</p>
      `
    },

    cleaning: {
      title: "Cleaning Service Pricing",
      intro: "Standard, deep, and move-out cleaning options.",
      html: `
        <p><strong>Standard Clean:</strong> $60–$120</p>
        <p><strong>Deep Clean:</strong> $120–$250</p>
        <p><strong>Move-Out Clean:</strong> $150–$350</p>
      `
    },

    inspection: {
      title: "Property Inspection Pricing",
      intro: "Routine, move-in, and move-out inspections.",
      html: `
        <p><strong>Basic Inspection:</strong> $50–$100</p>
        <p><strong>Move-In/Move-Out:</strong> $75–$150</p>
        <p><strong>Full Report:</strong> $150–$300</p>
      `
    },

    maintenance: {
      title: "Maintenance & Repair Pricing",
      intro: "General repairs, fixes, and rental upkeep.",
      html: `
        <p><strong>Minor Repairs:</strong> $50–$150</p>
        <p><strong>Medium Repairs:</strong> $150–$400</p>
        <p><strong>Major Repairs:</strong> Custom Quote</p>
      `
    },

    airbnb: {
      title: "Airbnb Support Pricing",
      intro: "Guest prep, cleaning, restocking, and hosting assistance.",
      html: `
        <p><strong>Guest Prep:</strong> $40–$100</p>
        <p><strong>Airbnb Cleaning:</strong> $75–$150</p>
        <p><strong>Restocking:</strong> $20–$60</p>
      `
    },
    placement: {
      title: "Machine Placement Pricing",
      intro: "We place machines in offices, stores, and public locations.",
      html: `
        <p><strong>Standard Placement:</strong> $0–$150</p>
        <p><strong>High-Traffic Placement:</strong> $150–$300</p>
        <p><strong>Custom Location Setup:</strong> $300–$600+</p>
      `
    },

    stocking: {
      title: "Product Stocking Pricing",
      intro: "Snacks, drinks, and custom product stocking options.",
      html: `
        <p><strong>Snack Stocking:</strong> $40–$120</p>
        <p><strong>Drink Stocking:</strong> $50–$150</p>
        <p><strong>Full Machine Restock:</strong> $120–$300</p>
      `
    },

    maintenance: {
      title: "Machine Maintenance Pricing",
      intro: "Repairs, cleaning, and machine performance checks.",
      html: `
        <p><strong>Basic Maintenance:</strong> $40–$100</p>
        <p><strong>Repairs:</strong> $75–$250</p>
        <p><strong>Full Service:</strong> $150–$400</p>
      `
    },

    collection: {
      title: "Money Collection Pricing",
      intro: "Secure cash collection and digital sales reporting.",
      html: `
        <p><strong>Standard Collection:</strong> $20–$60</p>
        <p><strong>Digital Sales Report:</strong> $15–$40</p>
        <p><strong>Full Accounting Package:</strong> $60–$150</p>
      `
    },

    custom: {
      title: "Custom Vending Pricing",
      intro: "Specialty machines for snacks, drinks, or unique products.",
      html: `
        <p><strong>Snack Machine:</strong> $1,500–$3,500</p>
        <p><strong>Drink Machine:</strong> $2,000–$4,500</p>
        <p><strong>Specialty Machine:</strong> $3,500–$8,000+</p>
      `
    },
    washfold: {
      title: "Wash & Fold Pricing",
      intro: "Drop-off laundry service with fast turnaround.",
      html: `
        <p><strong>Standard Load:</strong> $1.25–$2.00 per lb</p>
        <p><strong>Large Load:</strong> $2.00–$3.00 per lb</p>
        <p><strong>Express Service:</strong> +$10–$20</p>
      `
    },

    machineRepair: {
      title: "Machine Repair Pricing",
      intro: "Washer and dryer diagnostics, repair, and servicing.",
      html: `
        <p><strong>Diagnostics:</strong> $40–$80</p>
        <p><strong>Minor Repairs:</strong> $75–$150</p>
        <p><strong>Major Repairs:</strong> $150–$400+</p>
      `
    },

    restocking: {
      title: "Restocking Supplies Pricing",
      intro: "Detergent, softener, vending items, and facility supplies.",
      html: `
        <p><strong>Detergent & Softener:</strong> $20–$60</p>
        <p><strong>Vending Items:</strong> $40–$120</p>
        <p><strong>Facility Supplies:</strong> $30–$100</p>
      `
    },

    facilityClean: {
      title: "Facility Cleaning Pricing",
      intro: "Daily, weekly, or deep cleaning for laundromat facilities.",
      html: `
        <p><strong>Daily Cleaning:</strong> $40–$80</p>
        <p><strong>Weekly Cleaning:</strong> $80–$150</p>
        <p><strong>Deep Cleaning:</strong> $150–$300</p>
      `
    },

    management: {
      title: "Facility Management Pricing",
      intro: "Full operational support for laundromat owners.",
      html: `
        <p><strong>Basic Management:</strong> $300–$600/mo</p>
        <p><strong>Full Management:</strong> $600–$1,200/mo</p>
        <p><strong>Custom Operations:</strong> Quote Required</p>
      `
    },
    basicjunk: {
      title: "Basic Junk Removal Pricing",
      intro: "General household junk, bagged trash, and small items.",
      html: `
        <p><strong>Small Load:</strong> $60–$120</p>
        <p><strong>Medium Load:</strong> $120–$250</p>
        <p><strong>Large Load:</strong> $250–$450</p>
      `
    },

    furniture: {
      title: "Furniture Removal Pricing",
      intro: "Couches, mattresses, dressers, tables, and more.",
      html: `
        <p><strong>Single Item:</strong> $40–$80</p>
        <p><strong>Multiple Items:</strong> $80–$200</p>
        <p><strong>Heavy Furniture:</strong> $150–$350</p>
      `
    },

    appliances: {
      title: "Appliance Removal Pricing",
      intro: "Washers, dryers, fridges, stoves, and heavy appliances.",
      html: `
        <p><strong>Standard Appliances:</strong> $60–$120</p>
        <p><strong>Large Appliances:</strong> $120–$250</p>
        <p><strong>Commercial Appliances:</strong> $250–$500+</p>
      `
    },

    yardjunk: {
      title: "Yard Debris Removal Pricing",
      intro: "Branches, brush, storm debris, and outdoor waste.",
      html: `
        <p><strong>Small Pile:</strong> $50–$120</p>
        <p><strong>Medium Pile:</strong> $120–$250</p>
        <p><strong>Large Pile:</strong> $250–$450</p>
      `
    },

    construction: {
      title: "Construction Debris Pricing",
      intro: "Renovation debris, wood, drywall, flooring, and more.",
      html: `
        <p><strong>Small Load:</strong> $80–$150</p>
        <p><strong>Medium Load:</strong> $150–$300</p>
        <p><strong>Large Load:</strong> $300–$600+</p>
      `
    },

    fullcleanout: {
      title: "Full Property Cleanout Pricing",
      intro: "Evictions, foreclosures, hoarder homes, and full cleanouts.",
      html: `
        <p><strong>Small Cleanout:</strong> $250–$600</p>
        <p><strong>Medium Cleanout:</strong> $600–$1,200</p>
        <p><strong>Large Cleanout:</strong> $1,200–$3,000+</p>
      `
    },
    driveway: {
      title: "Driveway Cleaning Pricing",
      intro: "Concrete, asphalt, stains, and full driveway restoration.",
      html: `
        <p><strong>Small Driveway:</strong> $75–$150</p>
        <p><strong>Medium Driveway:</strong> $150–$250</p>
        <p><strong>Large Driveway:</strong> $250–$400+</p>
      `
    },

    siding: {
      title: "House Siding Wash Pricing",
      intro: "Vinyl, brick, wood, and full exterior home washing.",
      html: `
        <p><strong>Single Story:</strong> $150–$300</p>
        <p><strong>Two Story:</strong> $300–$500</p>
        <p><strong>Large Home:</strong> $500–$800+</p>
      `
    },

    deck: {
      title: "Deck & Patio Cleaning Pricing",
      intro: "Wood, composite, concrete, and outdoor living spaces.",
      html: `
        <p><strong>Small Deck/Patio:</strong> $75–$150</p>
        <p><strong>Medium Deck/Patio:</strong> $150–$300</p>
        <p><strong>Large Deck/Patio:</strong> $300–$500+</p>
      `
    },

    roof: {
      title: "Roof Soft Wash Pricing",
      intro: "Safe soft-wash for shingles, metal roofs, and stain removal.",
      html: `
        <p><strong>Small Roof:</strong> $150–$300</p>
        <p><strong>Medium Roof:</strong> $300–$500</p>
        <p><strong>Large Roof:</strong> $500–$800+</p>
      `
    },

    gutter: {
      title: "Gutter Cleaning Pricing",
      intro: "Debris removal, flushing, and exterior gutter brightening.",
      html: `
        <p><strong>Standard Cleaning:</strong> $75–$150</p>
        <p><strong>Gutter Brightening:</strong> $100–$200</p>
        <p><strong>Full Gutter Package:</strong> $150–$300</p>
      `
    },

    commercialpw: {
      title: "Commercial Pressure Washing Pricing",
      intro: "Storefronts, parking lots, walkways, and business exteriors.",
      html: `
        <p><strong>Storefront:</strong> $150–$350</p>
        <p><strong>Parking Lot:</strong> $300–$800+</p>
        <p><strong>Full Exterior:</strong> $500–$1,500+</p>
      `
    }
  };

  title.textContent = pricing[type].title;
  intro.textContent = pricing[type].intro;

  // Add universal "prices may vary" note
  content.innerHTML = pricing[type].html + `
    <p class="price-note">Prices may vary based on project size, materials, and complexity.</p>
  `;
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
    window.location.href = "Pages/partner.html";
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
