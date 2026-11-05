/* =========================================================
   SEASIDE HAVEN — BOOKING ASSISTANT
   A free, built-in chat helper. It answers common questions
   from the info below and books appointment *requests*, which
   are emailed to you (via FormSubmit) so you can confirm.
   No AI service, no monthly fees.

   To change answers: edit the DATA block or the replies in
   answer() below. Prices come from your price lists.
========================================================= */
(function () {
  "use strict";

  const DATA = {"prices":[{"service":"Remodeling","name":"Drywall repair","from":"$75","rows":[["Small Patch (1–4 in)","$75–$125"],["Medium Patch (4–12 in)","$125–$200"],["Large Patch (12–24 in)","$200–$350"],["Full Section Replacement","$350–$600"],["Texture Match Add‑On","$75–$100"],["Demo Add‑On","$100–$150"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Painting","from":"$125","rows":[["Paint Match + Blend","$125–$200"],["Single Wall Repaint","$150–$250"],["Room Repaint","$350–$600"],["Trim / Baseboards","$150–$300"],["Door Painting","$100–$150"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Flooring","from":"$450","rows":[["Small Room (up to 120 sq ft)","$450–$700"],["Medium Room (120–200 sq ft)","$700–$900"],["Large Room (200–300 sq ft)","$900–$1,000"],["Flooring Demo Add‑On","$150–$350"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Vanity replacement","from":"$450","rows":[["Standard Vanity","$450–$650"],["Double Vanity","$650–$900"],["Plumbing Adjustments","$75–$150"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Light fixtures & fans","from":"$75","rows":[["Basic Fixture Swap","$200–$250"],["Ceiling Fan Install","$200–$350"],["Chandelier Install","$250–$450"],["Dimmer Switch Install","$75–$150"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Toilet replacement","from":"$150","rows":[["Standard Toilet Swap","$150–$250"],["Wax Ring + Seal","$25–$50"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Faucet replacement","from":"$125","rows":[["Bathroom Faucet","$125–$200"],["Kitchen Faucet","$150–$250"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Door replacement","from":"$150","rows":[["Interior Door","$150–$300"],["Exterior Door","$300–$600"],["Door Trim Replacement","$100–$200"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Trim & baseboards","from":"$150","rows":[["Small Room","$150–$250"],["Medium Room","$250–$400"],["Large Room","$400–$600"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Backsplash installation","from":"$250","rows":[["Small Area","$250–$450"],["Full Kitchen","$450–$900"],["Tile Demo Add‑On","$150–$300"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Shelving & mounting","from":"$75","rows":[["Floating Shelves","$75–$150"],["TV Mount Install","$125–$200"],["Heavy-Duty Mount","$200–$300"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Caulking & sealing","from":"$75","rows":[["Bathroom Caulk","$75–$150"],["Window/Trim Caulk","$100–$200"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Demolition","from":"$75","rows":[["Small Demo","$75–$150"],["Medium Demo","$150–$350"],["Large Demo","$350–$600"]],"page":"Pages/remodeling.html"},{"service":"Remodeling","name":"Haul-away","from":"$75","rows":[["Small Load","$75–$150"],["Medium Load","$150–$300"],["Large Load","$300–$500"]],"page":"Pages/remodeling.html"},{"service":"Landscaping","name":"Mowing","from":"$35","rows":[["Small Yard","$35–$50"],["Medium Yard","$50–$75"],["Large Yard","$75–$120"],["XL / 1.5 Acre+","$120+"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Weed eating","from":"$15","rows":[["Small Yard","$15–$20"],["Medium Yard","$25–$35"],["Large Yard","$40–$55"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Edging","from":"$10","rows":[["Small Yard","$10–$15"],["Medium Yard","$20–$25"],["Large Yard","$30–$40"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Bush trimming","from":"$20","rows":[["Small Yard","$20–$35"],["Medium Yard","$35–$60"],["Large Yard","$60–$120"],["Full Property Trim","$120–$200"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Aeration","from":"$85","rows":[["Small Yard","$85–$110"],["Medium Yard","$140–$170"],["Large Yard","$200–$250"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Fertilization","from":"$80","rows":[["Small Yard","$80–$100"],["Medium Yard","$120–$150"],["Large Yard","$150–$200"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Overseeding","from":"$90","rows":[["Small Yard","$90–$120"],["Medium Yard","$145–$175"],["Large Yard","$200–$250"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Leaf removal","from":"$100","rows":[["Regular Yard","$100–$150"],["Medium Yard","$170–$225"],["Large Yard","$300–$400"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Flower bed cleanup","from":"$100","rows":[["Light Cleanup","$100–$125"],["Medium Cleanup","$150–$200"],["Heavy Cleanup","$300–$350"],["Bed Overhaul","$400–$500+"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Mulch installation","from":"$75","rows":[["Per Yard Install","$75–$95"],["Full Bed Refresh","$250–$300"],["Premium Mulch Add-on","$15–$25"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Pine needle installation","from":"$15","rows":[["Per Bale Install","$15–$20"],["Full Bed Refresh","$200–$250"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Spring cleanup","from":"$200","rows":[["Small Property","$200–$300"],["Medium Property","$400–$550"],["Large Property","$800–$1,000+"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Fall cleanup","from":"$200","rows":[["Regular Property","$200–$300"],["Medium Property","$400–$550"],["Large Property","$800–$1,000+"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Tree limb removal","from":"$50","rows":[["Small Limbs","$50–$90"],["Medium Limbs","$130–$180"],["Large Limbs","$250–$350+"]],"page":"Pages/landscaping.html"},{"service":"Landscaping","name":"Tree removal","from":"$170","rows":[["Small Tree (Under 10ft)","$170–$250"],["Medium Tree (10–20ft)","$350–$500"],["Large Tree (20–30ft)","$800–$1,200+"],["Stump Removal Add-on","$75–$150"]],"page":"Pages/landscaping.html"},{"service":"Junk Removal","name":"Basic junk removal","from":"$75","rows":[["1–3 Item Pick Up","$75–$115"],["Small Load","$150–$200"],["Medium Load","$300–$375"],["Large Load","$500–$575"]],"page":"Pages/junkremoval.html"},{"service":"Junk Removal","name":"Furniture removal","from":"$125","rows":[["Furniture Removal","$125–$200"],["Mattress Removal","$75–$125"]],"page":"Pages/junkremoval.html"},{"service":"Junk Removal","name":"Appliance removal","from":"$70","rows":[["Appliance Removal","$70–$150"]],"page":"Pages/junkremoval.html"},{"service":"Junk Removal","name":"Yard debris removal","from":"$125","rows":[["Yard Waste Load","$125–$300"]],"page":"Pages/junkremoval.html"},{"service":"Junk Removal","name":"Construction debris","from":"$250","rows":[["Construction Debris Load","$250–$475"]],"page":"Pages/junkremoval.html"},{"service":"Junk Removal","name":"Full property cleanouts","from":"$1,150","rows":[["Full Property Cleanout","$1,150–$3,500+"]],"page":"Pages/junkremoval.html"}],"faqs":[{"q":"What areas do you serve?","a":"Lynchburg, Roanoke, Bedford, Smith Mountain Lake, Moneta, Goodview, and the surrounding areas. Not sure if you’re in range? Call or send us a message and we’ll confirm."},{"q":"How fast can I get a quote?","a":"Most quotes go out the same day or within 24 hours, depending on the service. Photos help us price it faster."},{"q":"Do you offer same-day service?","a":"Sometimes — it depends on the job and our schedule that day. Call us and we’ll tell you the soonest opening."},{"q":"Do you offer recurring lawn care?","a":"Yes. Mowing and lawn care can be scheduled weekly or bi-weekly, plus seasonal spring and fall cleanups."},{"q":"Do you offer emergency services?","a":"We have limited emergency availability for urgent repairs, property issues, and safety concerns."},{"q":"What payment methods do you accept?","a":"Cash, card, digital payments, and business invoicing, depending on the service."},{"q":"Do you require deposits?","a":"Online bookings take a small deposit to hold your time. Right after you book, we email you a secure Square link to pay it, and it comes off your final bill. Quotes are always free."},{"q":"Can I book online?","a":"Yes. Tap “Book a visit” and our chat assistant shows real open times. Pick one and you’re booked on our calendar right away, with an email confirmation. You can also request a written quote or call us."},{"q":"Are your services insured?","a":"Yes — Seaside Haven LLC is fully insured for all services we provide."},{"q":"Can I cancel or reschedule?","a":"Yes. Please call or text us at least 24 hours ahead to cancel or move your visit without a fee."},{"q":"Are quotes free?","a":"Yes, quotes are always free. Most go out the same day or within 24 hours, and photos help us price it faster."},{"q":"Do you clean up after the job?","a":"Yes. We can haul away debris, old fixtures, and junk from the job. Haul-away is listed with our prices."}],"towns":["Lynchburg","Roanoke","Bedford","Smith Mountain Lake","Moneta","Goodview"]};
  const PHONE = "(434) 233-0231";
  const TEL = "tel:+14342330231";
  const SEND_TO = "https://formsubmit.co/ajax/info@seasidehavenllc.com";
  // Square booking worker (see worker/README.md). While this is empty the chat
  // sends booking *requests* by email; once set, it shows real open times from
  // Square and books them straight onto the Square calendar.
  const BOOKING_API = "https://seaside-booking.onrender.com";
  const SQUARE_CATEGORY = { "Remodeling": "Remodeling Services", "Landscaping": "Landscape Services", "Junk Removal": "Junk Removal" };
  const SERVICES = ["Remodeling", "Landscaping", "Junk Removal"];
  const SERVICE_LABEL = { "Remodeling": "Home repairs", "Landscaping": "Lawn & landscaping", "Junk Removal": "Junk removal" };
  const inPages = location.pathname.includes("/Pages/");
  const link = (p) => (inPages ? p.replace("Pages/", "") : p);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Build the widget ---------- */
  const logo = (inPages ? "../" : "") + "Images/logo.png";
  const root = document.createElement("div");
  root.className = "chat-root";
  root.innerHTML = `
    <button class="chat-launcher" type="button" aria-expanded="false" aria-controls="chatPanel">
      <span class="chat-launcher-dot" aria-hidden="true"></span>
      <svg class="icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32 0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9-1.9 24.5-11.4 46.3-21.4 62.9-5.5 9.2-11.1 16.6-15.2 21.6-2.1 2.5-3.7 4.4-4.9 5.7-.6.6-1 1.1-1.3 1.4l-.3.3c-4.6 4.6-5.9 11.4-3.4 17.4s8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3 22.9-10 42.4-21.9 54.3-30.6 31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1-64 0z"/></svg>
      <span class="chat-launcher-label">Book a visit</span>
    </button>
    <section class="chat-panel" id="chatPanel" role="dialog" aria-label="Seaside Haven booking assistant" hidden>
      <header class="chat-head">
        <span class="chat-avatar"><img src="${logo}" alt=""></span>
        <span class="chat-title"><strong>Seaside Haven</strong><span><i></i>Booking assistant · replies instantly</span></span>
        <button class="chat-icon-btn chat-restart" type="button" aria-label="Start over" title="Start over">
          <svg class="icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6C373.1 55.5 317.5 32 256 32 132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8 14.1-10.6 17-30.7 6.4-44.8s-30.7-17-44.8-6.4C324.9 405.7 291.9 416 256 416c-88.4 0-160-71.6-160-160S167.6 96 256 96c44.2 0 84.2 17.9 113.1 46.9L327 185c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 226 344 226h119.5z"/></svg>
        </button>
        <button class="chat-icon-btn chat-close" type="button" aria-label="Close chat">
          <svg class="icon" viewBox="0 0 384 512" aria-hidden="true"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>
      </header>
      <div class="chat-log" role="log" aria-live="polite" aria-relevant="additions"></div>
      <div class="chat-chips" aria-label="Suggested replies"></div>
      <form class="chat-form" autocomplete="on">
        <label class="sr-only" for="chatInput">Type a message</label>
        <input class="chat-hp" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true">
        <input id="chatInput" class="chat-input" type="text" placeholder="Type a message…" maxlength="600" autocomplete="off">
        <button class="chat-send" type="submit" aria-label="Send">
          <svg class="icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480v-83.6c0-4 1.5-7.8 4.2-10.8l167.6-182.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3.3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
        </button>
      </form>
      <p class="chat-foot">Requests are confirmed by our team · <a href="${TEL}">${PHONE}</a></p>
    </section>`;
  document.body.appendChild(root);

  const launcher = root.querySelector(".chat-launcher");
  const panel = root.querySelector(".chat-panel");
  const log = root.querySelector(".chat-log");
  const chips = root.querySelector(".chat-chips");
  const form = root.querySelector(".chat-form");
  const input = root.querySelector(".chat-input");

  /* ---------- State ---------- */
  let started = false;
  let flow = null;          // "book" | "question" | null
  let step = null;          // current question in a flow
  let booking = {};
  let busy = false;
  let question = {};

  /* ---------- Remember the conversation across pages ---------- */
  const SAVE_KEY = "sh-chat";
  let chipData = [];
  function save() {
    try {
      const copy = log.cloneNode(true);
      copy.querySelectorAll(".typing").forEach((n) => n.remove());
      sessionStorage.setItem(SAVE_KEY, JSON.stringify({
        log: copy.innerHTML, chips: chipData, flow, step, booking, question, open: !panel.hidden,
      }));
    } catch (e) { /* storage unavailable — chat just starts fresh */ }
  }
  function clearSaved() { try { sessionStorage.removeItem(SAVE_KEY); } catch (e) {} }

  /* ---------- Open / close ---------- */
  function open(mode, service) {
    panel.hidden = false;
    save();
    requestAnimationFrame(() => root.classList.add("open"));
    launcher.setAttribute("aria-expanded", "true");
    if (!started) { started = true; if (mode !== "book") greet(); }
    if (mode === "book") startBooking(service);
    setTimeout(() => input.focus({ preventScroll: true }), reduced ? 0 : 250);
  }
  function close() {
    root.classList.remove("open");
    launcher.setAttribute("aria-expanded", "false");
    setTimeout(() => { panel.hidden = true; save(); }, reduced ? 0 : 260);
    launcher.focus({ preventScroll: true });
  }
  launcher.addEventListener("click", () => (panel.hidden ? open() : close()));
  root.querySelector(".chat-close").addEventListener("click", close);
  root.querySelector(".chat-restart").addEventListener("click", () => {
    log.innerHTML = ""; flow = null; step = null; booking = {}; clearSaved(); greet();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) close(); });

  // Any element with data-chat opens the assistant:
  //   data-chat="open"            -> just open
  //   data-chat="book"            -> start booking
  //   data-chat="book:Landscaping"-> start booking with a service picked
  document.addEventListener("click", (e) => {
    const t = e.target.closest && e.target.closest("[data-chat]");
    if (!t || root.contains(t)) return;
    e.preventDefault();
    const [mode, service] = t.getAttribute("data-chat").split(":");
    if (!panel.hidden && mode === "book") return startBooking(service);
    open(mode, service);
  });

  /* ---------- Message helpers ---------- */
  function scroll() { log.scrollTo({ top: log.scrollHeight, behavior: reduced ? "auto" : "smooth" }); }

  function addMsg(who, html, isHTML) {
    const row = document.createElement("div");
    row.className = "chat-msg " + who;
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    if (isHTML) bubble.innerHTML = html; else bubble.textContent = html;
    row.appendChild(bubble);
    log.appendChild(row);
    scroll();
    save();
    return bubble;
  }

  // Bot says one or more messages with a short "typing" pause
  function say(parts, chipList) {
    parts = Array.isArray(parts) ? parts : [parts];
    setChips([]);
    busy = true;
    let i = 0;
    const next = () => {
      if (i >= parts.length) { busy = false; setChips(chipList || []); return; }
      const typing = document.createElement("div");
      typing.className = "chat-msg bot typing";
      typing.innerHTML = '<div class="chat-bubble"><span></span><span></span><span></span></div>';
      log.appendChild(typing); scroll();
      const text = parts[i++];
      const delay = reduced ? 0 : Math.min(900, 380 + String(text).length * 6);
      setTimeout(() => { typing.remove(); addMsg("bot", text, true); next(); }, delay);
    };
    next();
  }

  function setChips(list) {
    chipData = list;
    save();
    chips.innerHTML = "";
    list.forEach((c) => {
      const el = c.href ? document.createElement("a") : document.createElement("button");
      el.className = "chat-chip" + (c.primary ? " primary" : "");
      el.textContent = c.label;
      if (c.href) { el.href = c.href; if (/^https?:/.test(c.href)) { el.target = "_blank"; el.rel = "noopener"; } } else { el.type = "button"; el.addEventListener("click", () => userSays(c.label, c.value)); }
      chips.appendChild(el);
    });
  }

  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = "";
    userSays(text);
  });

  function userSays(label, value) {
    if (busy) return;
    addMsg("user", label);
    handle(value !== undefined ? value : label);
  }

  /* ---------- Menus ---------- */
  const MENU = [
    { label: "Book a visit", value: "#book", primary: true },
    { label: "See prices", value: "#prices" },
    { label: "Service area", value: "#area" },
    { label: "Hours & contact", value: "#hours" },
  ];
  function greet() {
    flow = null; step = null;
    say(["Hi! 👋 I’m the Seaside Haven assistant.",
         "I can book a visit for you, share our prices, or answer quick questions. What can I help with?"], MENU);
  }
  function anythingElse() {
    return [{ label: "Book a visit", value: "#book", primary: true }, { label: "See prices", value: "#prices" }, { label: "Something else", value: "#menu" }];
  }

  /* ---------- Router ---------- */
  function handle(text) {
    if (flow === "book") return bookingStep(text);
    if (flow === "question") return questionStep(text);
    if (text === "#menu") return greet();
    if (text === "#book") return startBooking();
    if (text === "#prices") return say("Which service would you like prices for?", SERVICES.map((s) => ({ label: SERVICE_LABEL[s], value: "#prices:" + s })));
    if (text.startsWith("#prices:")) return servicePrices(text.split(":")[1]);
    if (text.startsWith("#bookas:")) return startBooking(text.split(":")[1]);
    if (text === "#area") return answerArea();
    if (text === "#hours") return answerHours();
    if (text === "#ask") return startQuestion();
    return answer(text);
  }

  /* ---------- Free-text answers ---------- */
  const has = (t, words) => words.some((w) => t.includes(w));

  function answer(raw) {
    const t = " " + raw.toLowerCase().replace(/[^a-z0-9$ ]/g, " ") + " ";
    const priceHit = findPrice(t);
    const service = detectService(t);

    if (has(t, ["pressure wash", "power wash", "vending", "laundromat", "laundry", "airbnb", "rental turnover", "rental propert"])) return say("That service is coming soon — it isn’t booking yet. I can pass your interest along to the team so they let you know when it launches.", [{ label: "Let me know", value: "#ask", primary: true }, { label: "Main menu", value: "#menu" }]);
    if (has(t, [" book", "schedule", "appointment", " appt", "come out", "come by", "set up a", "availability", "available"])) return startBooking(service);
    if (has(t, [" hi ", " hey ", "hello", "good morning", "good afternoon", "good evening"]) && t.trim().split(" ").length <= 4) return say("Hi there! What can I help you with today?", MENU);
    if (has(t, ["thank", " thx", "appreciate"])) return say("You’re welcome! Anything else I can help with?", anythingElse());
    if (has(t, ["price", "pricing", "cost", " how much", " $", " rate ", " rates ", "charge", "estimate", "quote"]) || priceHit) {
      if (priceHit) return showPrice(priceHit);
      if (service) return servicePrices(service);
      if (has(t, ["quote", "estimate"])) return say(["We give free quotes — most go out the same day or within 24 hours.", `You can <a href="${link("Pages/getquote.html")}">request a written quote</a> with photos, or book a visit right here.`], anythingElse());
      return handle("#prices");
    }
    if (has(t, ["hour", " open", "close", "closed", "sunday", "saturday", "weekend", "what time"])) return answerHours();
    if (has(t, ["area", "serve", "service ", "travel", " far ", " near ", "location", "where"]) || DATA.towns.some((x) => t.includes(x.toLowerCase())) || has(t, ["forest", "salem", "vinton", "huddleston", "hardy", "rocky mount", "appomattox", "altavista"])) return answerArea(t);
    if (has(t, ["insur", "licens", "bonded"])) return faq("insured");
    if (has(t, ["pay", "card", "cash", "venmo", "zelle", "invoice", "check "])) return faq("payment");
    if (has(t, ["deposit", "upfront payment", "down payment", "pay ahead", "pay first"])) return faq("deposit");
    if (has(t, ["cancel", "reschedul", "move my", "change my appointment", "change my booking"])) return faq("cancel");
    if (has(t, ["free quote", "free estimate", "charge for a quote", "charge for quote", "cost for a quote"])) return faq("quotes free");
    if (has(t, ["clean up", "cleanup after", "mess", "haul away the", "take the old", "dispose", "disposal"])) return faq("clean up");
    if (has(t, ["book online", "online booking", "how do i book", "how to book"])) return faq("book online");
    if (has(t, ["emergency", "urgent", "asap", "right now", "leak", "flood", "storm"])) return say(["For anything urgent, calling is fastest — we have limited emergency availability.", `<a href="${TEL}">Call ${PHONE}</a>`], [{ label: "Call now", href: TEL, primary: true }, { label: "Book a visit", value: "#book" }]);
    if (has(t, ["same day", "today", "tomorrow", "how soon", "how fast", "quick"])) return say(["Same-day service is sometimes possible, depending on the job and our schedule.", "Want me to set up a request? Pick “Today” or the soonest day and we’ll confirm what we can do."], anythingElse());
    if (has(t, ["recurring", "weekly", "bi weekly", "biweekly", "every week", "regular"])) return say("Yes! Mowing and lawn care can be scheduled weekly or bi-weekly, plus seasonal spring and fall cleanups.", [{ label: "Book lawn care", value: "#bookas:Landscaping", primary: true }, { label: "Lawn prices", value: "#prices:Landscaping" }]);
    if (has(t, ["job", "hiring", "career", "apply", "work for", "employment"])) return say(`We’re hiring! See open positions and apply on our <a href="${link("Pages/careers.html")}">careers page</a>.`, anythingElse());
    if (has(t, ["human", "person", "someone", "real ", "call", "phone", "talk", "speak", "number", "email", "contact"])) return answerHours();
    if (service) return say(`Sure — ${SERVICE_LABEL[service].toLowerCase()} is one of our main services. Want prices, or should I set up a visit?`, [{ label: "Book a visit", value: "#bookas:" + service, primary: true }, { label: "See prices", value: "#prices:" + service }]);
    const near = closestFaq(t.trim());
    if (near) return say([near.a, `More answers are on our <a href="${link("Pages/faq.html")}">FAQ page</a>.`], anythingElse());

    return say(["Hmm, I’m not sure about that one.", "I can send your question to our team and someone will get back to you — usually the same day."],
      [{ label: "Send my question", value: "#ask", primary: true }, { label: "Call instead", href: TEL }, { label: "Main menu", value: "#menu" }]);
  }

  function faq(kind) {
    const f = DATA.faqs.find((x) => x.q.toLowerCase().includes(kind));
    return say(f ? f.a : "Good question — call us and we’ll explain.", anythingElse());
  }
  // Last try before "I'm not sure": the FAQ whose question shares the most words with theirs
  const STOP = new Set("a an and are can do does for from how i if in is it me my of on or our the to we what when where which who why will with you your".split(" "));
  function closestFaq(t) {
    const words = t.split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
    let best = null, score = 0;
    for (const f of DATA.faqs) {
      const qw = f.q.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
      const n = words.filter((w) => qw.some((q) => q.startsWith(w.slice(0, 5)) || w.startsWith(q.slice(0, 5)))).length;
      if (n > score) { best = f; score = n; }
    }
    return score >= 1 && words.length <= 12 ? best : null;
  }

  function answerHours() {
    say(["We’re open <b>Mon–Fri 8am–4pm</b> and <b>Saturday 9am–3pm</b>. Closed Sundays.",
         `Call or text <a href="${TEL}">${PHONE}</a> or email <a href="mailto:info@seasidehavenllc.com">info@seasidehavenllc.com</a>.`],
        [{ label: "Call now", href: TEL }, { label: "Book a visit", value: "#book", primary: true }, { label: "Main menu", value: "#menu" }]);
  }

  function answerArea(t) {
    const known = t && DATA.towns.find((x) => t.includes(x.toLowerCase()));
    const lead = known ? `Yes — we serve ${known}! ` : "";
    say([`${lead}We serve <b>${DATA.towns.join(", ")}</b> and the surrounding areas.`,
         "If you’re a little outside that, just ask — we often travel a bit farther."], anythingElse());
  }

  /* ---------- Prices ---------- */
  const ALIASES = {
    "mow": "Mowing", "lawn": "Mowing", "grass": "Mowing", "cut": "Mowing",
    "weed": "Weed eating", "edg": "Edging", "bush": "Bush trimming", "hedge": "Bush trimming", "shrub": "Bush trimming",
    "aerat": "Aeration", "fertil": "Fertilization", "overseed": "Overseeding", "seed": "Overseeding", "leaf": "Leaf removal", "leaves": "Leaf removal",
    "flower bed": "Flower bed cleanup", "mulch": "Mulch installation", "pine": "Pine needle installation",
    "spring": "Spring cleanup", "fall clean": "Fall cleanup", "limb": "Tree limb removal", "branch": "Tree limb removal", "tree trim": "Tree limb removal", "tree": "Tree removal", "stump": "Tree removal",
    "drywall": "Drywall repair", "hole": "Drywall repair", "sheetrock": "Drywall repair", "paint": "Painting",
    "floor": "Flooring", "vinyl": "Flooring", "laminate": "Flooring", "vanity": "Vanity replacement", "sink": "Vanity replacement",
    "light": "Light fixtures & fans", "fan": "Light fixtures & fans", "chandelier": "Light fixtures & fans", "dimmer": "Light fixtures & fans",
    "toilet": "Toilet replacement", "faucet": "Faucet replacement", "door": "Door replacement", "trim": "Trim & baseboards", "baseboard": "Trim & baseboards",
    "backsplash": "Backsplash installation", "tile": "Backsplash installation", "shel": "Shelving & mounting", "tv": "Shelving & mounting", "mount": "Shelving & mounting",
    "caulk": "Caulking & sealing", "seal": "Caulking & sealing", "demo": "Demolition",
    "couch": "Furniture removal", "sofa": "Furniture removal", "mattress": "Furniture removal", "furniture": "Furniture removal", "dresser": "Furniture removal",
    "appliance": "Appliance removal", "fridge": "Appliance removal", "refrigerator": "Appliance removal", "washer": "Appliance removal", "dryer": "Appliance removal", "stove": "Appliance removal",
    "yard debris": "Yard debris removal", "brush": "Yard debris removal", "construction": "Construction debris", "renovation": "Construction debris",
    "cleanout": "Full property cleanouts", "clean out": "Full property cleanouts", "estate": "Full property cleanouts", "hoard": "Full property cleanouts", "eviction": "Full property cleanouts",
    "junk": "Basic junk removal", "trash": "Basic junk removal", "haul": "Basic junk removal",
  };
  function findPrice(t) {
    for (const key in ALIASES) {
      if (t.includes(" " + key)) return DATA.prices.find((p) => p.name === ALIASES[key]);
    }
    return null;
  }
  function detectService(t) {
    if (has(t, ["landscap", "lawn", "yard work", "mow", "mulch", "garden"])) return "Landscaping";
    if (has(t, ["junk", "haul", "remov", "cleanout", "dump", "trash"])) return "Junk Removal";
    if (has(t, ["remodel", "repair", "handyman", "fix", "install", "renovat", "paint", "drywall"])) return "Remodeling";
    return null;
  }
  function showPrice(p) {
    const rows = p.rows.map(([l, v]) => `<li><span>${esc(l)}</span><b>${esc(v)}</b></li>`).join("");
    say([`<b>${esc(p.name)}</b> starts at <b>${esc(p.from)}</b>:<ul class="chat-prices">${rows}</ul>`,
         "Exact prices depend on size and access — you’ll approve the price before any work starts. Want to book it?"],
        [{ label: "Book this", value: "#bookas:" + p.service, primary: true }, { label: "Other prices", value: "#prices:" + p.service }, { label: "Main menu", value: "#menu" }]);
  }
  function servicePrices(service) {
    const items = DATA.prices.filter((p) => p.service === service);
    const rows = items.map((p) => `<li><span>${esc(p.name)}</span><b>from ${esc(p.from)}</b></li>`).join("");
    const page = items[0] ? items[0].page : "Pages/services.html";
    say([`Here are our ${SERVICE_LABEL[service].toLowerCase()} starting prices:<ul class="chat-prices">${rows}</ul>`,
         `Ask me about any one for the full range, or see the <a href="${link(page)}">full price list</a>.`],
        [{ label: "Book " + SERVICE_LABEL[service].toLowerCase(), value: "#bookas:" + service, primary: true }, { label: "Main menu", value: "#menu" }]);
  }

  /* ---------- Booking flow ---------- */
  // With BOOKING_API set:  service → which service → which option → details → address
  //                        → real open day → real open time → name → phone → email → book in Square
  // Without it (or if Square can't be reached): the same questions, but day/time are
  // preferences and the request is emailed for us to confirm.

  function api(path, body) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 60000); // allows for the free server waking up
    return fetch(BOOKING_API.replace(/\/$/, "") + path, {
      method: body ? "POST" : "GET",
      headers: body ? { "Content-Type": "application/json" } : {},
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    }).then((r) => r.json().then((j) => {
      if (!r.ok) { const e = new Error(j.error || "HTTP " + r.status); e.field = j.field; throw e; }
      return j;
    }))
      .finally(() => clearTimeout(timer));
  }

  // The free booking server sleeps when idle. Nudge it awake as soon as a page
  // loads so it's ready by the time a customer gets to picking a time.
  if (BOOKING_API) fetch(BOOKING_API.replace(/\/$/, "") + "/health").catch(() => {});

  let catalog = null;       // Square services, loaded once per page
  let depositRule = null;   // { percent, min } from the booking server
  function depositAmount() {
    const price = booking.option && booking.option.price;
    if (!booking.slot || !depositRule || !depositRule.percent || !price) return 0;
    return Math.min(price, Math.max(depositRule.min || 0, Math.round(price * depositRule.percent) / 100));
  }
  function dollars(n) { return "$" + (n % 1 ? n.toFixed(2) : n.toLocaleString("en-US")); }
  function loadCatalog() {
    if (catalog) return Promise.resolve(catalog);
    return api("/services").then((j) => { depositRule = j.deposit || null; return (catalog = j.categories || {}); });
  }

  // Show a "checking…" bubble while waiting on Square
  function waitFor(promise, text) {
    setChips([]);
    busy = true;
    const note = addMsg("bot", text);
    const slow = setTimeout(() => { note.textContent = "Still checking — this can take a few more seconds…"; }, 5000);
    return promise.finally(() => { clearTimeout(slow); note.parentNode.remove(); busy = false; });
  }

  function startBooking(service) {
    flow = "book";
    booking = { live: !!BOOKING_API };
    flowStarted = Date.now();
    if (service && SERVICES.includes(service)) {
      booking.service = service;
      afterService(`Great — let’s book a visit for <b>${SERVICE_LABEL[service].toLowerCase()}</b>. It takes about a minute.`);
    } else {
      step = "service";
      say(["Let’s get you booked — it takes about a minute.", promptFor("service")], chipsFor("service"));
    }
  }

  // Square mode asks which exact service; request mode goes straight to details
  function afterService(preface) {
    if (!booking.live) return ask("details", preface);
    waitFor(loadCatalog(), "Checking our services…").then(() => {
      booking.items = catalog[SQUARE_CATEGORY[booking.service]] || [];
      if (!booking.items.length) { booking.live = false; return ask("details", preface); }
      ask("item", preface);
    }).catch(() => { booking.live = false; ask("details", preface); });
  }

  function afterAddress(preface) {
    if (!booking.live) return ask("day", preface);
    waitFor(api("/availability?variation=" + encodeURIComponent(booking.option.id) + "&days=10"), "Checking open times…")
      .then((j) => {
        booking.days = (j.days || []).slice(0, 7);
        if (!booking.days.length) return goRequestMode("We don’t have open times online for that in the next week or so — tell me what day works and we’ll fit you in.");
        ask("day", preface);
      })
      .catch(() => goRequestMode("I couldn’t load our calendar just now — tell me what day works and we’ll confirm with you."));
  }

  // A changed service needs fresh open times; otherwise carry on to the job details
  function afterOption() {
    if (booking.editing === "service") { booking.editing = "day"; return afterAddress(); }
    return ask("details");
  }

  // Fall back to the email-request version of the day/time questions
  function goRequestMode(msg) {
    booking.live = false;
    delete booking.days; delete booking.slot;
    ask("day", msg);
  }

  // "1234 General Rd, Moneta, VA 24121" → { line1, city, state, zip }
  const STATES = "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" ");
  const TOWNS = DATA.towns.concat(["Huddleston", "Hardy", "Forest", "Vinton", "Salem", "Wirtz", "Penhook", "Union Hall", "Rocky Mount", "Evington", "Thaxton", "Montvale", "Boones Mill"]);
  function parseAddress(text) {
    let rest = text.replace(/\s+/g, " ").trim();
    let zip = "", state = "", city = "";
    const z = rest.match(/\b(\d{5})(?:-\d{4})?\b(?!.*\b\d{5}\b)/);
    if (z) { zip = z[1]; rest = (rest.slice(0, z.index) + rest.slice(z.index + z[0].length)).trim(); }
    rest = rest.replace(/[,.\s]+$/, "");
    const st = rest.match(/(?:^|[,\s])(virginia|north carolina|[A-Za-z]{2})\.?$/i);
    if (st) {
      const v = st[1].toLowerCase();
      const code = v === "virginia" ? "VA" : v === "north carolina" ? "NC" : STATES.includes(v.toUpperCase()) ? v.toUpperCase() : "";
      if (code) { state = code; rest = rest.slice(0, st.index).replace(/[,\s]+$/, ""); }
    }
    if (!state && /^2[0-4]/.test(zip)) state = "VA"; // Virginia ZIPs
    const parts = rest.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2) city = parts.pop();
    else {
      const town = TOWNS.find((x) => rest.toLowerCase().endsWith(" " + x.toLowerCase()));
      if (town) { city = town; parts[0] = rest.slice(0, -town.length).trim(); }
    }
    return { line1: parts.join(", "), city, state, zip };
  }
  // Address suggestions and checks use Photon, a free OpenStreetMap search (no key).
  // Results are kept near our service area. Many rural houses aren't on the map yet,
  // so streets count too: the customer's house number is put in front of the street.
  const ADDRESS_SEARCH = "https://photon.komoot.io/api/?limit=8&lang=en&lat=37.24&lon=-79.65&bbox=-81.5,36.5,-77.5,38.5&layer=house&layer=street&q=";
  const ZIP_TOWNS = { "24121": "Moneta", "24101": "Hardy", "24184": "Wirtz", "24088": "Penhook", "24176": "Union Hall",
    "24151": "Rocky Mount", "24523": "Bedford", "24104": "Huddleston", "24095": "Goodview", "24064": "Blue Ridge",
    "24174": "Thaxton", "24179": "Vinton", "24092": "Glade Hill", "24065": "Boones Mill", "24551": "Forest", "24550": "Evington" };
  let addrSuggestions = [];
  function lookupAddress(q) {
    const num = (q.match(/^\s*(\d+[A-Za-z]?)\b/) || [])[1];
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    return fetch(ADDRESS_SEARCH + encodeURIComponent(q), { signal: ctrl.signal })
      .then((r) => r.json())
      .then((j) => {
        const seen = new Set();
        return (j.features || []).map((f) => f.properties)
          .filter((p) => p.countrycode === "US")
          .map((p) => {
            const zip = (p.postcode || "").slice(0, 5);
            const street = p.housenumber ? p.street : (p.type === "street" ? p.name : "");
            const house = p.housenumber || num;
            if (!street || !house) return null;
            return {
              line1: house + " " + street,
              city: p.city || p.town || p.village || ZIP_TOWNS[zip] || p.locality || "",
              state: STATE_CODES[(p.state || "").toLowerCase()] || "",
              zip,
              street,
            };
          })
          .filter((a) => a && a.city && a.state && /^\d{5}$/.test(a.zip))
          .filter((a) => { const k = addrText(a).toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
          .slice(0, 5);
      })
      .catch(() => [])
      .finally(() => clearTimeout(timer));
  }
  // Does the typed street name agree with a map result? ("Estates Rd" vs "Estates Road")
  function sameStreet(typed, a) {
    const words = (t) => t.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/)
      .filter((w) => w && !/^\d/.test(w) && !/^(rd|road|st|street|dr|drive|ln|lane|ave|avenue|ct|court|cir|circle|way|trl|trail|pl|place|blvd|hwy|tpke|pkwy|ter|n|s|e|w|ne|nw|se|sw)$/.test(w));
    const want = words(typed), have = words(a.street || a.line1);
    return want.length > 0 && want.every((w) => have.some((h) => h.startsWith(w)));
  }
  const STATE_CODES = { virginia: "VA", "north carolina": "NC", "west virginia": "WV", maryland: "MD", tennessee: "TN", kentucky: "KY", "district of columbia": "DC" };
  function addrText(a) { return `${a.line1}, ${a.city}, ${a.state} ${a.zip}`; }

  // Suggest addresses as the customer types
  let addrTimer = null, addrQuery = "";
  input.addEventListener("input", () => {
    if (flow !== "book" || step !== "location") return;
    const q = input.value.trim();
    clearTimeout(addrTimer);
    if (!/^\s*\d+\s+\S{2,}/.test(q)) return;   // start once there's a number and part of a street
    addrTimer = setTimeout(() => {
      addrQuery = q;
      lookupAddress(q).then((list) => {
        if (addrQuery !== q || step !== "location" || busy) return;
        if (!list.length) return;   // keep the last good suggestions while they keep typing
        addrSuggestions = list;
        setChips(list.map((a, i) => ({ label: addrText(a), value: "#addr:" + i })));
      });
    }, 250);
  });

  function useAddress(a) {
    booking.address = a;
    booking.location = addrText(a);
    delete booking.unverified;
    if (booking.editing) return proceed();
    return afterAddress();
  }

  function missingFrom(a) {
    const miss = [];
    if (!/\d/.test(a.line1) || a.line1.length < 4) miss.push("street address");
    if (!a.city) miss.push("city");
    if (!a.state) miss.push("state");
    if (!a.zip) miss.push("ZIP code");
    return miss;
  }
  function listWords(xs) { return xs.length < 2 ? xs.join("") : xs.slice(0, -1).join(", ") + " and " + xs[xs.length - 1]; }

  // After a change from the summary, jump straight back to it
  function proceed(next, preface) {
    if (booking.editing) { booking.editing = false; return showConfirm("Updated."); }
    return ask(next, preface);
  }
  function showConfirm(preface) {
    step = "confirm";
    input.type = "text";
    const lead = preface ? preface + " " : "";
    return say(booking.slot
      ? [lead + "Here’s your booking:" + summary(), "Should I book it? You’ll get a confirmation, and we’ll call or text if anything needs to change."]
      : [lead + "Here’s your request:" + summary(), "Should I send it to our team? We’ll call or text to confirm the exact time."], chipsFor("confirm"));
  }
  const EDITS = [["service", "Service"], ["details", "Job details"], ["location", "Address"], ["day", "Day & time"], ["name", "Name"], ["phone", "Phone"], ["email", "Email"]];
  function editStep(s, preface) {
    if (s === "service") {
      booking.editing = "service";
      delete booking.slot; delete booking.time; delete booking.option; delete booking.item;
      catalog = null; // reload in case the service list changed
      if (!booking.live) return ask("service", preface);
      return waitFor(loadCatalog(), "Checking our services…").then(() => {
        booking.items = catalog[SQUARE_CATEGORY[booking.service]] || [];
        if (!booking.items.length) { booking.live = false; booking.editing = true; return ask("details", "Tell me a bit about the job and we’ll confirm the service with you."); }
        ask("item", preface);
      }).catch(() => { booking.live = false; booking.editing = true; ask("details"); });
    }
    if (s === "day") {
      booking.editing = "day";
      delete booking.slot; delete booking.time;
      return booking.live ? afterAddress(preface) : ask("day", preface);
    }
    booking.editing = true;
    return ask(s, preface);
  }

  function openDays() {
    const out = [];
    const now = new Date();
    const d = new Date(now);
    if (now.getDay() !== 0 && now.getHours() < 12) out.push({ label: "Today", value: dayValue(new Date(now)) });
    while (out.length < 6) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0) continue; // closed Sundays
      out.push({ label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }), value: dayValue(new Date(d)) });
    }
    out.push({ label: "I’m flexible", value: "Flexible — soonest available" });
    return out;
  }
  function dayValue(d) { return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }); }

  // Keep the time list short: on-the-hour starts first, at most 8
  function slotChoices(day) {
    let slots = day.slots.filter((s) => /:00/.test(s.label));
    if (slots.length < 3) slots = day.slots;
    return slots.slice(0, 8);
  }
  function money(n) { return n == null ? "" : " · $" + (n % 1 ? n.toFixed(2) : n.toLocaleString("en-US")); }

  function promptFor(s) {
    switch (s) {
      case "service": return "What do you need help with?";
      case "item": return "Which service?";
      case "option": return "Which one fits best?";
      case "details": return "In a sentence or two, what needs to be done? (Sizes, number of items, or anything else helpful.)";
      case "location": return "What’s the full address for the job? (Street, city, state and ZIP, like <i>1234 General Rd, Moneta, VA 24121</i>)";
      case "day": return booking.live ? "Here are our next open days. Which works best?" : "What day works best for you?";
      case "time": return booking.live ? `Open times on ${esc(booking.day)}:` : "And what time of day?";
      case "name": return "Who should we ask for? (Your name)";
      case "phone": return "What’s the best phone number to call or text you?";
      case "email": return "And your email, so we can send the confirmation?";
      default: return "";
    }
  }
  function chipsFor(s) {
    switch (s) {
      case "service": return SERVICES.map((x) => ({ label: SERVICE_LABEL[x], value: x }));
      case "item": return booking.items.map((it, i) => ({ label: it.name, value: "#item:" + i })).concat([{ label: "Something else", value: "#item:other" }]);
      case "option": return booking.item.options.map((o, i) => ({ label: o.name + money(o.price), value: "#option:" + i }));
      case "day":
        if (booking.live) return booking.days.map((d, i) => ({ label: d.short, value: "#day:" + i })).concat([{ label: "None of these work", value: "#day:none" }]);
        return openDays();
      case "time":
        if (booking.live) return slotChoices(booking.liveDay).map((sl) => ({ label: sl.label, value: "#slot:" + sl.start_at })).concat([{ label: "Pick another day", value: "#time:back" }]);
        if (/^Saturday/.test(booking.day || "")) return [{ label: "9am – 12pm", value: "Morning (9am–12pm)" }, { label: "12pm – 3pm", value: "Afternoon (12pm–3pm)" }, { label: "Any time", value: "Any time" }];
        return [{ label: "Morning · 8–12", value: "Morning (8am–12pm)" }, { label: "Afternoon · 12–4", value: "Afternoon (12pm–4pm)" }, { label: "Any time", value: "Any time" }];
      case "confirm": return [{ label: booking.slot ? "Book it" : "Send request", value: "#send", primary: true }, { label: "Change something", value: "#edit" }, { label: "Start over", value: "#restart" }, { label: "Cancel", value: "#cancel" }];
      case "edit": return EDITS.map(([s, label]) => ({ label, value: "#edit:" + s })).concat([{ label: "Nothing, looks good", value: "#edit:none" }]);
      default: return [];
    }
  }
  function ask(s, preface) {
    step = s;
    const msgs = preface ? [preface, promptFor(s)] : [promptFor(s)];
    say(msgs, chipsFor(s));
    input.type = s === "phone" ? "tel" : s === "email" ? "email" : "text";
  }

  function bookingStep(text) {
    if (text === "#cancel") { flow = null; return say("No problem — I’ve cancelled that request. Anything else?", MENU); }
    if (text === "#restart") return startBooking();
    if (text === "#menu") { flow = null; return greet(); }
    switch (step) {
      case "service": {
        const s = SERVICES.find((x) => x === text) || detectService(" " + text.toLowerCase() + " ");
        if (!s) return say("Sorry, which of these is closest?", chipsFor("service"));
        booking.service = s;
        if (booking.editing === "service" && !booking.live) { booking.editing = true; return proceed(); }
        return afterService();
      }
      case "item": {
        if (text === "#item:other") { booking.live = false; return ask("details", "No problem — describe it and we’ll take a look."); }
        const it = text.startsWith("#item:") ? booking.items[+text.slice(6)]
          : booking.items.find((x) => x.name.toLowerCase().includes(text.toLowerCase()));
        if (!it) return say("Which of these is closest? Or tap “Something else.”", chipsFor("item"));
        booking.item = it;
        if (it.options.length === 1) { booking.option = it.options[0]; return afterOption(); }
        return ask("option");
      }
      case "option": {
        const o = text.startsWith("#option:") ? booking.item.options[+text.slice(8)]
          : booking.item.options.find((x) => x.name.toLowerCase().includes(text.toLowerCase()));
        if (!o) return say("Tap the option that fits best — you can add details next.", chipsFor("option"));
        booking.option = o; return afterOption();
      }
      case "details":
        if (text.length < 3) return say("Could you tell me a little more about the job?", []);
        booking.details = text; return proceed("location", "Got it.");
      case "location": {
        if (text.startsWith("#addr:")) {
          const picked = addrSuggestions[+text.slice(6)];
          if (picked) return useAddress(picked);
        }
        if (text === "#addr:asis" && booking.unverified) return useAddress(booking.unverified);
        if (text === "#addr:retype") { delete booking.unverified; return say("Sure — type the full address again (street, city, state and ZIP).", []); }
        const a = parseAddress(text);
        if (!/\d/.test(a.line1)) return say("I need the street address with the house number, like <i>1234 General Rd, Moneta, VA 24121</i>.", []);
        // Check the address against the map; fill in anything missing from a match
        return waitFor(lookupAddress(text), "Checking that address…").then((found) => {
          const num = (a.line1.match(/\d+/) || [""])[0];
          const match = found.find((f) => f.line1.startsWith(num + " ") && sameStreet(a.line1, f) && (!a.zip || f.zip === a.zip));
          if (match) return useAddress(match);
          const miss = missingFrom(a);
          if (miss.length) return say(`I couldn’t find that address on the map, and I’m missing the ${listWords(miss)}. Please type the full address, like <i>1234 General Rd, Moneta, VA 24121</i>.`, []);
          booking.unverified = a;
          const near = found.slice(0, 3).map((f, i) => ({ label: "Did you mean " + addrText(f) + "?", value: "#addr:" + i }));
          addrSuggestions = found;
          return say([`I couldn’t find <b>${esc(addrText(a))}</b> on the map. Please check the house number and street spelling.`,
                      "If it’s correct (newer or rural addresses sometimes aren’t listed), you can use it as typed."],
                     near.concat([{ label: "Use it as typed", value: "#addr:asis", primary: true }, { label: "Re-type it", value: "#addr:retype" }]));
        });
      }
      case "day":
        if (booking.live) {
          if (text === "#day:none") return goRequestMode("No problem — tell me what works and we’ll confirm with you.");
          const d = text.startsWith("#day:") ? booking.days[+text.slice(5)] : null;
          if (!d) return say("Tap one of the open days, or “None of these work.”", chipsFor("day"));
          booking.liveDay = d; booking.day = d.label; return ask("time");
        }
        booking.day = text; return ask("time");
      case "time":
        if (booking.live) {
          if (text === "#time:back") { delete booking.liveDay; return ask("day"); }
          const sl = text.startsWith("#slot:") && booking.liveDay.slots.find((x) => x.start_at === text.slice(6));
          if (!sl) return say("Tap one of the open times.", chipsFor("time"));
          booking.slot = sl; booking.time = sl.label;
          return proceed("name");
        }
        booking.time = text; return proceed("name");
      case "name":
        if (text.trim().length < 2) return say("What name should we ask for?", []);
        booking.name = text; return proceed("phone", `Nice to meet you, ${esc(text.split(" ")[0])}!`);
      case "phone": {
        const digits = text.replace(/\D/g, "");
        if (digits.length < 10) return say("That doesn’t look like a full phone number — could you double-check it? (10 digits, like 434-555-0123)", []);
        booking.phone = text; return proceed("email");
      }
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return say(text ? "That email doesn’t look quite right. Could you try again?" : "We need an email to send your confirmation. What’s the best one?", []);
        booking.email = text;
        booking.editing = false;
        return showConfirm();
      case "confirm":
        if (text === "#send") return send();
        if (text === "#edit") { step = "edit"; return say("What would you like to change?", chipsFor("edit")); }
        return say(`Tap “${booking.slot ? "Book it" : "Send request"}” when you’re ready, or “Change something” to fix a detail.`, chipsFor("confirm"));
      case "edit": {
        if (text === "#edit:none") return showConfirm();
        const pick = text.startsWith("#edit:") ? text.slice(6) : (EDITS.find(([, label]) => label.toLowerCase().startsWith(text.toLowerCase().trim())) || [])[0];
        if (!pick || !EDITS.some(([s]) => s === pick)) return say("Tap what you’d like to change.", chipsFor("edit"));
        return editStep(pick);
      }
    }
  }

  function serviceName() {
    if (!booking.item) return SERVICE_LABEL[booking.service];
    return booking.item.name + (booking.option && booking.item.options.length > 1 ? " — " + booking.option.name : "");
  }

  function summary() {
    const rows = [["Service", serviceName()], ["Job", booking.details], ["Where", booking.location], ["Day", booking.day], ["Time", booking.time], ["Name", booking.name], ["Phone", booking.phone], ["Email", booking.email || "—"]];
    if (booking.option && booking.option.price != null) rows.splice(1, 0, ["Starting price", "$" + booking.option.price.toLocaleString("en-US")]);
    if (depositAmount()) rows.splice(2, 0, ["Deposit", dollars(depositAmount()) + " to hold your time (comes off the bill)"]);
    return '<dl class="chat-summary">' + rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("") + "</dl>";
  }

  // Spam guard: bots fill the hidden field or send in a few seconds. Pretend it
  // worked so they don't retry, but don't email anything.
  const hp = root.querySelector(".chat-hp");
  let flowStarted = Date.now();
  function looksLikeSpam() { return hp.value !== "" || Date.now() - flowStarted < 8000; }

  function post(payload) {
    if (looksLikeSpam()) return Promise.resolve({});
    return fetch(SEND_TO, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(Object.assign({ _template: "table", _captcha: "false" }, payload)),
    }).then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json().catch(() => ({})); })
      .then((j) => { if (j && (j.success === false || j.success === "false")) throw new Error(j.message || "Not sent"); return j; });
  }

  // The email we (and the customer) get, for both bookings and requests
  function emailPayload(booked) {
    const what = serviceName();
    return {
      _subject: `${booked ? "New booking (in Square)" : "New appointment request"} · ${what} · ${booking.day}`,
      "Request type": booked ? "Booked in Square (website chat)" : "Appointment request (website chat)",
      "Service": what,
      "Job details": booking.details,
      "Address / town": booking.location,
      [booked ? "Booked day" : "Preferred day"]: booking.day,
      [booked ? "Booked time" : "Preferred time"]: booking.time,
      "Name": booking.name,
      "Phone": booking.phone,
      "email": booking.email || "(not given)",
      // FormSubmit emails this to the customer's address, when they gave one
      ...(booking.email ? { _autoresponse: booked
        ? `Thanks for booking with Seaside Haven! You're booked for ${what.toLowerCase()} on ${booking.day} at ${booking.time}. We'll call or text ${booking.phone} if anything changes. Questions? Call ${PHONE}.`
        : `Thanks for booking with Seaside Haven! We got your ${what.toLowerCase()} request for ${booking.day} (${booking.time}). We'll call or text ${booking.phone} to confirm the exact time. Questions? Call ${PHONE}.` } : {}),
    };
  }

  function send() {
    if (booking.slot) return sendBooking();
    setChips([]);
    busy = true;
    const sending = addMsg("bot", "Sending your request…");
    post(emailPayload(false)).then(() => {
      sending.remove(); busy = false; flow = null;
      const first = esc(booking.name.split(" ")[0]);
      const mailed = booking.email ? ` A confirmation is on its way to <b>${esc(booking.email)}</b>.` : "";
      say([`✅ You’re all set, ${first}! Your request was sent.${mailed}`,
           `We’ll call or text <b>${esc(booking.phone)}</b> to confirm the exact time. Requests sent after hours are confirmed the next business day.`],
          [{ label: "Ask something else", value: "#menu" }]);
    }).catch(() => {
      sending.remove(); busy = false;
      say(["Sorry — that didn’t go through. Your details are still here.",
           `Please try again, or call <a href="${TEL}">${PHONE}</a> and we’ll book you right away.`],
          [{ label: "Try again", value: "#send", primary: true }, { label: "Call now", href: TEL }]);
    });
  }

  // Book straight into Square. If that fails, send it as a request instead so the
  // customer is never left without a way through.
  function sendBooking() {
    if (looksLikeSpam()) { flow = null; return say("✅ Thanks! We’ll be in touch.", [{ label: "Ask something else", value: "#menu" }]); }
    waitFor(api("/book", {
      variation_id: booking.option.id,
      version: booking.slot.version,
      team_member_id: booking.slot.team_member_id,
      minutes: booking.slot.minutes,
      start_at: booking.slot.start_at,
      service: serviceName(),
      details: booking.details,
      address: booking.address,
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      website: hp.value,
    }), "Booking your visit…").then((res) => {
      flow = null;
      post(emailPayload(true)).catch(() => {}); // heads-up email; the booking is already in Square
      const first = esc(booking.name.split(" ")[0]);
      const mailed = booking.email ? ` A confirmation is on its way to <b>${esc(booking.email)}</b>.` : "";
      const dep = res && res.deposit;
      if (dep && dep.url) {
        return say([`✅ You’re booked, ${first}! <b>${esc(booking.day)} at ${esc(booking.time)}</b>.${mailed}`,
                    `To hold your time, please pay the <b>${dollars(dep.amount)}</b> deposit. It comes off your final bill. We also emailed you the link.`,
                    `Need to reschedule? Call <a href="${TEL}">${PHONE}</a>.`],
                   [{ label: "Pay " + dollars(dep.amount) + " deposit", href: dep.url, primary: true }, { label: "Ask something else", value: "#menu" }]);
      }
      say([`✅ You’re booked, ${first}! <b>${esc(booking.day)} at ${esc(booking.time)}</b>.${mailed}`,
           `We’ll call or text <b>${esc(booking.phone)}</b> if anything needs to change. Need to reschedule? Call <a href="${TEL}">${PHONE}</a>.`],
          [{ label: "Ask something else", value: "#menu" }]);
    }).catch((err) => {
      // Something the customer can fix: explain it and ask just that question again
      if (err.field === "time") return editStep("day", esc(err.message) + " Here are the open times now.");
      if (err.field === "service") return editStep("service", esc(err.message));
      if (["name", "phone", "email", "address"].includes(err.field)) {
        booking.editing = true;
        return ask(err.field === "address" ? "location" : err.field, esc(err.message));
      }
      delete booking.slot;
      booking.live = false;
      say("I couldn’t reach our calendar just now, so I’ll send this to our team to confirm instead.");
      send();
    });
  }

  /* ---------- "Send my question" flow ---------- */
  function startQuestion() {
    flow = "question"; question = {}; step = "q";
    flowStarted = Date.now();
    say("Sure — what’s your question?", []);
  }
  function questionStep(text) {
    if (text === "#menu") { flow = null; return greet(); }
    if (step === "q") { question.text = text; step = "qname"; return say("Thanks! What’s your name?", []); }
    if (step === "qname") { question.name = text; step = "qcontact"; input.type = "text"; return say("And the best phone number or email to reach you?", []); }
    if (step === "qcontact") {
      const ok = text.replace(/\D/g, "").length >= 10 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
      if (!ok) return say("Please enter a 10-digit phone number or an email address.", []);
      question.contact = text;
      setChips([]); busy = true;
      const sending = addMsg("bot", "Sending…");
      post({ _subject: "Question from website chat", "Request type": "Question (website chat)", "Name": question.name, "Phone or email": question.contact, "Question": question.text })
        .then(() => { sending.remove(); busy = false; flow = null; say(`Sent! Someone from our team will get back to you soon, ${esc(question.name.split(" ")[0])}.`, anythingElse()); })
        .catch(() => { sending.remove(); busy = false; flow = null; say(`Sorry, that didn’t send. Please call <a href="${TEL}">${PHONE}</a>.`, [{ label: "Call now", href: TEL }, { label: "Main menu", value: "#menu" }]); });
    }
  }

  try {
    const saved = JSON.parse(sessionStorage.getItem(SAVE_KEY) || "null");
    if (saved && saved.log) {
      log.innerHTML = saved.log;
      ({ flow, step } = saved);
      booking = saved.booking || {};
      question = saved.question || {};
      started = true;
      if (step === "phone") input.type = "tel"; else if (step === "email") input.type = "email";
      setChips(saved.chips || []);
      if (saved.open) { panel.hidden = false; root.classList.add("open"); launcher.setAttribute("aria-expanded", "true"); log.scrollTop = log.scrollHeight; }
    }
  } catch (e) { /* bad or missing saved chat — start fresh */ }

  // Little nudge bubble after a few seconds on the home page (once per visit)
  try {
    if (!sessionStorage.getItem("sh-chat-nudged") && !inPages) {
      setTimeout(() => {
        if (!panel.hidden) return;
        root.classList.add("nudge");
        sessionStorage.setItem("sh-chat-nudged", "1");
        setTimeout(() => root.classList.remove("nudge"), 6000);
      }, 6000);
    }
  } catch (e) { /* storage unavailable — skip the nudge */ }
})();
