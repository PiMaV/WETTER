# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Hover/tap tooltips on WOLKE, DAMPF, KEIM, Event camera Streamer, and DGM mosaic (click still opens GitHub).
- Interactive ecosystem diagram on the landing page (HTML nodes + SVG edges): BLITZ/DONNER primary, WOLKE route, DAMPF/KEIM, sidecars.
- Always-on data-flow edges with thick directional pulse (no arrowheads), path names on group heads (**Direct · Curated · Converted**).
- Short data-type tooltips on Raw Data Ocean tiles (hover / tap).
- Raw Data Ocean tiles grouped into **Lab & scientific**, **Field & environment**, and **Arrays & sensing** (includes MRT / MRI).
- Tablet and phone layouts for the ecosystem (viewers first; edges desktop-only; tap tooltips).
- Brand expansion on the landing page, meta tags, and README: **Workspace and Experimental Toolkits for Data Transformation, Exploration and Research**.
- [`docs/llm-brief.md`](docs/llm-brief.md) for agents (landing boundary, diagram contract, Pages).
- [`docs/interoperability.md`](docs/interoperability.md): hub-and-spoke dogma — Viewer Contract via WOLKE/sidecars; no Viewer↔Viewer mesh; DONNER + BLITZ dual view on one hub.
- Parked Viewer Contract follow-ups in [`TODO.MD`](TODO.MD) (DONNER Streamer UI, Open-in/ROI, WOLKE↔DONNER selection).

### Changed

- Landing hero: acronym under **WETTER**, then manifesto (*Images aren't just pixels…*), then benefit lead; starts on viewer cards; DPG PDF in the footer.
- Desktop ecosystem: CSS grid with clearer band spacing — viewers on top; Curated | Direct | Sidecars mid-row; Raw Data Ocean below.
- Tool screenshots load from `assets/screenshots/conv/`.
- Curated: **WOLKE** full-width on top (dominant), **DAMPF** and **KEIM** side by side below. Direct column is narrow (text only). Sidecars: Event camera Streamer and DGM mosaic.
- Ocean band **Lab & scientific**; all three ocean bands are **2×2** (Multiview tile dropped); MRT / MRI in Arrays & sensing. Mosaic stays compact.
- Ocean→tool hops are white; cyan/amber only inside curated / converted routes after their blocks.
- Border hierarchy: viewers strongest, route groups medium (cyan/amber), ocean quieter dashed.
- Ecosystem edges are straight vertical hops centered on the cards; ~100px band gap.
- BLITZ and DONNER cards: name + role on one line, with two prominent action buttons underneath (Download / Open in browser + GitHub).
- Ecosystem diagram no longer dims non-hovered paths; soft path-family emphasis only.
- Path names sit on the matching group heads.
- Ecosystem cards show tool screenshots; Raw Data Ocean uses a mixed mosaic with always-visible captions.
- README presents viewers and the three paths first (no linear pipeline as the entry story).
- [`docs/framework-visual-concept.md`](docs/framework-visual-concept.md) documents the HTML/CSS/JS landing as the maintained master form.
- Event camera Streamer card links to [PiMaV/event-reader](https://github.com/PiMaV/event-reader).
