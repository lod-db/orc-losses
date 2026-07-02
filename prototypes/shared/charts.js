/* Tiny dependency-free SVG chart helpers shared by the prototypes.
 * All charts read their colors from CSS custom properties so they
 * re-render correctly on theme change. */
"use strict";

const SVG_NS = "http://www.w3.org/2000/svg";

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
  return el;
}

function niceTicks(max, count = 4) {
  if (max <= 0) return [0];
  const step = Math.pow(10, Math.floor(Math.log10(max / count)));
  const err = max / count / step;
  const mult = err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1;
  const s = step * mult;
  const ticks = [];
  for (let v = 0; v <= max; v += s) ticks.push(v);
  return ticks;
}

/* Cumulative area/line chart with x/y axes, hover crosshair, and tooltip. */
function areaChart(container, series, opts = {}) {
  container.innerHTML = "";
  if (!series.length) return;
  const W = 900, H = opts.height || 320;
  const padL = 54, padR = 14, padT = 14, padB = 30;
  const iw = W - padL - padR, ih = H - padT - padB;

  const accent = opts.color || cssVar("--chart-accent") || "#2f6fed";
  const grid = cssVar("--chart-grid") || "#88888833";
  const text = cssVar("--chart-text") || "#888";

  const xs = series.map((_, i) => i);
  const maxV = Math.max(...series.map((d) => d.v));
  const x = (i) => padL + (i / Math.max(1, xs.length - 1)) * iw;
  const y = (v) => padT + ih - (v / (maxV || 1)) * ih;

  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", class: "chart" });
  svg.style.width = "100%";
  svg.style.height = "auto";
  svg.style.display = "block";

  // gradient fill
  const gid = "g" + Math.random().toString(36).slice(2, 8);
  const defs = svgEl("defs");
  const grad = svgEl("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
  const s1 = svgEl("stop", { offset: "0%", "stop-color": accent, "stop-opacity": 0.32 });
  const s2 = svgEl("stop", { offset: "100%", "stop-color": accent, "stop-opacity": 0.02 });
  grad.append(s1, s2); defs.appendChild(grad); svg.appendChild(defs);

  // gridlines + y labels
  for (const tv of niceTicks(maxV)) {
    const gy = y(tv);
    svg.appendChild(svgEl("line", { x1: padL, x2: W - padR, y1: gy, y2: gy, stroke: grid, "stroke-width": 1 }));
    const label = svgEl("text", { x: padL - 8, y: gy + 4, "text-anchor": "end", fill: text, "font-size": 12 });
    label.textContent = fmtCompact(tv);
    svg.appendChild(label);
  }

  // x labels: ~5 spread across
  const nLabels = Math.min(5, series.length);
  for (let k = 0; k < nLabels; k++) {
    const i = Math.round((k / (nLabels - 1 || 1)) * (series.length - 1));
    const label = svgEl("text", {
      x: x(i), y: H - 8, "text-anchor": k === 0 ? "start" : k === nLabels - 1 ? "end" : "middle",
      fill: text, "font-size": 12,
    });
    label.textContent = fmtDate(series[i].date, "medium");
    svg.appendChild(label);
  }

  let dLine = "", dArea = "";
  series.forEach((pt, i) => {
    const cmd = i === 0 ? "M" : "L";
    dLine += `${cmd}${x(i).toFixed(1)},${y(pt.v).toFixed(1)}`;
  });
  dArea = dLine + `L${x(series.length - 1).toFixed(1)},${y(0)}L${x(0).toFixed(1)},${y(0)}Z`;

  svg.appendChild(svgEl("path", { d: dArea, fill: `url(#${gid})` }));
  svg.appendChild(svgEl("path", { d: dLine, fill: "none", stroke: accent, "stroke-width": 2.5, "stroke-linejoin": "round" }));

  // hover crosshair + tooltip
  const hoverLine = svgEl("line", { y1: padT, y2: padT + ih, stroke: text, "stroke-width": 1, "stroke-dasharray": "3,3", visibility: "hidden" });
  const hoverDot = svgEl("circle", { r: 4.5, fill: accent, stroke: cssVar("--surface") || "#fff", "stroke-width": 2, visibility: "hidden" });
  svg.append(hoverLine, hoverDot);

  const tip = document.createElement("div");
  tip.className = "chart-tip";
  tip.style.display = "none";
  container.style.position = "relative";
  container.append(svg, tip);

  svg.addEventListener("pointermove", (e) => {
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.max(0, Math.min(series.length - 1, Math.round(((px - padL) / iw) * (series.length - 1))));
    const cx = x(i), cy = y(series[i].v);
    hoverLine.setAttribute("x1", cx); hoverLine.setAttribute("x2", cx);
    hoverLine.setAttribute("visibility", "visible");
    hoverDot.setAttribute("cx", cx); hoverDot.setAttribute("cy", cy);
    hoverDot.setAttribute("visibility", "visible");
    tip.style.display = "block";
    tip.innerHTML = `<strong>${fmtNum(series[i].v)}</strong><span>${fmtDate(series[i].date, "medium")}</span>`;
    const tipX = (cx / W) * rect.width;
    tip.style.left = Math.min(rect.width - 130, Math.max(0, tipX + 10)) + "px";
    tip.style.top = (cy / H) * rect.height - 14 + "px";
  });
  svg.addEventListener("pointerleave", () => {
    hoverLine.setAttribute("visibility", "hidden");
    hoverDot.setAttribute("visibility", "hidden");
    tip.style.display = "none";
  });
}

/* Daily bar chart (thin bars, tooltip). Aggregates to weeks when the range is long. */
function barChart(container, series, opts = {}) {
  container.innerHTML = "";
  if (!series.length) return;

  let data = series;
  if (series.length > 220) {
    data = [];
    for (let i = 0; i < series.length; i += 7) {
      const chunk = series.slice(i, i + 7);
      data.push({ date: chunk[chunk.length - 1].date, v: chunk.reduce((a, b) => a + b.v, 0) });
    }
  }

  const W = 900, H = opts.height || 220;
  const padL = 54, padR = 14, padT = 10, padB = 28;
  const iw = W - padL - padR, ih = H - padT - padB;
  const accent = opts.color || cssVar("--chart-accent2") || cssVar("--chart-accent") || "#d97706";
  const grid = cssVar("--chart-grid") || "#88888833";
  const text = cssVar("--chart-text") || "#888";
  const maxV = Math.max(...data.map((d) => d.v));

  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", class: "chart" });
  svg.style.width = "100%"; svg.style.height = "auto"; svg.style.display = "block";

  for (const tv of niceTicks(maxV, 3)) {
    const gy = padT + ih - (tv / (maxV || 1)) * ih;
    svg.appendChild(svgEl("line", { x1: padL, x2: W - padR, y1: gy, y2: gy, stroke: grid }));
    const label = svgEl("text", { x: padL - 8, y: gy + 4, "text-anchor": "end", fill: text, "font-size": 12 });
    label.textContent = fmtCompact(tv);
    svg.appendChild(label);
  }

  const bw = Math.max(1.2, (iw / data.length) * 0.72);
  data.forEach((pt, i) => {
    const bx = padL + (i / data.length) * iw + ((iw / data.length) - bw) / 2;
    const bh = (pt.v / (maxV || 1)) * ih;
    const r = svgEl("rect", { x: bx, y: padT + ih - bh, width: bw, height: Math.max(0, bh), rx: Math.min(2, bw / 2), fill: accent, opacity: 0.85 });
    const title = svgEl("title");
    title.textContent = `${fmtDate(pt.date, "medium")}: ${fmtNum(pt.v)}`;
    r.appendChild(title);
    svg.appendChild(r);
  });

  const nLabels = Math.min(5, data.length);
  for (let k = 0; k < nLabels; k++) {
    const i = Math.round((k / (nLabels - 1 || 1)) * (data.length - 1));
    const label = svgEl("text", {
      x: padL + (i / data.length) * iw, y: H - 8,
      "text-anchor": k === 0 ? "start" : k === nLabels - 1 ? "end" : "middle",
      fill: text, "font-size": 12,
    });
    label.textContent = fmtDate(data[i].date, "medium");
    svg.appendChild(label);
  }
  container.appendChild(svg);
}

/* Minimal sparkline for stat cards. */
function sparkline(container, series, opts = {}) {
  container.innerHTML = "";
  if (series.length < 2) return;
  const W = 120, H = opts.height || 34;
  const accent = opts.color || cssVar("--chart-accent") || "#2f6fed";
  const min = Math.min(...series.map((d) => d.v));
  const max = Math.max(...series.map((d) => d.v));
  const x = (i) => (i / (series.length - 1)) * W;
  const y = (v) => H - 3 - ((v - min) / (max - min || 1)) * (H - 6);

  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "spark", "aria-hidden": "true" });
  svg.style.width = "100%"; svg.style.height = "auto"; svg.style.display = "block";
  let d = "";
  series.forEach((pt, i) => { d += `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(pt.v).toFixed(1)}`; });
  svg.appendChild(svgEl("path", { d, fill: "none", stroke: accent, "stroke-width": 2, "stroke-linejoin": "round", opacity: 0.9 }));
  svg.appendChild(svgEl("circle", { cx: x(series.length - 1), cy: y(series[series.length - 1].v), r: 2.6, fill: accent }));
  container.appendChild(svg);
}

/* Slice a cumulative or daily series by range key: 'all' | '1y' | '90' | '30'. */
function sliceRange(series, range) {
  if (range === "all") return series;
  const days = range === "1y" ? 365 : parseInt(range, 10);
  return series.slice(-days);
}
