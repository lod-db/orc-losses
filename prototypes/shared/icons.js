/* Inline SVG icon set (stroke style, uses currentColor).
 * Deliberately simple, readable silhouettes at 20–32px. */
"use strict";

const ICONS = {
  helmet: `<path d="M4 14a8 8 0 0 1 16 0"/><path d="M3 14h18"/><path d="M7 14v2.5M17 14v2.5"/>`,
  tank: `<rect x="4" y="13" width="16" height="5" rx="2.5"/><rect x="8" y="9" width="7" height="4" rx="1"/><path d="M15 10.5h6"/><circle cx="8" cy="15.5" r="0.6"/><circle cx="12" cy="15.5" r="0.6"/><circle cx="16" cy="15.5" r="0.6"/>`,
  afv: `<path d="M4 15l2-4h9l5 2v3.5h-16z"/><circle cx="8" cy="17" r="1.7"/><circle cx="15" cy="17" r="1.7"/><path d="M13 11V8.5h4"/>`,
  artillery: `<circle cx="8" cy="16" r="3"/><path d="M8 13l11-8"/><path d="M16 6.5l3-1.5M8 16l6 2"/>`,
  mlrs: `<rect x="3" y="14" width="15" height="3.5" rx="1"/><circle cx="7" cy="18.5" r="1.3"/><circle cx="13" cy="18.5" r="1.3"/><path d="M6 14l10-7 3 4-9 6"/><path d="M9.5 11.5l2.5 3.5M12.5 9.5l2.5 3.5"/>`,
  radar: `<path d="M12 21v-6"/><path d="M8 21h8"/><path d="M6 5a8.5 8.5 0 0 0 12 12"/><path d="M9 8a4.5 4.5 0 0 0 6.4 6.4"/><path d="M12 12l6-6"/><circle cx="18.5" cy="5.5" r="1.2"/>`,
  jet: `<path d="M12 3l2 7 7 3.5v2l-7-1.5-1 4 2.5 2v1.5L12 20l-3.5 1.5V20l2.5-2-1-4-7 1.5v-2L10 10z"/>`,
  helicopter: `<path d="M3 5h14"/><path d="M10 5v3"/><ellipse cx="10" cy="12" rx="5.5" ry="4"/><path d="M15.5 11l5.5-1v2.5l-5.5.5"/><path d="M19 9.5V13"/><path d="M6 19h9M10 16v3"/>`,
  uav: `<circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1.5"/><path d="M7 7.5l3.5 3.5M17 7.5l-3.5 3.5M7 16.5l3.5-3.5M17 16.5l-3.5-3.5"/>`,
  missile: `<path d="M12 2c2.5 2.5 3 6 3 9v5h-6v-5c0-3 .5-6.5 3-9z"/><path d="M9 13l-3 4h3M15 13l3 4h-3"/><path d="M12 16v5"/>`,
  ship: `<path d="M3 15h18l-2.5 4.5h-13z"/><path d="M6 15v-3h5v-3h5v6"/><path d="M8.5 9V6.5"/>`,
  submarine: `<ellipse cx="12" cy="14" rx="9" ry="3.6"/><path d="M9 10.5V8h5v2.5"/><path d="M11.5 8V5.5"/><circle cx="7.5" cy="14" r="0.5"/><circle cx="12" cy="14.6" r="0.5"/><circle cx="16.5" cy="14" r="0.5"/>`,
  truck: `<rect x="2.5" y="8" width="12" height="8" rx="1"/><path d="M14.5 10.5h4l3 3v2.5h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/>`,
  dozer: `<rect x="4" y="10" width="10" height="6" rx="1.5"/><path d="M14 12h3l2 4"/><path d="M19 11v7"/><circle cx="7" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><path d="M6 10V7.5h5"/>`,
  calendar: `<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>`,
  external: `<path d="M14 5h5v5"/><path d="M19 5l-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>`,
  sun: `<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>`,
  moon: `<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>`,
  globe: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18-3-3.5-3-14.5 0-18z"/>`,
  arrowUp: `<path d="M12 19V5M5 12l7-7 7 7"/>`,
  check: `<path d="M4 12.5l5 5L20 6.5"/>`,
  github: `<path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.65-.2.65-.45v-1.7c-2.65.55-3.2-1.25-3.2-1.25-.45-1.1-1.05-1.4-1.05-1.4-.85-.6.05-.6.05-.6.95.05 1.45.95 1.45.95.85 1.45 2.2 1.05 2.75.8.1-.6.35-1.05.6-1.3-2.1-.25-4.3-1.05-4.3-4.7 0-1.05.35-1.9 1-2.55-.1-.25-.45-1.2.1-2.55 0 0 .8-.25 2.6 1a9 9 0 0 1 4.75 0c1.8-1.25 2.6-1 2.6-1 .55 1.35.2 2.3.1 2.55.6.65 1 1.5 1 2.55 0 3.65-2.25 4.45-4.35 4.7.35.3.65.9.65 1.8v2.65c0 .25.15.55.65.45A9.5 9.5 0 0 0 12 2.5z"/>`,
  map: `<path d="M9 4L3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4z"/><path d="M9 4v13M15 6.5v13"/>`,
  eye: `<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>`,
  doc: `<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 16.5h6"/>`,
  shield: `<path d="M12 3l7.5 3v5.5c0 4.5-3 8-7.5 9.5-4.5-1.5-7.5-5-7.5-9.5V6z"/>`,
  play: `<circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z"/>`,
};

function icon(name, size = 24, cls = "") {
  const body = ICONS[name] || ICONS.doc;
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
