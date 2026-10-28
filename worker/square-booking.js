/* =========================================================
   SEASIDE HAVEN — SQUARE BOOKING WORKER (Cloudflare Worker)
   Sits between the website chat and Square so the Square
   access token never appears in the public website.

   Setup: see worker/README.md. It needs one secret:
     SQUARE_TOKEN  — your Square production access token

   Endpoints (all JSON):
     GET  /health                           uptime ping (no Square call)
     GET  /services                         bookable services by category
     GET  /availability?variation=ID&days=7  open times, grouped by day
     POST /book                              create the customer + booking
========================================================= */

const LOCATION_ID = "LEZGWR4E97R78";
const SQUARE = "https://connect.squareup.com/v2";
const SQUARE_VERSION = "2025-01-23";
const ALLOWED_ORIGINS = [
  "https://seasidehavenllc.com",
  "https://www.seasidehavenllc.com",
  "https://seasidehavenllc.github.io",
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const reply = (body, status = 200) =>
      new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

    // Uptime ping (keeps the free Render server awake); never touches Square
    if (new URL(request.url).pathname === "/health") return reply({ ok: true, configured: !!env.SQUARE_TOKEN });
    if (!env.SQUARE_TOKEN) return reply({ error: "Booking is not set up yet." }, 503);
    const sq = squareClient(env.SQUARE_TOKEN);
    const url = new URL(request.url);

    try {
      if (request.method === "GET" && url.pathname === "/services") return reply(await services(sq));
      if (request.method === "GET" && url.pathname === "/availability") {
        const variation = url.searchParams.get("variation") || "";
        const days = Math.min(Math.max(parseInt(url.searchParams.get("days") || "7", 10) || 7, 1), 14);
        if (!/^[A-Z0-9]{10,40}$/.test(variation)) return reply({ error: "Unknown service." }, 400);
        return reply(await availability(sq, variation, days));
      }
      if (request.method === "POST" && url.pathname === "/book") {
        if (tooMany(request)) return reply({ error: "Too many requests. Please call us." }, 429);
        const body = await request.json().catch(() => null);
        const problem = checkBooking(body);
        if (problem) return reply({ error: problem }, 400);
        return reply(await book(sq, body));
      }
      return reply({ error: "Not found" }, 404);
    } catch (err) {
      return reply({ error: err.message || "Square request failed" }, 502);
    }
  },
};

/* ---------- Square helper ---------- */
function squareClient(token) {
  return async function sq(path, body) {
    const res = await fetch(SQUARE + path, {
      method: body ? "POST" : "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const e = (json.errors && json.errors[0]) || {};
      throw new Error(e.detail || e.code || "Square error " + res.status);
    }
    return json;
  };
}

// Location details (time zone) rarely change; keep them for the life of the worker.
let locationCache = null;
async function getLocation(sq) {
  if (!locationCache) locationCache = (await sq("/locations/" + LOCATION_ID)).location;
  return locationCache;
}

/* ---------- GET /services ---------- */
let servicesCache = null;
async function services(sq) {
  if (servicesCache && Date.now() - servicesCache.at < 5 * 60 * 1000) return servicesCache.data;
  const objects = [];
  let cursor;
  do {
    const page = await sq("/catalog/search", {
      object_types: ["ITEM"],
      include_related_objects: true,
      cursor,
    });
    objects.push(...(page.objects || []));
    (page.related_objects || []).forEach((o) => objects.push(o));
    cursor = page.cursor;
  } while (cursor);

  const categoryName = {};
  objects.filter((o) => o.type === "CATEGORY").forEach((c) => { categoryName[c.id] = c.category_data.name; });

  const atLocation = (o) => o.present_at_all_locations || (o.present_at_location_ids || []).includes(LOCATION_ID);
  const categories = {};
  objects
    .filter((o) => o.type === "ITEM" && !o.is_deleted && atLocation(o))
    .filter((o) => o.item_data.product_type === "APPOINTMENTS_SERVICE" && !o.item_data.is_archived)
    .forEach((item) => {
      const options = (item.item_data.variations || [])
        .filter((v) => !v.is_deleted && atLocation(v) && v.item_variation_data.available_for_booking)
        .sort((a, b) => (a.item_variation_data.ordinal || 0) - (b.item_variation_data.ordinal || 0))
        .map((v) => ({
          id: v.id,
          name: v.item_variation_data.name,
          price: v.item_variation_data.price_money ? v.item_variation_data.price_money.amount / 100 : null,
          minutes: Math.round((v.item_variation_data.service_duration || 0) / 60000),
        }));
      if (!options.length) return;
      const catId = item.item_data.categories && item.item_data.categories[0] && item.item_data.categories[0].id;
      const cat = categoryName[catId] || "Other";
      (categories[cat] = categories[cat] || []).push({ id: item.id, name: item.item_data.name, options });
    });

  const data = { categories };
  servicesCache = { at: Date.now(), data };
  return data;
}

/* ---------- GET /availability ---------- */
async function availability(sq, variationId, days) {
  const loc = await getLocation(sq);
  const tz = loc.timezone || "America/New_York";
  const start = new Date(Date.now() + 60 * 60 * 1000); // at least an hour out
  const end = new Date(start.getTime() + Math.max(days, 1) * 24 * 60 * 60 * 1000);
  const res = await sq("/bookings/availability/search", {
    query: {
      filter: {
        location_id: LOCATION_ID,
        start_at_range: { start_at: start.toISOString(), end_at: end.toISOString() },
        segment_filters: [{ service_variation_id: variationId }],
      },
    },
  });

  const dayFmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long", month: "long", day: "numeric" });
  const chipFmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric" });
  const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" });
  const keyFmt = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });

  const byDay = new Map();
  for (const a of res.availabilities || []) {
    const when = new Date(a.start_at);
    const key = keyFmt.format(when);
    if (!byDay.has(key)) byDay.set(key, { date: key, label: dayFmt.format(when), short: chipFmt.format(when), slots: [] });
    const seg = a.appointment_segments[0];
    byDay.get(key).slots.push({
      start_at: a.start_at,
      label: timeFmt.format(when),
      team_member_id: seg.team_member_id,
      version: seg.service_variation_version,
      minutes: seg.duration_minutes,
    });
  }
  return { timezone: tz, days: [...byDay.values()] };
}

/* ---------- POST /book ---------- */
function checkBooking(b) {
  if (!b || typeof b !== "object") return "Missing booking details.";
  if (b.website) return "Request blocked."; // honeypot filled in: a bot
  if (!/^[A-Z0-9]{10,40}$/.test(b.variation_id || "")) return "Unknown service.";
  if (!/^[A-Za-z0-9]{6,40}$/.test(b.team_member_id || "")) return "Unknown team member.";
  if (isNaN(Date.parse(b.start_at || ""))) return "Pick a time first.";
  if (!b.name || String(b.name).trim().length < 2) return "Please add your name.";
  if (String(b.phone || "").replace(/\D/g, "").length < 10) return "Please add a full phone number.";
  if (b.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return "That email doesn't look right.";
  return null;
}

function e164(phone) {
  const d = String(phone).replace(/\D/g, "");
  return d.length === 10 ? "+1" + d : d.length === 11 && d[0] === "1" ? "+" + d : "+" + d;
}

async function findOrCreateCustomer(sq, b) {
  const phone = e164(b.phone);
  const tries = [{ phone_number: { exact: phone } }];
  if (b.email) tries.push({ email_address: { exact: b.email.trim().toLowerCase() } });
  for (const filter of tries) {
    const found = await sq("/customers/search", { query: { filter }, limit: 1 });
    if (found.customers && found.customers.length) return found.customers[0].id;
  }
  const [given, ...rest] = String(b.name).trim().split(/\s+/);
  const created = await sq("/customers", {
    idempotency_key: crypto.randomUUID(),
    given_name: given.slice(0, 100),
    family_name: rest.join(" ").slice(0, 100) || undefined,
    phone_number: phone,
    email_address: b.email ? b.email.trim() : undefined,
    address: b.address ? { address_line_1: String(b.address).slice(0, 200) } : undefined,
    note: "Added by the website booking chat",
  });
  return created.customer.id;
}

async function book(sq, b) {
  const customerId = await findOrCreateCustomer(sq, b);
  const note = [
    b.service ? "Service: " + b.service : "",
    b.address ? "Address: " + b.address : "",
    b.details ? "Job details: " + b.details : "",
    "Phone: " + b.phone,
  ].filter(Boolean).join("\n").slice(0, 4000);

  const res = await sq("/bookings", {
    idempotency_key: crypto.randomUUID(),
    booking: {
      location_id: LOCATION_ID,
      start_at: b.start_at,
      customer_id: customerId,
      customer_note: note,
      appointment_segments: [{
        service_variation_id: b.variation_id,
        service_variation_version: Number(b.version) || undefined,
        team_member_id: b.team_member_id,
        duration_minutes: Number(b.minutes) || undefined,
      }],
    },
  });
  return { ok: true, booking_id: res.booking.id, status: res.booking.status };
}

/* ---------- Light abuse guard: 5 bookings per IP per 10 minutes ---------- */
const recent = new Map();
function tooMany(request) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const now = Date.now();
  const list = (recent.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  recent.set(ip, list);
  return list.length > 5;
}
