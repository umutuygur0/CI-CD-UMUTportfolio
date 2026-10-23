// Minimal Upstash Redis REST client (no dependencies).
// Vercel Marketplace's Upstash integration sets KV_REST_API_*; a direct Upstash setup uses UPSTASH_REDIS_REST_*.
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("Redis environment variables are missing");
  }
  const response = await fetch(REDIS_URL.replace(/\/$/, "") + "/pipeline", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + REDIS_TOKEN,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands)
  });
  if (!response.ok) {
    throw new Error("Redis request failed with status " + response.status);
  }
  const results = await response.json();
  return results.map((item) => {
    if (item.error) throw new Error("Redis error: " + item.error);
    return item.result;
  });
}

function header(req, name) {
  const value = req.headers[name];
  return (Array.isArray(value) ? value[0] : value) || "";
}

function clientIp(req) {
  return (header(req, "x-real-ip") || header(req, "x-forwarded-for").split(",")[0]).trim();
}

module.exports = { redis, header, clientIp };
