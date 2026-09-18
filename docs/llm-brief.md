# WETTER landing — LLM brief

Machine-oriented product brief for agents. Humans use the [README](../README.md).

## What this repo is

**PiMaV/WETTER** is the **landing page and framework docs only** (`index.html`, `css/`, `js/`, `docs/`, assets). It is **not** a tool monorepo. Do not put BLITZ, WOLKE, EVT, DONNER, or datasets into this clone.

Live site: [wetter.mess.engineering](https://wetter.mess.engineering) via **GitHub Pages** from `main` `/` (CNAME). Push to `main` updates the site; there is no auto GitHub Release for this repo.

## Product story (visitor)

- **Core:** **BLITZ** (2D analyze) and **DONNER** (3D/XR explore) are the viewers.
- **Three paths into the viewers:**
  - **Direct** — raw data → viewers
  - **Curated** — DAMPF → KEIM → WOLKE → viewers
  - **Converted** — sidecars (Event camera Streamer / [event-reader](https://github.com/PiMaV/event-reader)) → viewers
- Primary CTAs: DONNER browser demo (`https://donner.mess.engineering/`), BLITZ download (GitHub Releases).

## Landing diagram contract

| Layer | Implementation |
|-------|----------------|
| Atmosphere | Full-page `.page-bg` image; internal **B** toggles `body.is-bg-off` (no UI hint) |
| Truth | Real tool screenshots + Raw Data Ocean mosaic in HTML |
| Logic | SVG edges drawn by [`js/ecosystem.js`](../js/ecosystem.js) from a small edge list |

- Desktop (≥821px): absolute `%` placement (`--x/--y/--w` on `.eco-place` in `index.html`). Edges always on: thick base + traveling dash pulse (no arrowheads), path colors (direct / curated cyan / converted amber). Path names on group heads. No exclusive hover dimming; soft emphasis only on curated/sidecar families.
- Tablet / phone: normal flow; order Viewers → optional routes → Ocean; SVG edges off. Ocean mosaic 4-col (tablet) / 2-col (phone). Tooltips: tap toggles `.is-tip-open` when hover is coarse.
- Brand names stay uppercase: **WETTER**, **WOLKE**, **DAMPF**, **KEIM**, **BLITZ**, **DONNER**.

## Do / don’t

**Do:** edit HTML cards, CSS layout, and the edge list in `ecosystem.js`; keep README and this brief aligned with the three-path story.

**Don’t:** reintroduce a mandatory linear pipeline as the landing headline; commit tool code or large datasets here; build an Inkscape “SVG master” for all card content (superseded — see [`framework-visual-concept.md`](framework-visual-concept.md)); invent translated brand aliases.

## Key paths

| Path | Role |
|------|------|
| `index.html` | Hero, ecosystem stage, footer |
| `css/style.css` | Layout, path colors, responsive breakpoints |
| `js/ecosystem.js` | Edge geometry, markers, desktop-only draw, B-key, tip tap |
| `docs/interoperability.md` | Hub-and-spoke / Viewer Contract dogma |
| `docs/framework-visual-concept.md` | Visual concept (updated for HTML/CSS implementation) |
| `CHANGELOG.md` | Keep a Changelog |

## Related docs elsewhere

- Viewer Contract: `WOLKE/WETTER_Viewer_Contract.md` (sibling clone)
- Suite layout: sibling folders under `WETTER-Suite/` — commit only inside the owning tool repo
