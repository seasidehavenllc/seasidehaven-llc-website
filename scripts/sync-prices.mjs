/* =========================================================
   SYNC WEBSITE PRICES FROM SQUARE
   Reads the bookable services from the booking server (which reads Square)
   and updates the prices on the website so they always match Square:
     - the full price lists on the Landscaping, Remodeling and Junk Removal pages
     - the summary price cards (home page, services page, category pages)
     - the chat's built-in price list (chat.js)
   Services added in Square that the website doesn't list yet are added to
   the bottom of their page's price list.

   Run: node scripts/sync-prices.mjs            (live, from the booking server)
        node scripts/sync-prices.mjs file.json  (from a saved /services reply)
   A GitHub Action runs this every night (.github/workflows/sync-prices.yml).

   Website prices are ranges ("$75–$125"). The low end always becomes the
   Square price; the high end is kept when it's still above it, otherwise
   the price shows as "$200+". Rows that aren't in Square (add-ons like
   Texture Match) are left as they are.
========================================================= */
import fs from "node:fs";
import path from "node:path";

const API = "https://seaside-booking.onrender.com/services";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, text) => fs.writeFileSync(path.join(ROOT, f), text);
const MAP = JSON.parse(read("scripts/price-map.json"));

const changes = [];
const warnings = [];

/* ---------- Load Square services ---------- */
async function loadServices() {
  if (process.argv[2]) return JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  // The free server may be asleep: give it a few minutes to wake up
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const res = await fetch(API, { signal: AbortSignal.timeout(90000) });
      if (res.ok) return await res.json();
      console.log(`Attempt ${attempt}: booking server answered ${res.status}`);
    } catch (err) {
      console.log(`Attempt ${attempt}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 20000));
  }
  throw new Error("Couldn't reach the booking server");
}

/* ---------- Helpers ---------- */
const norm = (s) => String(s).toLowerCase().replace(/&amp;/g, "&").replace(/[^a-z0-9]/g, "");
const unescapeHtml = (s) => String(s).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = (n) => "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
const toNumber = (s) => Number(String(s).replace(/,/g, ""));

function parseRange(text) {
  const m = String(text).match(/^\$([\d,.]+)(?:\s*[–-]\s*\$([\d,.]+))?(\+)?$/);
  if (!m) return null;
  return { low: toNumber(m[1]), high: m[2] ? toNumber(m[2]) : null, plus: !!m[3] };
}

// "$75–$125": low from Square; keep the old high end only while it's still above it
function newRange(oldText, src) {
  const old = parseRange(oldText) || { low: null, high: null, plus: false };
  const high = src.group && src.high > src.low ? src.high : old.high != null && old.high > src.low ? old.high : null;
  const plus = old.plus || high == null;
  return money(src.low) + (high != null ? "–" + money(high) : "") + (plus ? "+" : "");
}

let items = [];       // every bookable Square service, with its category
const used = new Set(); // Square services the website already lists

function findItem(name) {
  return items.find((it) => norm(it.name) === norm(name));
}

// One Square option, by the website's row name
function findOption(item, label) {
  const n = norm(label);
  const exact = item.options.filter((o) => norm(o.name) === n);
  if (exact.length === 1) return exact[0];
  const loose = item.options.filter((o) => norm(o.name).startsWith(n) || n.startsWith(norm(o.name)));
  return loose.length === 1 ? loose[0] : null;
}

// "Item/Option" → that option's price; "Item/*" → the price range of all options
function resolve(source) {
  const [itemName, optionName] = source.split("/");
  const item = findItem(itemName);
  if (!item) return null;
  used.add(item.id);
  const prices = item.options.map((o) => o.price).filter((p) => p != null);
  if (!prices.length) return null;
  if (optionName === "*") return { low: Math.min(...prices), high: Math.max(...prices), group: true };
  const opt = findOption(item, optionName);
  return opt && opt.price != null ? { low: opt.price, group: false } : null;
}

function sourceForRow(entryId, label) {
  const entry = MAP.entries[entryId];
  if (!entry) return null;
  const explicit = entry.rows && (entry.rows[label] || entry.rows[unescapeHtml(label)]);
  if (explicit) return resolve(explicit);
  if (!entry.item) return null;
  const item = findItem(entry.item);
  if (!item) { warnings.push(`Square has no service named "${entry.item}" (website: ${entryId})`); return null; }
  used.add(item.id);
  const opt = findOption(item, unescapeHtml(label));
  return opt && opt.price != null ? { low: opt.price, group: false } : null;
}

function setRow(where, label, oldText, src) {
  if (!src) return oldText;
  const next = newRange(oldText, src);
  if (next !== oldText) changes.push(`${where} · ${unescapeHtml(label)}: ${oldText} → ${next}`);
  return next;
}

// The "from $X" on a service follows the row it pointed at before (so add-ons
// like "Wax Ring + Seal" don't become the starting price)
function startingPrice(from, before, after) {
  const was = parseRange(from);
  const i = was ? before.findIndex((r) => r && r.low === was.low) : -1;
  if (i >= 0 && after[i]) return money(after[i].low);
  const lows = after.filter(Boolean).map((r) => r.low);
  return lows.length ? money(Math.min(...lows)) : from;
}

/* ---------- Full price lists (accordion) ---------- */
const ENTRY_RE = /(<div class="acc-item">\s*<button class="acc-trigger"[^>]*aria-controls="([^"]+)"[\s\S]*?<span class="q">)([^<]*)(<small>[\s\S]*?<span class="from-tag">from<strong>)([^<]*)(<\/strong>[\s\S]*?<ul class="tier-list">)([\s\S]*?)(<\/ul>)/g;
const ROW_RE = /<li><span>([^<]*)<\/span><span>([^<]*)<\/span><\/li>/g;
const titleToEntry = {}; // "Mowing" → "p-mowing", for the chat's price list

function syncPage(file, category) {
  let html = read(file);
  const start = html.indexOf("<!-- square-auto:start");
  const end = html.indexOf("<!-- square-auto:end -->");
  const auto = start >= 0 && end > start ? [start, end] : null;

  html = html.replace(ENTRY_RE, (all, head, id, title, mid, from, beforeRows, rows, close, offset) => {
    if (auto && offset > auto[0] && offset < auto[1]) return all; // rebuilt below
    titleToEntry[unescapeHtml(title)] = id;
    const before = [], after = [];
    const newRows = rows.replace(ROW_RE, (li, label, price) => {
      const next = setRow(`${path.basename(file)} ${unescapeHtml(title)}`, label, price, sourceForRow(id, label));
      before.push(parseRange(price));
      after.push(parseRange(next));
      return `<li><span>${label}</span><span>${next}</span></li>`;
    });
    const newFrom = startingPrice(from, before, after);
    if (newFrom !== from) changes.push(`${path.basename(file)} ${unescapeHtml(title)} starting price: ${from} → ${newFrom}`);
    return head + title + mid + newFrom + beforeRows + newRows + close;
  });

  // Services in Square that the page doesn't list yet
  const extra = items.filter((it) => it.category === category && !used.has(it.id));
  if (auto || extra.length) {
    const sample = html.match(/<span class="svc-ico">([\s\S]*?)<\/span>\s*<span class="q">/);
    const chev = html.match(/<span class="chev">([\s\S]*?)<\/span>\s*<\/button>/);
    const note = html.match(/<p class="price-note">[\s\S]*?<\/p>/);
    const blocks = extra.map((it) => {
      const slug = "sq-" + it.id.toLowerCase();
      const priced = it.options.filter((o) => o.price != null);
      const low = priced.length ? Math.min(...priced.map((o) => o.price)) : null;
      const rows = priced.map((o) => `<li><span>${escapeHtml(o.name)}</span><span>${money(o.price)}+</span></li>`).join("");
      return `
      <div class="acc-item">
        <button class="acc-trigger" type="button" aria-expanded="false" aria-controls="p-${slug}" id="pq-${slug}">
          <span class="svc-ico">${sample ? sample[1] : ""}</span>
          <span class="q">${escapeHtml(it.name)}<small>Book online in the chat, or ask us for a quote.</small></span>
          <span class="from-tag">from<strong>${low != null ? money(low) : "Quote"}</strong></span>
          <span class="chev">${chev ? chev[1] : ""}</span>
        </button>
        <div class="acc-panel" id="p-${slug}" role="region" aria-labelledby="pq-${slug}"><div><div class="acc-body" style="max-width:none">
          <ul class="tier-list">${rows}</ul>
          ${note ? note[0] : ""}
        </div></div></div>
      </div>`;
    }).join("");
    const s = html.indexOf("<!-- square-auto:start");
    const sEnd = html.indexOf("-->", s) + 3;
    const e = html.indexOf("<!-- square-auto:end -->");
    if (s < 0 || e < 0) {
      if (extra.length) warnings.push(`${file} has no square-auto markers; can't add ${extra.map((x) => x.name).join(", ")}`);
    } else {
      const before = html.slice(sEnd, e);
      const after = blocks + "\n      ";
      if (before !== after) {
        changes.push(`${path.basename(file)} new services from Square: ${extra.map((x) => x.name).join(", ") || "(none)"}`);
        html = html.slice(0, sEnd) + after + html.slice(e);
      }
    }
  }
  write(file, html);
}

/* ---------- Summary price cards ---------- */
const CARD_RE = /(<div class="price"><small>from<\/small><strong>)([^<]*)(<\/strong><em>)([^<]*)(<\/em><\/div>\s*<ul>)([\s\S]*?)(<\/ul>)/g;
const CARD_ROW_RE = /(<span>)([^<]*)(<\/span><b>)([^<]*)(<\/b>)/g;

function syncCards(file) {
  let html = read(file);
  html = html.replace(CARD_RE, (all, a, from, b, unit, c, rows, close) => {
    const card = MAP.cards[unit.trim()];
    if (!card) return all;
    const lows = {};
    const newRows = rows.replace(CARD_ROW_RE, (m, s1, label, s2, price, s3) => {
      const key = unescapeHtml(label);
      const source = card.rows[key];
      const next = source ? setRow(`${path.basename(file)} card ${unit.trim()}`, label, price, resolve(source)) : price;
      const r = parseRange(next);
      if (r && source) lows[key] = r.low;
      return s1 + label + s2 + next + s3;
    });
    let newFrom = from;
    const values = Object.values(lows);
    if (card.from === "min" && values.length) newFrom = money(Math.min(...values));
    else if (lows[card.from] != null) newFrom = money(lows[card.from]);
    if (newFrom !== from) changes.push(`${path.basename(file)} card ${unit.trim()} headline: ${from} → ${newFrom}`);
    return a + newFrom + b + unit + c + newRows + close;
  });
  write(file, html);
}

/* ---------- Chat's built-in price list ---------- */
/* ---------- Google: structured data ----------
   Each service page gets a schema.org Service block listing every Square service with
   its price range, so Google can show services and prices. index.html's business block
   gets the same catalog. Rebuilt from Square on every run. */
const AREA = ["Lynchburg, VA", "Roanoke, VA", "Bedford, VA", "Smith Mountain Lake, VA", "Moneta, VA", "Goodview, VA"];
const PROVIDER = { "@type": "HomeAndConstructionBusiness", "name": "Seaside Haven LLC", "url": "https://seasidehavenllc.com/", "telephone": "+1-434-233-0231" };
function offerCatalog(category) {
  const list = items.filter((it) => it.category === category).map((it) => {
    const prices = it.options.map((o) => o.price).filter((n) => n != null && n > 0);
    const offer = { "@type": "Offer", "itemOffered": { "@type": "Service", "name": it.name } };
    if (prices.length) {
      offer.priceSpecification = { "@type": "PriceSpecification", "priceCurrency": "USD", "minPrice": Math.min(...prices) };
      if (Math.max(...prices) > Math.min(...prices)) offer.priceSpecification.maxPrice = Math.max(...prices);
    }
    return offer;
  });
  return { "@type": "OfferCatalog", "name": category, "itemListElement": list };
}
function setJsonLd(file, id, data) {
  const html = read(file);
  const block = `<script type="application/ld+json" id="${id}">\n${JSON.stringify(data, null, 2)}\n</script>`;
  const re = new RegExp(`<script type="application/ld\\+json" id="${id}">[\\s\\S]*?</script>`);
  const next = re.test(html) ? html.replace(re, block) : html.replace("</head>", block + "\n</head>");
  if (next !== html) { write(file, next); changes.push(`${file}: updated Google service info`); }
}
function syncSchema() {
  for (const [file, category] of Object.entries(MAP.pages)) {
    setJsonLd(file, "square-services", {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": category,
      "provider": PROVIDER,
      "areaServed": AREA,
      "url": "https://seasidehavenllc.com/" + file,
      "hasOfferCatalog": offerCatalog(category),
    });
  }
  setJsonLd("index.html", "square-catalog", {
    "@context": "https://schema.org",
    ...PROVIDER,
    "priceRange": "$$",
    "areaServed": AREA,
    "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Services", "itemListElement": Object.keys(MAP.pages).map((f) => offerCatalog(MAP.pages[f])) },
  });
}

function syncChat() {
  const file = "chat.js";
  const js = read(file);
  const m = js.match(/^(\s*const DATA = )(\{.*\});$/m);
  if (!m) { warnings.push("Couldn't find the price list in chat.js"); return; }
  const data = JSON.parse(m[2]);
  data.prices = data.prices.filter((p) => !p.auto);
  for (const p of data.prices) {
    const id = titleToEntry[p.name];
    if (!id) continue;
    const before = [], after = [];
    p.rows = p.rows.map(([label, price]) => {
      const src = sourceForRow(id, label);
      const next = src ? newRange(price, src) : price;
      before.push(parseRange(price));
      after.push(parseRange(next));
      return [label, next];
    });
    p.from = startingPrice(p.from, before, after);
  }
  // Services the website pages had to add
  for (const it of items.filter((x) => !used.has(x.id))) {
    const priced = it.options.filter((o) => o.price != null);
    if (!priced.length) continue;
    data.prices.push({
      service: MAP.chatService[it.category] || it.category,
      name: it.name,
      from: money(Math.min(...priced.map((o) => o.price))),
      rows: priced.map((o) => [o.name, money(o.price) + "+"]),
      auto: true,
    });
  }
  const next = js.replace(m[0], m[1] + JSON.stringify(data) + ";");
  if (next !== js) { changes.push("chat.js price list updated"); write(file, next); }
}

/* ---------- Run ---------- */
const services = await loadServices();
for (const [category, list] of Object.entries(services.categories || {})) {
  for (const it of list) items.push({ ...it, category });
}
if (items.length < 10) {
  // Something's off (Square or the server); don't wipe the website's prices
  console.error(`Only ${items.length} services came back from Square; not changing anything.`);
  process.exit(1);
}

for (const [file, category] of Object.entries(MAP.pages)) syncPage(file, category);
const cardFiles = ["index.html", ...fs.readdirSync(path.join(ROOT, "Pages")).filter((f) => f.endsWith(".html")).map((f) => "Pages/" + f)];
for (const file of cardFiles) syncCards(file);
syncChat();
syncSchema();

console.log(changes.length ? "Changes:\n- " + changes.join("\n- ") : "Website prices already match Square.");
if (warnings.length) console.log("Warnings:\n- " + warnings.join("\n- "));
