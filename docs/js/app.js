/* Command Center — client script for ukrainewarlosses.com
 * All page text and initial numbers are server-rendered by Jekyll;
 * this script adds theming, locale date formatting, count-up flourish,
 * sparklines and the interactive chart. No dependencies. */
(function () {
  "use strict";

  var LOCALE = (window.UWL && window.UWL.locale) || document.documentElement.lang || "en";
  var I18N = (window.UWL && window.UWL.i18n) || {};
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fmtNum(n) { return new Intl.NumberFormat(LOCALE).format(n); }
  function fmtCompact(n) {
    return new Intl.NumberFormat(LOCALE, { notation: "compact", maximumFractionDigits: 1 }).format(n);
  }
  function fmtDate(iso, style) {
    return new Intl.DateTimeFormat(LOCALE, { dateStyle: style || "long", timeZone: "UTC" })
      .format(new Date(iso + "T00:00:00Z"));
  }

  /* ---------- theme ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("uwl-theme", next); } catch (e) { /* ignore */ }
    if (typeof gtag === "function") gtag("event", "theme", { theme: next });
    renderAll();
  });

  /* ---------- language switch ---------- */
  document.getElementById("lang-select").addEventListener("change", function (e) {
    window.location.href = e.target.value;
  });

  /* ---------- localized dates ---------- */
  document.querySelectorAll("time[data-datefmt]").forEach(function (el) {
    el.textContent = fmtDate(el.getAttribute("datetime"), el.dataset.datefmt);
  });

  /* ---------- native share ---------- */
  var shareBtn = document.getElementById("share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var data = { title: I18N.title, text: I18N.description, url: window.location.href };
      if (navigator.share) {
        navigator.share(data).catch(function () { /* dismissed */ });
      } else {
        navigator.clipboard && navigator.clipboard.writeText(window.location.href);
      }
      if (typeof gtag === "function") gtag("event", "share", { method: "native" });
    });
  }

  /* ---------- count-up flourish on hero numbers ---------- */
  function countUp(el) {
    var target = parseInt(el.dataset.value, 10);
    if (!target || REDUCED) return;
    var start = performance.now(), ms = 1100;
    function tick(now) {
      var p = Math.min(1, (now - start) / ms);
      el.textContent = fmtNum(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  countUp(document.getElementById("hero-number"));
  countUp(document.getElementById("equipment-number"));

  /* ================= charts ================= */
  var SVG_NS = "http://www.w3.org/2000/svg";
  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function svgEl(tag, attrs) {
    var el = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function niceTicks(max, count) {
    count = count || 4;
    if (max <= 0) return [0];
    var step = Math.pow(10, Math.floor(Math.log10(max / count)));
    var err = max / count / step;
    var mult = err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1;
    var s = step * mult, ticks = [];
    for (var v = 0; v <= max; v += s) ticks.push(v);
    return ticks;
  }

  function areaChart(container, series, opts) {
    opts = opts || {};
    container.innerHTML = "";
    if (!series.length) return;
    var W = 900, H = opts.height || 320;
    var padL = 54, padR = 14, padT = 14, padB = 30;
    var iw = W - padL - padR, ih = H - padT - padB;
    var accent = cssVar("--chart-accent"), grid = cssVar("--chart-grid"), text = cssVar("--chart-text");
    var maxV = Math.max.apply(null, series.map(function (d) { return d.v; }));
    function x(i) { return padL + (i / Math.max(1, series.length - 1)) * iw; }
    function y(v) { return padT + ih - (v / (maxV || 1)) * ih; }

    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "class": "chart" });
    svg.style.cssText = "width:100%;height:auto;display:block";

    var gid = "g" + Math.random().toString(36).slice(2, 8);
    var defs = svgEl("defs");
    var grad = svgEl("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
    grad.appendChild(svgEl("stop", { offset: "0%", "stop-color": accent, "stop-opacity": 0.32 }));
    grad.appendChild(svgEl("stop", { offset: "100%", "stop-color": accent, "stop-opacity": 0.02 }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    niceTicks(maxV).forEach(function (tv) {
      var gy = y(tv);
      svg.appendChild(svgEl("line", { x1: padL, x2: W - padR, y1: gy, y2: gy, stroke: grid, "stroke-width": 1 }));
      var lb = svgEl("text", { x: padL - 8, y: gy + 4, "text-anchor": "end", fill: text, "font-size": 12 });
      lb.textContent = fmtCompact(tv);
      svg.appendChild(lb);
    });

    var nLabels = Math.min(5, series.length);
    for (var k = 0; k < nLabels; k++) {
      var i0 = Math.round((k / (nLabels - 1 || 1)) * (series.length - 1));
      var lb2 = svgEl("text", {
        x: x(i0), y: H - 8,
        "text-anchor": k === 0 ? "start" : k === nLabels - 1 ? "end" : "middle",
        fill: text, "font-size": 12
      });
      lb2.textContent = fmtDate(series[i0].date, "medium");
      svg.appendChild(lb2);
    }

    var dLine = "";
    series.forEach(function (pt, i) {
      dLine += (i === 0 ? "M" : "L") + x(i).toFixed(1) + "," + y(pt.v).toFixed(1);
    });
    var dArea = dLine + "L" + x(series.length - 1).toFixed(1) + "," + y(0) + "L" + x(0).toFixed(1) + "," + y(0) + "Z";
    svg.appendChild(svgEl("path", { d: dArea, fill: "url(#" + gid + ")" }));
    svg.appendChild(svgEl("path", { d: dLine, fill: "none", stroke: accent, "stroke-width": 2.5, "stroke-linejoin": "round" }));

    var hoverLine = svgEl("line", { y1: padT, y2: padT + ih, stroke: text, "stroke-width": 1, "stroke-dasharray": "3,3", visibility: "hidden" });
    var hoverDot = svgEl("circle", { r: 4.5, fill: accent, stroke: cssVar("--surface") || "#fff", "stroke-width": 2, visibility: "hidden" });
    svg.appendChild(hoverLine);
    svg.appendChild(hoverDot);

    var tip = document.createElement("div");
    tip.className = "chart-tip";
    tip.style.display = "none";
    container.style.position = "relative";
    container.appendChild(svg);
    container.appendChild(tip);

    svg.addEventListener("pointermove", function (e) {
      var rect = svg.getBoundingClientRect();
      var px = ((e.clientX - rect.left) / rect.width) * W;
      var i = Math.max(0, Math.min(series.length - 1, Math.round(((px - padL) / iw) * (series.length - 1))));
      var cx = x(i), cy = y(series[i].v);
      hoverLine.setAttribute("x1", cx); hoverLine.setAttribute("x2", cx);
      hoverLine.setAttribute("visibility", "visible");
      hoverDot.setAttribute("cx", cx); hoverDot.setAttribute("cy", cy);
      hoverDot.setAttribute("visibility", "visible");
      tip.style.display = "block";
      tip.innerHTML = "<strong>" + fmtNum(series[i].v) + "</strong><span>" + fmtDate(series[i].date, "medium") + "</span>";
      var tipX = (cx / W) * rect.width;
      tip.style.left = Math.min(rect.width - 130, Math.max(0, tipX + 10)) + "px";
      tip.style.top = ((cy / H) * rect.height - 14) + "px";
    });
    svg.addEventListener("pointerleave", function () {
      hoverLine.setAttribute("visibility", "hidden");
      hoverDot.setAttribute("visibility", "hidden");
      tip.style.display = "none";
    });
  }

  function barChart(container, series, opts) {
    opts = opts || {};
    container.innerHTML = "";
    if (!series.length) return;

    var data = series;
    if (series.length > 220) {
      data = [];
      for (var i = 0; i < series.length; i += 7) {
        var chunk = series.slice(i, i + 7);
        data.push({
          date: chunk[chunk.length - 1].date,
          v: chunk.reduce(function (a, b) { return a + b.v; }, 0)
        });
      }
    }

    var W = 900, H = opts.height || 300;
    var padL = 54, padR = 14, padT = 10, padB = 28;
    var iw = W - padL - padR, ih = H - padT - padB;
    var accent = cssVar("--chart-accent2"), grid = cssVar("--chart-grid"), text = cssVar("--chart-text");
    var maxV = Math.max.apply(null, data.map(function (d) { return d.v; }));

    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "class": "chart" });
    svg.style.cssText = "width:100%;height:auto;display:block";

    niceTicks(maxV, 3).forEach(function (tv) {
      var gy = padT + ih - (tv / (maxV || 1)) * ih;
      svg.appendChild(svgEl("line", { x1: padL, x2: W - padR, y1: gy, y2: gy, stroke: grid }));
      var lb = svgEl("text", { x: padL - 8, y: gy + 4, "text-anchor": "end", fill: text, "font-size": 12 });
      lb.textContent = fmtCompact(tv);
      svg.appendChild(lb);
    });

    var bw = Math.max(1.2, (iw / data.length) * 0.72);
    data.forEach(function (pt, i) {
      var bx = padL + (i / data.length) * iw + ((iw / data.length) - bw) / 2;
      var bh = (pt.v / (maxV || 1)) * ih;
      var r = svgEl("rect", {
        x: bx, y: padT + ih - bh, width: bw, height: Math.max(0, bh),
        rx: Math.min(2, bw / 2), fill: accent, opacity: 0.85
      });
      var title = svgEl("title");
      title.textContent = fmtDate(pt.date, "medium") + ": " + fmtNum(pt.v);
      r.appendChild(title);
      svg.appendChild(r);
    });

    var nLabels = Math.min(5, data.length);
    for (var k = 0; k < nLabels; k++) {
      var i1 = Math.round((k / (nLabels - 1 || 1)) * (data.length - 1));
      var lb2 = svgEl("text", {
        x: padL + (i1 / data.length) * iw, y: H - 8,
        "text-anchor": k === 0 ? "start" : k === nLabels - 1 ? "end" : "middle",
        fill: text, "font-size": 12
      });
      lb2.textContent = fmtDate(data[i1].date, "medium");
      svg.appendChild(lb2);
    }
    container.appendChild(svg);
  }

  function sparkline(container, series) {
    container.innerHTML = "";
    if (series.length < 2) return;
    var W = 120, H = 34;
    var accent = cssVar("--chart-accent");
    var vals = series.map(function (d) { return d.v; });
    var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
    function x(i) { return (i / (series.length - 1)) * W; }
    function y(v) { return H - 3 - ((v - min) / (max - min || 1)) * (H - 6); }

    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "spark", "aria-hidden": "true" });
    svg.style.cssText = "width:100%;height:auto;display:block";
    var d = "";
    series.forEach(function (pt, i) { d += (i === 0 ? "M" : "L") + x(i).toFixed(1) + "," + y(pt.v).toFixed(1); });
    svg.appendChild(svgEl("path", { d: d, fill: "none", stroke: accent, "stroke-width": 2, "stroke-linejoin": "round", opacity: 0.9 }));
    svg.appendChild(svgEl("circle", { cx: x(series.length - 1), cy: y(series[series.length - 1].v), r: 2.6, fill: accent }));
    container.appendChild(svg);
  }

  /* ================= data + wiring ================= */
  var ROWS = null;
  var selKey = "personnel", selLabel = null, selMode = "cum", selRange = "all";

  function series(key) {
    return ROWS.filter(function (r) { return r[key] != null; })
      .map(function (r) { return { date: r.date, v: r[key] }; });
  }
  function dailySeries(key) {
    var s = series(key), out = [];
    for (var i = 1; i < s.length; i++) {
      out.push({ date: s[i].date, v: Math.max(0, s[i].v - s[i - 1].v) });
    }
    return out;
  }
  function sliceRange(s, range) {
    if (range === "all") return s;
    var days = range === "1y" ? 365 : parseInt(range, 10);
    return s.slice(-days);
  }

  function renderChart() {
    if (!ROWS) return;
    document.getElementById("chart-title").textContent =
      selLabel + " — " + (selMode === "cum" ? I18N.cumulative : I18N.daily);
    var box = document.getElementById("main-chart");
    if (selMode === "cum") areaChart(box, sliceRange(series(selKey), selRange));
    else barChart(box, sliceRange(dailySeries(selKey), selRange));
  }

  function renderSparklines() {
    if (!ROWS) return;
    document.querySelectorAll(".stat").forEach(function (btn) {
      sparkline(btn.querySelector(".spark-box"), series(btn.dataset.key).slice(-120));
    });
  }

  function renderAll() { renderChart(); renderSparklines(); }

  /* segmented controls (SSR'd buttons) */
  function wireSeg(id, attr, onPick) {
    var seg = document.getElementById(id);
    seg.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        seg.querySelectorAll("button").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        onPick(b.dataset[attr]);
      });
    });
  }
  wireSeg("mode-seg", "mode", function (v) { selMode = v; renderChart(); });
  wireSeg("range-seg", "range", function (v) { selRange = v; renderChart(); });

  /* stat cards select the chart category */
  document.querySelectorAll(".stat").forEach(function (btn) {
    if (btn.getAttribute("aria-pressed") === "true") selLabel = btn.dataset.label;
    btn.addEventListener("click", function () {
      document.querySelectorAll(".stat").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      selKey = btn.dataset.key;
      selLabel = btn.dataset.label;
      renderChart();
      document.getElementById("trends").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "nearest" });
      if (typeof gtag === "function") gtag("event", "category", { category: selKey });
    });
  });

  fetch("/assets/russian-losses.json")
    .then(function (res) { return res.json(); })
    .then(function (json) {
      json.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      ROWS = json;
      renderAll();
    });
})();
