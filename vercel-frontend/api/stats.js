const crypto = require("crypto");
const { redis, header, clientIp } = require("./_redis");

const MAX_EVENTS = 10000;
const CHUNK_SIZE = 1000;
const MAX_FAILED_LOGINS = 10;
const LOCKOUT_SECONDS = 15 * 60;

function sameSecret(a, b) {
  const hashA = crypto.createHash("sha256").update(String(a)).digest();
  const hashB = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }

  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    return res.status(503).json({ error: "ADMIN_PASSWORD is not configured" });
  }

  try {
    const failKey = "authfail:" + clientIp(req);
    const [failedLogins] = await redis([["GET", failKey]]);
    if (Number(failedLogins) >= MAX_FAILED_LOGINS) {
      return res.status(429).json({ error: "Too many failed attempts" });
    }
    if (!sameSecret(header(req, "x-admin-key"), secret)) {
      await redis([["INCR", failKey], ["EXPIRE", failKey, LOCKOUT_SECONDS]]);
      return res.status(401).json({ error: "Unauthorized" });
    }

    const limit = Math.min(Math.max(Number(req.query.limit) || 3000, 1), MAX_EVENTS);
    const events = [];
    for (let start = 0; start < limit; start += CHUNK_SIZE) {
      const end = Math.min(start + CHUNK_SIZE, limit) - 1;
      const [chunk] = await redis([["LRANGE", "ev", start, end]]);
      for (const item of chunk) {
        try {
          events.push(JSON.parse(item));
        } catch (error) {
          // Skip malformed rows.
        }
      }
      if (chunk.length < end - start + 1) break;
    }
    const [total] = await redis([["LLEN", "ev"]]);

    return res.status(200).json({ total, events });
  } catch (error) {
    console.error("stats failed:", error.message);
    return res.status(500).json({ error: "Could not read logs" });
  }
};
