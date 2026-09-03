# WETTER Landing Page – Visual Architecture Concept

## Executive Summary

The WETTER landing-page graphic should combine three layers:

1. **AI illustration** for atmosphere, visual identity, and the Raw Data Ocean.
2. **Real GUI screenshots** for credibility and immediate recognition that DAMPF, KEIM, WOLKE, DONNER, BLITZ, and LOADERS are software tools.
3. **SVG overlays** for all information architecture: arrows, labels, callouts, and interaction hotspots.

The AI-generated base image must therefore **not contain logical arrows or hard-coded data-flow semantics**. The architecture is added deterministically in SVG and remains editable in Git/Cursor.

Core message:

> **AI for atmosphere, screenshots for truth, SVG for logic.**

---

## Current decisions

- **WETTER** is no longer presented as one mandatory linear pipeline.
- The mandatory curated chain is:
  `Raw Data Ocean → DAMPF → KEIM → WOLKE`
- **DONNER** and **BLITZ** are the primary applications and can consume raw data directly.
- **WOLKE** can feed both DONNER and BLITZ.
- **LOADERS** are optional converters/adapters and can feed both DONNER and BLITZ.
- Raw data can also feed LOADERS directly.
- DONNER and BLITZ should be visually dominant.
- WOLKE should be prominent but secondary.
- DAMPF, KEIM, and LOADERS should be smaller supporting tools.
- All program cards should provide a screenshot area so real GUIs can be embedded later.
- The base illustration should contain **no arrows**.
- All arrows, text boxes, screenshots, and interaction hotspots should be implemented as SVG overlays.

---

## Context / Objective

The landing-page visual must work for a first-time visitor who has no prior knowledge of WETTER.

Within a few seconds, the viewer should understand:

- WETTER is a **software framework**.
- It works with **scientific images and structured scientific data**.
- DONNER and BLITZ are powerful applications that can open data directly.
- DAMPF → KEIM → WOLKE is an optional workflow for large or unstructured data spaces.
- LOADERS convert specialized formats or streams into analysis-ready data.
- The components have real GUIs and are usable applications, not abstract conceptual blocks.

Recommended WETTER positioning:

> **From raw scientific data to structured exploration and analysis.**

Extended description:

> **WETTER is a modular framework for indexing, characterizing, selecting, exploring, and analyzing structured scientific data.**

---

## Architecture / Specification

### Logical data paths

#### Curated workflow

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

#### Direct workflow

```text
Raw Data Ocean ─────→ DONNER
Raw Data Ocean ─────→ BLITZ
```

Both primary applications support direct data loading, including drag & drop where supported.

#### Loader workflow

```text
Raw Data Ocean
      ↓
   LOADERS
     ↙ ↘
DONNER  BLITZ
```

LOADERS currently represent specialized converters/adapters such as:

- HIKMICRO thermal-image data
- event-camera data
- geodata

Their purpose is to convert specialized sources, file sequences, or streams into analysis-ready representations such as NumPy arrays.

---

## Visual hierarchy

Recommended composition:

```text
LEFT                         CENTER                     RIGHT

WOLKE                        DONNER                     LOADERS
  ↑                          Explore 3D / XR
KEIM
  ↑                          BLITZ
DAMPF                        Analyze 2D / Stats


====================== RAW DATA OCEAN ======================
              Images · Arrays · Signals · Streams
```

### Relative visual weight

| Component | Visual weight | Role |
|---|---:|---|
| DONNER | 100% | Primary 3D/XR exploration application |
| BLITZ | 100% | Primary scientific image/array analysis application |
| WOLKE | ~70% | Filter/select and dataset exploration layer |
| DAMPF | ~55–60% | Auxiliary indexing/similarity tool |
| KEIM | ~55–60% | Auxiliary scalar/statistics enrichment tool |
| LOADERS | ~50–60% | Optional converters/adapters |

DONNER and BLITZ should immediately read as the two main applications.

---

## Card concept

Each software component should use a consistent card structure.

### Recommended card anatomy

```text
┌─────────────────────────────┐
│  PRODUCT NAME               │
│  short functional subtitle  │
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │   REAL GUI SCREENSHOT │  │
│  │       PLACEHOLDER     │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  optional micro-label       │
└─────────────────────────────┘
```

### Screenshot ratios

- **DONNER / BLITZ:** large 4:3 or 16:10 screenshot area.
- **WOLKE:** medium 4:3 screenshot area.
- **DAMPF / KEIM / LOADERS:** smaller screenshot areas; square or 4:3 depending on UI.

Screenshots should be curated crops rather than uncontrolled full-desktop captures.

---

## Component labels

Working labels for the landing-page graphic:

| Component | Short label |
|---|---|
| DAMPF | **Index & Similarity** |
| KEIM | **Scalars & Statistics** |
| WOLKE | **Filter & Select** |
| DONNER | **Explore 3D / XR** |
| BLITZ | **Analyze 2D / Stats** |
| LOADERS | **Converters & Adapters** |

These labels are intentionally shorter than the full product descriptions.

---

## Raw Data Ocean

The Raw Data Ocean remains the common visual foundation.

It should visually represent scientific data rather than office documents or folders.

Suitable motifs include:

- grayscale scientific images
- camera frames
- plasma/discharge imagery
- heatmaps
- matrices
- event-like sparse images
- line plots / waveforms
- volume slices
- structured numerical data
- SSDs / disks / storage media

Suggested subtitle:

> **Images · Arrays · Signals · Streams**

The Raw Data Ocean should make clear that WETTER is broader than classical RGB image viewing while still retaining its scientific-imaging heritage.

---

## SVG overlay architecture

The final visual should be maintained as an SVG master.

Suggested repository structure:

```text
assets/
├── wetter-framework-base.png
├── screenshots/
│   ├── dampf.png
│   ├── keim.png
│   ├── wolke.png
│   ├── donner.png
│   ├── blitz.png
│   └── loaders.png
└── wetter-framework.svg
```

The SVG should contain:

- the AI-generated base artwork as an image layer
- screenshot clipping/masks
- module titles and subtitles
- arrows
- callout boxes
- optional hover/click groups for the web landing page

This allows changes to be made directly in Cursor or, where useful, visually in Inkscape.

---

## Arrow semantics

All arrows are added in SVG, never baked into the AI illustration.

### Blue — direct/raw input

- Raw Data Ocean → DAMPF
- Raw Data Ocean → DONNER
- Raw Data Ocean → BLITZ
- Raw Data Ocean → LOADERS

### Curated workflow

- DAMPF → KEIM
- KEIM → WOLKE

These may use restrained module colors or a neutral workflow style.

### White — curated selection output

- WOLKE → DONNER
- WOLKE → BLITZ

### Amber — converted/adapter output

- LOADERS → DONNER
- LOADERS → BLITZ

This produces three visually understandable paths:

> **Direct · Curated · Converted**

---

## Callout concept

Keep explanatory text outside the module cards and limited to a few architectural messages.

### Direct Data Access

> **Drag & drop scientific data directly into DONNER or BLITZ.**

This should be visually prominent because direct loading is a major power feature and makes clear that neither WOLKE nor LOADERS are mandatory.

### Curated Workflow

> **Index, characterize, filter and select large data spaces before inspection.**

This explains the purpose of DAMPF → KEIM → WOLKE.

### Specialized Loaders

> **Convert thermal, event-camera and geospatial sources into analysis-ready arrays.**

This explains the optional LOADERS path.

---

## Design Decisions

### AI illustration is a background layer, not the architecture

Image generation is used for:

- industrial / cyber-scientific atmosphere
- depth and lighting
- Raw Data Ocean
- card framing
- visual cohesion

It should not determine:

- arrows
- data-flow direction
- exact text
- architecture semantics

### Real screenshots are essential

Real GUI screenshots solve a major communication problem: a visitor should immediately recognize that these are existing software applications.

They also improve:

- credibility
- product identity
- differentiation between modules
- visual understanding of each tool's role

### SVG is the source of truth for information architecture

SVG gives:

- deterministic arrows
- exact text
- easy edits in Cursor
- Git diffs/versioning
- reusable website interaction
- high-resolution export for LinkedIn, presentations, and documentation

---

## Risks and Trade-offs

### Too much information

Six cards, screenshots, arrows, and callouts can become visually dense.

Mitigation:

- keep module text short
- use only three callouts
- prioritize DONNER and BLITZ visually
- keep DAMPF, KEIM, and LOADERS smaller
- avoid unnecessary arrows

### Screenshot legibility

Screenshots may become unreadable when the graphic is viewed small.

Mitigation:

- use curated GUI crops
- show one recognizable state per application
- avoid tiny text inside screenshots
- use screenshots primarily as visual proof, not as detailed documentation

### AI consistency

AI-generated backgrounds can drift in layout or reinterpret icons.

Mitigation:

- generate the base once
- freeze the chosen base
- move all subsequent logic and content changes into SVG

---

## Next Steps

1. Generate one **arrow-free base illustration** with the agreed layout:
   - DAMPF → KEIM → WOLKE visually stacked on the left
   - DONNER and BLITZ dominant in the center
   - LOADERS smaller on the right
   - Raw Data Ocean across the bottom
   - clear screenshot placeholders in every card
   - no arrows or architectural text embedded in the artwork

2. Select/freeze the base image.

3. Capture representative GUI screenshots for all six components.

4. Build `wetter-framework.svg` in Cursor:
   - embed the base image
   - place screenshots using clip paths
   - add exact arrows
   - add callouts
   - add labels

5. Use the SVG directly on `wetter.mess.engineering` and optionally add hover/click interactions.

6. Export high-resolution PNG variants for GitHub, LinkedIn, and presentations.

---

## Guiding principle

> **AI for atmosphere, screenshots for truth, SVG for logic.**
