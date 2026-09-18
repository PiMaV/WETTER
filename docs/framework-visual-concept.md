# WETTER Landing Page – Visual Architecture Concept

## Executive Summary

The live landing page combines three layers:

1. **AI illustration** for atmosphere and visual identity (full-page backdrop).
2. **Real GUI screenshots** and example data tiles for credibility (HTML cards / mosaic).
3. **Deterministic edges** for information architecture: SVG paths drawn from a small JS edge list — arrows, path colors, and **Direct · Curated · Converted** labels.

Core message:

> **AI for atmosphere, screenshots for truth, code for logic.**

**Implemented master form (current):** HTML nodes + CSS layout + [`js/ecosystem.js`](../js/ecosystem.js) SVG edges on [wetter.mess.engineering](https://wetter.mess.engineering). A single Inkscape/SVG file that embeds all screenshots, labels, and hotspots was considered and **is not** the maintained source of truth.

---

## Current decisions

- **WETTER** is not one mandatory linear pipeline.
- Three paths into the viewers: **Direct**, **Curated** (`Raw → DAMPF → KEIM → WOLKE`), **Converted** (sidecars).
- **DONNER** and **BLITZ** are the primary applications and can consume raw data directly.
- **WOLKE** can feed both DONNER and BLITZ.
- Sidecars (Event camera Streamer today) convert specialized formats/streams into analysis-ready data for both viewers.
- DONNER and BLITZ are visually dominant; WOLKE secondary; DAMPF/KEIM/sidecars supporting.
- Atmosphere artwork contains **no** baked-in arrows; flow is drawn on top.
- Desktop uses absolute percent placement; tablet/phone use a separate flow layout (viewers first). Edges are desktop-only; path legend remains on all widths.
- Edges stay always visible (dashed pump + markers). No exclusive hover dimming of the rest of the graph.

---

## Context / Objective

Within a few seconds, a first-time visitor should understand:

- WETTER is a **software framework**.
- It works with **scientific images and structured scientific data**.
- DONNER and BLITZ open data directly (and via optional routes).
- DAMPF → KEIM → WOLKE is an **optional** curated workflow.
- Sidecars convert specialized formats when needed.
- Components have real GUIs.

Positioning:

> **From raw scientific data to structured exploration and analysis.**

Visitor lead (landing hero):

> Analyze scientific images and data in **2D**, or explore them in **3D / XR**.

---

## Architecture / Specification

### Logical data paths

#### Direct

```text
Raw Data Ocean ─────→ DONNER
Raw Data Ocean ─────→ BLITZ
```

#### Curated

```text
Raw Data Ocean
      ↓
    DAMPF
      ↓
     KEIM
      ↓
    WOLKE
     ↙ ↘
DONNER  BLITZ
```

#### Converted (sidecars)

```text
Raw Data Ocean
      ↓
  Sidecars (e.g. Event camera Streamer)
     ↙ ↘
DONNER  BLITZ
```

### Visual hierarchy

| Weight | Elements |
|--------|----------|
| Dominant | BLITZ, DONNER (viewer pair) |
| Secondary | WOLKE, Raw Data Ocean mosaic |
| Supporting | DAMPF, KEIM, Event camera Streamer |

### Implementation map

| Concern | Where to edit |
|---------|----------------|
| Card copy, screenshots, placement `%` | [`index.html`](../index.html) |
| Layout, colors, responsive, pump | [`css/style.css`](../css/style.css) |
| Edge list, anchors, markers, B-key | [`js/ecosystem.js`](../js/ecosystem.js) |
| Atmosphere image | `assets/neo-ocean-ohne-seitenwellen.png` |

```text
assets/
├── neo-ocean-ohne-seitenwellen.png   # page backdrop
├── example_images/512_px/            # ocean mosaic
├── screenshots/512_px/               # tool cards
└── icons/                            # brand marks
```

### Path styling

- **Direct** — neutral/white, slightly stronger stroke
- **Curated** — cyan (aligned with curated group border)
- **Converted** — amber (aligned with sidecar group border)
- Thick strokes with a traveling dash pulse for direction (no arrowheads; disabled under `prefers-reduced-motion`)
- Path names on group heads (same colors as edges); no floating center legend

### Responsive

- **≥821px:** percent map + SVG edges
- **≤820px:** flow grid; viewers full width; curated + sidecars side by side; ocean 4 columns; no edges
- **≤560px:** stacked viewers; routes then ocean 2 columns; tap tooltips

---

## Guiding principle

> **AI for atmosphere, screenshots for truth, code for logic.**

Historical note: early drafts proposed a single SVG master for all overlays. That approach is **superseded** by the HTML/CSS/JS landing above; keep conceptual path diagrams here, not a second parallel graphic source.
