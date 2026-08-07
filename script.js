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
      intro: "Weekly, bi-weekly, or one-time mowing services.",
      html: `
        <p><strong>Small Yard:</strong> $35–$50</p>
        <p><strong>Medium Yard:</strong> $50–$75</p>
        <p><strong>Large Yard:</strong> $75–$120</p>
        <p><strong>XL / 1.5 Acre+:</strong> $120+</p>
      `
    },

    weed: {
      title: "Weed Eating Pricing",
      intro: "Fence lines, ditches, tight spots, and property edges.",
      html: `
        <p><strong>Small Yard:</strong> $15–$20</p>
        <p><strong>Medium Yard:</strong> $25–$35</p>
        <p><strong>Large Yard:</strong> $40–$55</p>
      `
    },

    edging: {
      title: "Edging Pricing",
      intro: "Driveways, sidewalks, patios, and walkways.",
      html: `
        <p><strong>Small Yard:</strong> $10–$15</p>
        <p><strong>Medium Yard:</strong> $20–$25</p>
        <p><strong>Large Yard:</strong> $30–$40</p>
      `
    },

    bush: {
      title: "Bush Trimming Pricing",
      intro: "Shaping, height reduction, and seasonal maintenance.",
      html: `
        <p><strong>Small Yard:</strong> $20–$35</p>
        <p><strong>Medium Yard:</strong> $35–$60</p>
        <p><strong>Large Yard:</strong> $60–$120</p>
        <p><strong>Full Property Trim:</strong> $120–$200</p>
      `
    },

    aeration: {
      title: "Aeration Pricing",
      intro: "Core aeration for lawn health.",
      html: `
        <p><strong>Small Yard:</strong> $85–$110</p>
        <p><strong>Medium Yard:</strong> $140–$170</p>
        <p><strong>Large Yard:</strong> $200–$250</p>
      `
    },

    fertilization: {
      title: "Fertilization Pricing",
      intro: "Seasonal lawn fertilization.",
      html: `
        <p><strong>Small Yard:</strong> $80–$100</p>
        <p><strong>Medium Yard:</strong> $120–$150</p>
        <p><strong>Large Yard:</strong> $150–$200</p>
      `
    },

    overseeding: {
      title: "Overseeding Pricing",
      intro: "Boost lawn thickness and growth.",
      html: `
        <p><strong>Small Yard:</strong> $90–$120</p>
        <p><strong>Medium Yard:</strong> $145–$175</p>
        <p><strong>Large Yard:</strong> $200–$250</p>
      `
    },

    leaf: {
      title: "Leaf Removal Pricing",
      intro: "Seasonal leaf cleanup.",
      html: `
        <p><strong>Regular Yard:</strong> $100–$150</p>
        <p><strong>Medium Yard:</strong> $170–$225</p>
        <p><strong>Large Yard:</strong> $300–$400</p>
      `
    },

    flowerbed: {
      title: "Flower Bed Cleanup Pricing",
      intro: "Bed cleaning, debris removal, and overhaul.",
      html: `
        <p><strong>Light Cleanup:</strong> $100–$125</p>
        <p><strong>Medium Cleanup:</strong> $150–$200</p>
        <p><strong>Heavy Cleanup:</strong> $300–$350</p>
        <p><strong>Bed Overhaul:</strong> $400–$500+</p>
      `
    },

    mulch: {
      title: "Mulch Installation Pricing",
      intro: "Mulch installation and bed refreshing.",
      html: `
        <p><strong>Per Yard Install:</strong> $75–$95</p>
        <p><strong>Full Bed Refresh:</strong> $250–$300</p>
        <p><strong>Premium Mulch Add-on:</strong> $15–$25</p>
      `
    },

    pine: {
      title: "Pine Needle Installation Pricing",
      intro: "Pine needle bedding and refresh.",
      html: `
        <p><strong>Per Bale Install:</strong> $15–$20</p>
        <p><strong>Full Bed Refresh:</strong> $200–$250</p>
      `
    },

    spring: {
      title: "Spring Cleanup Pricing",
      intro: "Seasonal cleanup and debris removal.",
      html: `
        <p><strong>Small Property:</strong> $200–$300</p>
        <p><strong>Medium Property:</strong> $400–$550</p>
        <p><strong>Large Property:</strong> $800–$1,000+</p>
      `
    },

    fall: {
      title: "Fall Cleanup Pricing",
      intro: "Seasonal leaf and debris cleanup.",
      html: `
        <p><strong>Regular Property:</strong> $200–$300</p>
        <p><strong>Medium Property:</strong> $400–$550</p>
        <p><strong>Large Property:</strong> $800–$1,000+</p>
      `
    },

    treetrim: {
      title: "Tree Limb Removal Pricing",
      intro: "Safe removal of small, medium, and large limbs.",
      html: `
        <p><strong>Small Limbs:</strong> $50–$90</p>
        <p><strong>Medium Limbs:</strong> $130–$180</p>
        <p><strong>Large Limbs:</strong> $250–$350+</p>
      `
    },

    treeremoval: {
      title: "Tree Removal Pricing",
      intro: "Safe removal of small, medium, and large trees.",
      html: `
        <p><strong>Small Tree (Under 10ft):</strong> $170–$250</p>
        <p><strong>Medium Tree (10–20ft):</strong> $350–$500</p>
        <p><strong>Large Tree (20–30ft):</strong> $800–$1,200+</p>
        <p><strong>Stump Removal Add-on:</strong> $75–$150</p>
      `
    },

    drywall: {
      title: "Drywall Repair Pricing",
      intro: "Holes, cracks, patches, and wall repairs.",
      html: `
        <p><strong>Small Patch (1–4 in):</strong> $75–$125</p>
        <p><strong>Medium Patch (4–12 in):</strong> $125–$200</p>
        <p><strong>Large Patch (12–24 in):</strong> $200–$350</p>
        <p><strong>Full Section Replacement:</strong> $350–$600</p>
        <p><strong>Texture Match Add‑On:</strong> $50–$100</p>
        <p><strong>Demo Add‑On:</strong> $75–$150</p>
      `
    },

    painting: {
      title: "Painting & Touch-Up Pricing",
      intro: "Walls, trim, doors, and color matching.",
      html: `
        <p><strong>Paint Match + Blend:</strong> $125–$200</p>
        <p><strong>Single Wall Repaint:</strong> $150–$250</p>
        <p><strong>Room Repaint:</strong> $350–$600</p>
        <p><strong>Trim / Baseboards:</strong> $150–$300</p>
        <p><strong>Door Painting:</strong> $75–$150</p>
      `
    },

    flooring: {
      title: "Flooring Installation Pricing",
      intro: "Vinyl, laminate, plank flooring installs.",
      html: `
        <p><strong>Small Room (up to 120 sq ft):</strong> $450–$700</p>
        <p><strong>Medium Room (120–200 sq ft):</strong> $700–$900</p>
        <p><strong>Large Room (200–300 sq ft):</strong> $900–$1,000</p>
        <p><strong>Flooring Demo Add‑On:</strong> $150–$350</p>
      `
    },

    vanity: {
      title: "Vanity Replacement Pricing",
      intro: "Bathroom vanity swap and plumbing reconnection.",
      html: `
        <p><strong>Standard Vanity:</strong> $450–$650</p>
        <p><strong>Double Vanity:</strong> $650–$900</p>
        <p><strong>Plumbing Adjustments:</strong> $75–$150</p>
      `
    },

    lightfixtures: {
      title: "Light Fixture & Fan Pricing",
      intro: "Ceiling lights, fans, and wall fixtures.",
      html: `
        <p><strong>Basic Fixture Swap:</strong> $150–$200</p>
        <p><strong>Ceiling Fan Install:</strong> $200–$350</p>
        <p><strong>Chandelier Install:</strong> $250–$450</p>
        <p><strong>Dimmer Switch Install:</strong> $75–$150</p>
      `
    },

    toilets: {
      title: "Toilet Replacement Pricing",
      intro: "Remove old toilet and install new one.",
      html: `
        <p><strong>Standard Toilet Swap:</strong> $150–$250</p>
        <p><strong>Wax Ring + Seal:</strong> $25–$50</p>
      `
    },

    faucets: {
      title: "Faucet Replacement Pricing",
      intro: "Kitchen, bathroom, and utility faucets.",
      html: `
        <p><strong>Bathroom Faucet:</strong> $125–$200</p>
        <p><strong>Kitchen Faucet:</strong> $150–$250</p>
      `
    },

    doors: {
      title: "Door Replacement Pricing",
      intro: "Interior and exterior door swaps.",
      html: `
        <p><strong>Interior Door:</strong> $150–$300</p>
        <p><strong>Exterior Door:</strong> $300–$600</p>
        <p><strong>Door Trim Replacement:</strong> $100–$200</p>
      `
    },

    trim: {
      title: "Trim & Baseboard Pricing",
      intro: "Install, replace, or repair trim.",
      html: `
        <p><strong>Small Room:</strong> $150–$250</p>
        <p><strong>Medium Room:</strong> $250–$400</p>
        <p><strong>Large Room:</strong> $400–$600</p>
      `
    },

    backsplash: {
      title: "Backsplash Installation Pricing",
      intro: "Kitchen or bathroom backsplash installs.",
      html: `
        <p><strong>Small Area:</strong> $250–$450</p>
        <p><strong>Full Kitchen:</strong> $450–$900</p>
        <p><strong>Tile Demo Add‑On:</strong> $150–$300</p>
      `
    },

    shelving: {
      title: "Shelving & Mounting Pricing",
      intro: "Floating shelves, TV mounts, and wall installs.",
      html: `
        <p><strong>Floating Shelves:</strong> $75–$150</p>
        <p><strong>TV Mount Install:</strong> $125–$200</p>
        <p><strong>Heavy-Duty Mount:</strong> $200–$300</p>
      `
    },

    caulking: {
      title: "Caulking & Sealing Pricing",
      intro: "Bathrooms, kitchens, windows, and trim.",
      html: `
        <p><strong>Bathroom Caulk:</strong> $75–$150</p>
        <p><strong>Window/Trim Caulk:</strong> $100–$200</p>
      `
    },

    demo: {
      title: "Demolition Pricing",
      intro: "Remove old materials before installation.",
      html: `
        <p><strong>Small Demo:</strong> $75–$150</p>
        <p><strong>Medium Demo:</strong> $150–$350</p>
        <p><strong>Large Demo:</strong> $350–$600</p>
      `
    },

    haulaway: {
      title: "Remodeling Haul-Away Pricing",
      intro: "Debris, old materials, and construction waste.",
      html: `
        <p><strong>Small Load:</strong> $75–$150</p>
        <p><strong>Medium Load:</strong> $150–$300</p>
        <p><strong>Large Load:</strong> $300–$500</p>
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
        <p><strong>1–3 Item Pick Up:</strong> $75–$115</p>
        <p><strong>Small Load:</strong> $150–$200</p>
        <p><strong>Medium Load:</strong> $300–$375</p>
      `
    },

    furniture: {
      title: "Furniture Removal Pricing",
      intro: "Couches, mattresses, dressers, tables, and more.",
      html: `
        <p><strong>Furniture Removal:</strong> $125–$200</p>
        <p><strong>Mattress Removal:</strong> $75–$125</p>
      `
    },

    appliances: {
      title: "Appliance Removal Pricing",
      intro: "Washers, dryers, fridges, stoves, and heavy appliances.",
      html: `
        <p><strong>Appliance Removal:</strong> $75–$150</p>
      `
    },

    yardjunk: {
      title: "Yard Debris Removal Pricing",
      intro: "Branches, brush, storm debris, and outdoor waste.",
      html: `
        <p><strong>Yard Waste Load:</strong> $125–$300</p>
      `
    },

    construction: {
      title: "Construction Debris Pricing",
      intro: "Renovation debris, wood, drywall, flooring, and more.",
      html: `
        <p><strong>Construction Debris Load:</strong> $250–$500</p>
      `
    },

    fullcleanout: {
      title: "Full Property Cleanout Pricing",
      intro: "Evictions, foreclosures, hoarder homes, and full cleanouts.",
      html: `
        <p><strong>Full Property Cleanout:</strong> $1,000–$3,500+</p>
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

function selectService(service) {
  document.getElementById('selectedService').value = service;
  nextStep(2);
}

function nextStep(step) {
  // STEP 2 VALIDATION
  if (step === 3) {
    const details = document.getElementById('projectDetails').value.trim();
    if (details.length < 5) {
      document.getElementById('errorStep2').style.display = 'block';
      return;
    }
    document.getElementById('errorStep2').style.display = 'none';
  }

  // STEP 4 VALIDATION
  if (step === 5) {
    const name = document.getElementById('quoteName').value.trim();
    const email = document.getElementById('quoteEmail').value.trim();
    const phone = document.getElementById('quotePhone').value.trim();

    if (!name || !email || !phone) {
      document.getElementById('errorStep4').style.display = 'block';
      return;
    }
    document.getElementById('errorStep4').style.display = 'none';
  }

  // SHOW NEXT STEP
  document.querySelectorAll('.quote-step').forEach(s => s.style.display = 'none');
  document.getElementById('step' + step).style.display = 'block';
}

function prevStep(step) {
  document.querySelectorAll('.quote-step').forEach(s => s.style.display = 'none');
  document.getElementById('step' + step).style.display = 'block';
}

function submitQuote() {
  const service = document.getElementById('selectedService').value.trim();
  const details = document.getElementById('projectDetails').value.trim();
  const name = document.getElementById('quoteName').value.trim();
  const email = document.getElementById('quoteEmail').value.trim();
  const phone = document.getElementById('quotePhone').value.trim();

  if (!service || !details || !name || !email || !phone) {
    document.getElementById('errorStep5').style.display = 'block';
    return;
  }

  document.getElementById('errorStep5').style.display = 'none';

  alert("Your quote request has been submitted!");
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

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.style.display = 'block';
  document.querySelector('.apply-floating').style.display = 'none';
};

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.style.display = 'none';
  document.querySelector('.apply-floating').style.display = 'inline-block';
};

/* =========================================================
   CAREERS — OPEN JOB MODAL WITH PREFILLED POSITION
========================================================= */
function openJobModal(positionName) {
  const modal = document.getElementById('hireModal');
  modal.style.display = 'block';

  // Hide floating apply button
  const applyBtn = document.querySelector('.apply-floating');
  if (applyBtn) applyBtn.style.display = 'none';

  // Prefill the dropdown
  const select = document.getElementById('hirePosition');

  for (let option of select.options) {
    if (option.text === positionName) {
      option.selected = true;
      break;
    }
  }
}

/* =========================================================
   ADDRESS AUTOCOMPLETE (Google Places)
========================================================= */

function initAddressAutocomplete() {
  const input = document.getElementById("quoteAddress");
  if (!input) return;

  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["address"],
    componentRestrictions: { country: "us" }
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      input.value = place.formatted_address;
    }
  });
}

document.addEventListener("DOMContentLoaded", initAddressAutocomplete);

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
   GET QUOTE FORM LOGIC
========================================================= */

function selectService(service) {
  document.getElementById('selectedService').value = service;
  nextStep(2);
}

function nextStep(step) {
  if (step === 3) {
    const details = document.getElementById('projectDetails').value.trim();
    if (details.length < 5) {
      document.getElementById('errorStep2').style.display = 'block';
      return;
    }
    document.getElementById('errorStep2').style.display = 'none';
  }

  if (step === 5) {
    const name = document.getElementById('quoteName').value.trim();
    const email = document.getElementById('quoteEmail').value.trim();
    const phone = document.getElementById('quotePhone').value.trim();

    if (!name || !email || !phone) {
      document.getElementById('errorStep4').style.display = 'block';
      return;
    }
    document.getElementById('errorStep4').style.display = 'none';
  }

  document.querySelectorAll('.quote-step').forEach(s => s.style.display = 'none');
  document.getElementById('step' + step).style.display = 'block';
}

function prevStep(step) {
  document.querySelectorAll('.quote-step').forEach(s => s.style.display = 'none');
  document.getElementById('step' + step).style.display = 'block';
}

function submitQuote() {
  const service = document.getElementById('selectedService').value.trim();
  const details = document.getElementById('projectDetails').value.trim();
  const name = document.getElementById('quoteName').value.trim();
  const email = document.getElementById('quoteEmail').value.trim();
  const phone = document.getElementById('quotePhone').value.trim();

  if (!service || !details || !name || !email || !phone) {
    document.getElementById('errorStep5').style.display = 'block';
    return;
  }

  document.getElementById('errorStep5').style.display = 'none';

  const form = document.getElementById('quoteSendForm');
  form.elements["Service"].value = service;
  form.elements["Details"].value = details;
  form.elements["Name"].value = name;
  form.elements["Email"].value = email;
  form.elements["Phone"].value = phone;

  form.submit();
};

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
