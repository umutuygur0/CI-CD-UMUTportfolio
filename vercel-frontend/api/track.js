const { redis, header, clientIp } = require("./_redis");

const MAX_EVENTS = 10000;
const RATE_LIMIT_PER_MINUTE = 120;
const ORG_CACHE_SECONDS = 60 * 60 * 24 * 30;
const ORG_RETRY_SECONDS = 60 * 60;
const EVENT_TYPES = new Set(["pageview", "view", "click", "leave"]);
const BOT_USER_AGENT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|embedly|curl|wget|python|axios|node-fetch|go-http/i;

function text(value, max) {
  return typeof value === "string" ? value.slice(0, max) : "";
}

function seconds(value, max) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.min(Math.round(number), max) : 0;
}

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}

function parseBody(body) {
  if (Buffer.isBuffer(body)) body = body.toString("utf8");
  if (typeof body === "string") {
    if (body.length > 4096) return null;
    try {
      return JSON.parse(body);
    } catch (error) {
      return null;
    }
  }
  return body && typeof body === "object" ? body : null;
}

// Resolves the network owner of an IP (e.g. a company or university network).
async function lookupOrg(ip) {
  try {
    const response = await fetch("https://ipwho.is/" + encodeURIComponent(ip) + "?fields=success,connection", {
      signal: AbortSignal.timeout(1500)
    });
    const data = await response.json();
    if (!data.success || !data.connection) return "";
    const { org, isp, domain } = data.connection;
    const name = org || isp || "";
    return text(domain && name ? name + " (" + domain + ")" : name || domain || "", 160);
  } catch (error) {
    return "";
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const userAgent = header(req, "user-agent");
  const input = parseBody(req.body);
  if (!input || !EVENT_TYPES.has(input.type) || BOT_USER_AGENT.test(userAgent)) {
    return res.status(204).end();
  }

  const ip = clientIp(req);
  const rateKey = "rl:" + ip + ":" + Math.floor(Date.now() / 60000);

  try {
    const [requestCount, , cachedOrg] = await redis([
      ["INCR", rateKey],
      ["EXPIRE", rateKey, 120],
      ["GET", "org:" + ip]
    ]);
    if (requestCount > RATE_LIMIT_PER_MINUTE) return res.status(429).end();

    let org = cachedOrg;
    if (org === null && ip && input.type === "pageview") {
      org = await lookupOrg(ip);
      await redis([["SET", "org:" + ip, org, "EX", org ? ORG_CACHE_SECONDS : ORG_RETRY_SECONDS]]);
    }

    const event = {
      t: Date.now(),
      type: input.type,
      vid: text(input.vid, 40),
      sid: text(input.sid, 40),
      path: text(input.path, 200),
      hash: text(input.hash, 200),
      label: text(input.label, 120),
      href: text(input.href, 300),
      ref: text(input.ref, 80),
      referrer: text(input.referrer, 300),
      lang: text(input.lang, 20),
      tz: text(input.tz, 60),
      screen: text(input.screen, 20),
      isNew: input.isNew === true,
      dur: seconds(input.dur, 86400),
      scroll: seconds(input.scroll, 100),
      country: header(req, "x-vercel-ip-country"),
      region: decode(header(req, "x-vercel-ip-country-region")),
      city: decode(header(req, "x-vercel-ip-city")),
      ip,
      org: org || "",
      ua: input.type === "pageview" ? text(userAgent, 250) : ""
    };
    for (const key of Object.keys(event)) {
      if (event[key] === "" || event[key] === 0 || event[key] === false) delete event[key];
    }

    await redis([
      ["LPUSH", "ev", JSON.stringify(event)],
      ["LTRIM", "ev", 0, MAX_EVENTS - 1]
    ]);
  } catch (error) {
    console.error("track failed:", error.message);
  }

  return res.status(204).end();
};
