# WETTER landing — LLM brief

Machine-oriented product brief for agents. Humans use the [README](../README.md).

## What this repo is

**PiMaV/WETTER** is the **landing page and framework docs only** (`index.html`, `css/`, `js/`, `docs/`, assets). It is **not** a tool monorepo. Do not put BLITZ, WOLKE, EVT, DONNER, or datasets into this clone.

Live site: [wetter.mess.engineering](https://wetter.mess.engineering) via **GitHub Pages** from `main` `/` (CNAME). Push to `main` updates the site; there is no auto GitHub Release for this repo.

## Product story (visitor)

- **Core:** **BLITZ** (2D analyze) and **DONNER** (3D/XR explore) are the viewers.
- Hero manifesto: *Images aren't just pixels—they are structured data.*
- **Three paths into the viewers:**
  - **Direct** — raw data → viewers
  - **Curated** — DAMPF → KEIM → WOLKE → viewers
  - **Converted** — sidecars (Event camera Streamer, DGM mosaic, HIKMICRO, DICOM) → viewers
- Starts are on the viewer cards (Download / Open in browser + GitHub). No duplicate primary CTAs in the hero.
- Mid-row tool cards (WOLKE, DAMPF, KEIM, Event camera Streamer, DGM mosaic) are whole-card GitHub links with hover/tap tips that say so. No extra GitHub buttons on those cards.

## Landing diagram contract

| Layer | Implementation |
|-------|----------------|
| Atmosphere | Full-page `.page-bg` image; internal **B** toggles `body.is-bg-off` (no UI hint) |
| Truth | Real tool screenshots + Raw Data Ocean mosaic in HTML (tiles have short data-type tips) |
| Logic | SVG edges drawn by [`js/ecosystem.js`](../js/ecosystem.js) from a small edge list |

- Desktop (≥821px): compact CSS grid — **Viewers** on top; mid-row **Curated | Direct | Sidecars** (narrow Direct); Raw Data Ocean below. Row gap ~100px. Curated: WOLKE full-width on top, DAMPF | KEIM below. Sidecars: Event camera Streamer + DGM mosaic. Direct text on a translucent pad. **Edges:** straight vertical lines **centered on the cards** (WOLKE / Event camera Streamer). Direct hop sits in the gap between BLITZ and DONNER. Screenshots from `assets/screenshots/conv/`.
- **Edge colors (two-hop):** Ocean→card hops are `direct` (white). Cyan (`wolke`) on DAMPF/KEIM→WOLKE→BLITZ. Amber (`sidecar`) on Event camera Streamer→DONNER. Path names on group heads.
- Hero manifesto: *Images aren't just pixels—they are structured data.* Starts on viewer cards; no duplicate primary CTAs in the hero.
- No exclusive hover dimming; soft emphasis only on curated/sidecar families.
- Tablet / phone: normal flow; order Viewers → Curated | Direct | Sidecars → Ocean; SVG edges off. Ocean bands stack; tooltips tap-toggle `.is-tip-open` when hover is coarse.
- Brand names stay uppercase: **WETTER**, **WOLKE**, **DAMPF**, **KEIM**, **BLITZ**, **DONNER**.

## Do / don’t

**Do:** edit HTML cards, CSS layout, and the edge list in `ecosystem.js`; keep README and this brief aligned with the three-path story.

**Don’t:** reintroduce a mandatory linear pipeline as the landing headline; put primary app CTAs back in the hero when cards already expose them; commit tool code or large datasets here; build an Inkscape “SVG master” for all card content (superseded — see [`framework-visual-concept.md`](framework-visual-concept.md)); invent translated brand aliases; mix FUNKE backlog into landing work.

## Key paths

| Path | Role |
|------|------|
| `index.html` | Hero, ecosystem stage, footer |
| `css/style.css` | Layout, path colors, responsive breakpoints |
| `js/ecosystem.js` | Edge geometry, desktop-only draw, B-key, tip tap |
| `docs/interoperability.md` | Hub-and-spoke / Viewer Contract dogma |
| `docs/framework-visual-concept.md` | Visual concept (updated for HTML/CSS implementation) |
| `CHANGELOG.md` | Keep a Changelog |

## Related docs elsewhere

- Viewer Contract: `WOLKE/WETTER_Viewer_Contract.md` (sibling clone)
- Suite layout: sibling folders under `WETTER-Suite/` — commit only inside the owning tool repo
