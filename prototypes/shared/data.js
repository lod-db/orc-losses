/* Shared data loading + statistics for all prototypes. */
"use strict";

const WAR_START_ISO = "2022-02-24";

const CATEGORIES = [
  { key: "personnel",         icon: "helmet",    equipment: false },
  { key: "tanks",             icon: "tank",      equipment: true },
  { key: "afvs",              icon: "afv",       equipment: true },
  { key: "artillery",         icon: "artillery", equipment: true },
  { key: "rocketSystems",     icon: "mlrs",      equipment: true },
  { key: "airDefense",        icon: "radar",     equipment: true },
  { key: "fixedWingAircraft", icon: "jet",       equipment: true },
  { key: "rotaryWingAircraft",icon: "helicopter",equipment: true },
  { key: "uavs",              icon: "uav",       equipment: true },
  { key: "missiles",          icon: "missile",   equipment: true },
  { key: "ships",             icon: "ship",      equipment: true },
  { key: "submarines",        icon: "submarine", equipment: true },
  { key: "unarmoredVehicles", icon: "truck",     equipment: true },
  { key: "specialEquipment",  icon: "dozer",     equipment: true },
];

async function loadLossData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load dataset: " + res.status);
  const raw = await res.json();
  raw.sort((a, b) => (a.date < b.date ? -1 : 1)); // oldest -> newest
  return buildStats(raw);
}

function buildStats(rows) {
  const latest = rows[rows.length - 1];
  const latestDate = new Date(latest.date + "T00:00:00Z");
  const warStart = new Date(WAR_START_ISO + "T00:00:00Z");
  const dayOfWar = Math.round((latestDate - warStart) / 86400000) + 1;

  // index rows by date for fast lookback
  const byDate = new Map(rows.map((r) => [r.date, r]));

  function rowDaysBack(n) {
    const d = new Date(latestDate.getTime() - n * 86400000);
    const iso = d.toISOString().slice(0, 10);
    if (byDate.has(iso)) return byDate.get(iso);
    // fall back to positional lookup if a date is missing
    const idx = rows.length - 1 - n;
    return idx >= 0 ? rows[idx] : null;
  }

  const prev = rowDaysBack(1);
  const week = rowDaysBack(7);
  const month = rowDaysBack(30);

  const cats = {};
  let equipmentTotal = 0;
  let equipmentToday = 0;
  for (const c of CATEGORIES) {
    const total = latest[c.key] ?? 0;
    const d1 = prev && prev[c.key] != null ? total - prev[c.key] : 0;
    const d7 = week && week[c.key] != null ? total - week[c.key] : null;
    const d30 = month && month[c.key] != null ? total - month[c.key] : null;
    cats[c.key] = { total, d1, d7, d30, icon: c.icon, equipment: c.equipment };
    if (c.equipment) {
      equipmentTotal += total;
      equipmentToday += d1;
    }
  }

  return {
    rows,
    latest,
    latestDate,
    dayOfWar,
    cats,
    equipmentTotal,
    equipmentToday,
    series(key) {
      return rows
        .filter((r) => r[key] != null)
        .map((r) => ({ date: r.date, v: r[key] }));
    },
    dailySeries(key) {
      const s = this.series(key);
      const out = [];
      for (let i = 1; i < s.length; i++) {
        out.push({ date: s[i].date, v: Math.max(0, s[i].v - s[i - 1].v) });
      }
      return out;
    },
    // date on which cumulative `key` first crossed `value`
    crossing(key, value) {
      for (const r of rows) if (r[key] != null && r[key] >= value) return r.date;
      return null;
    },
  };
}
