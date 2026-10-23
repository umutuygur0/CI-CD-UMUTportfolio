// Lightweight visitor logger: page views, project/report opens, clicks, time on page and scroll depth.
// Events go to /api/track. Visit /admin once on a device to exclude it from the logs.
(function () {
  "use strict";

  var ENDPOINT = "/api/track";

  function read(storage, key) {
    try { return window[storage].getItem(key); } catch (e) { return null; }
  }
  function write(storage, key, value) {
    try { window[storage].setItem(key, value); } catch (e) {}
  }
  function makeId() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }

  if (read("localStorage", "uu_notrack") === "1" || navigator.webdriver ||
      /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    return;
  }

  var isNew = false;
  var vid = read("localStorage", "uu_vid");
  if (!vid) {
    vid = makeId();
    isNew = true;
    write("localStorage", "uu_vid", vid);
  }
  var sid = read("sessionStorage", "uu_sid");
  if (!sid) {
    sid = makeId();
    write("sessionStorage", "uu_sid", sid);
  }

  // ?ref=kpmg style links identify who a link was sent to; the first one is remembered for return visits.
  var params = new URLSearchParams(location.search);
  var urlRef = params.get("ref") || params.get("utm_source") || "";
  if (urlRef) {
    write("sessionStorage", "uu_ref", urlRef);
    if (!read("localStorage", "uu_ref0")) write("localStorage", "uu_ref0", urlRef);
  }
  var ref = urlRef || read("sessionStorage", "uu_ref") || read("localStorage", "uu_ref0") || "";

  function send(type, data) {
    var payload = { type: type, vid: vid, sid: sid, ref: ref, path: location.pathname, hash: location.hash };
    for (var key in data) payload[key] = data[key];
    var body = JSON.stringify(payload);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "text/plain" }))) return;
    } catch (e) {}
    try {
      fetch(ENDPOINT, { method: "POST", body: body, keepalive: true, headers: { "Content-Type": "text/plain" } })
        .catch(function () {});
    } catch (e) {}
  }

  var timeZone = "";
  try { timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
  send("pageview", {
    referrer: document.referrer,
    lang: navigator.language,
    tz: timeZone,
    screen: screen.width + "x" + screen.height,
    isNew: isNew
  });

  // Project and report layers are opened with history.pushState("#project-…").
  var lastHash = location.hash;
  function trackView() {
    if (location.hash && location.hash !== lastHash) send("view", {});
    lastHash = location.hash;
  }
  var pushState = history.pushState;
  history.pushState = function () {
    var result = pushState.apply(this, arguments);
    trackView();
    return result;
  };
  window.addEventListener("hashchange", trackView);
  window.addEventListener("popstate", function () { lastHash = location.hash; });

  function clickLabel(el) {
    var custom = el.getAttribute("data-track");
    if (custom) return custom;
    if (el.hasAttribute("download")) return "download:" + (el.getAttribute("download") || el.pathname || "");
    var slug = el.getAttribute("data-preview-slug");
    if (slug) return "project:" + slug;
    return (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
  }
  document.addEventListener("click", function (event) {
    var el = event.target && event.target.closest
      ? event.target.closest("a, button, [data-preview-slug], [data-track]")
      : null;
    if (!el) return;
    send("click", { label: clickLabel(el), href: el.tagName === "A" ? el.href || "" : "" });
  }, true);

  var activeMs = 0;
  var visibleSince = document.visibilityState === "visible" ? Date.now() : 0;
  var maxScroll = 0;
  window.addEventListener("scroll", function () {
    var range = document.documentElement.scrollHeight - window.innerHeight;
    var percent = range > 0 ? Math.round(window.scrollY / range * 100) : 100;
    if (percent > maxScroll) maxScroll = Math.min(percent, 100);
  }, { passive: true });
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      if (visibleSince) {
        activeMs += Date.now() - visibleSince;
        visibleSince = 0;
      }
      send("leave", { dur: Math.round(activeMs / 1000), scroll: maxScroll });
    } else {
      visibleSince = Date.now();
    }
  });
})();
