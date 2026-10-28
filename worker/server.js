/* Runs the same booking worker as a plain Node server (for Render or any Node host).
   Start: node worker/server.js   (needs SQUARE_TOKEN in the environment) */
import http from "node:http";
import worker from "./square-booking.js";

const env = { SQUARE_TOKEN: process.env.SQUARE_TOKEN };
const port = process.env.PORT || 10000;

http.createServer(async (req, res) => {
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = chunks.length ? Buffer.concat(chunks) : undefined;
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) if (v != null) headers.set(k, Array.isArray(v) ? v.join(", ") : v);
    const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
    headers.set("CF-Connecting-IP", ip);
    const request = new Request("http://localhost" + req.url, {
      method: req.method,
      headers,
      body: ["GET", "HEAD", "OPTIONS"].includes(req.method) ? undefined : body,
    });
    const response = await worker.fetch(request, env);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
}).listen(port, () => console.log("Booking server listening on " + port));
