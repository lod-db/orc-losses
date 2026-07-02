# Redesign prototypes

Three from-scratch design directions for [ukrainewarlosses.com](https://www.ukrainewarlosses.com), all
driven by the same [`russian-losses.json`](../russian-losses.json) dataset. They exist to compare
look-and-feel; whichever direction wins would then be built out properly (SEO meta/SSR, share cards,
sitemap, per-language URLs, etc.).

## Viewing

The prototypes are static — no build step, no dependencies. Serve the **repo root** (the pages fetch
`../../russian-losses.json`) and open `/prototypes/`:

```bash
python3 -m http.server 8130
# then visit http://localhost:8130/prototypes/
```

## The three directions

| Prototype | Path | Default theme | One-liner |
| --- | --- | --- | --- |
| A · Command Center | `command-center/` | Dark | Operations-dashboard: hero counters + deltas, sparkline card grid, explorable chart |
| B · The Briefing | `briefing/` | Light | Data-journalism: serif masthead, written lede, daily-report table, milestones |
| C · The Ledger | `ledger/` | Dark | Typography-first tally: giant animated counter, strict ledger grid, poster-like |

## Features common to all three

- **Light/dark theme** toggle (persisted, respects OS preference).
- **5 languages** — English, Français, Deutsch, Українська, Русский — via `shared/i18n.js`
  (persisted, respects browser language). Numbers and dates are formatted per locale with `Intl`.
- **Interactive charts** (dependency-free SVG, `shared/charts.js`): cumulative/daily modes and
  30d / 90d / 1yr / all ranges, tooltips, theme-aware colors.
- **Today / 7-day / 30-day deltas** computed from the dataset (retention hook — something new daily).
- **Credible references**: source link to the exact MoD report of the day, methodology/bias
  disclaimer, and a "Follow the war" section (DeepStateMap, Oryx, Ukraine Oversight,
  war.ukraine.ua, mod.gov.ua).
- Responsive down to phone widths; large hit targets and readable type sizes.

## URL parameters (handy for review)

- `?theme=light|dark` — force a theme
- `?lang=en|fr|de|uk|ru` — force a language
- `?static` — disable count-up animations (screenshots; also honors `prefers-reduced-motion`)

Example: `prototypes/ledger/?theme=light&lang=uk`

## Layout

```
prototypes/
├─ index.html           gallery page linking the three directions
├─ command-center/      prototype A
├─ briefing/            prototype B
├─ ledger/              prototype C
└─ shared/              data loading, i18n, theming, SVG charts, icon set
```
