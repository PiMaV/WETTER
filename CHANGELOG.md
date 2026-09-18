# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Interactive ecosystem diagram on the landing page (HTML nodes + SVG edges): BLITZ/DONNER primary, WOLKE route, DAMPF/KEIM, sidecars.
- Always-on data-flow edges with thick directional pulse (no arrowheads), path names on group heads (**Direct · Curated · Converted**).
- Hero CTAs: open DONNER in the browser; download BLITZ from GitHub Releases.
- Tablet and phone layouts for the ecosystem (viewers first; edges desktop-only; tap tooltips).
- Brand expansion on the landing page, meta tags, and README: **Workspace and Experimental Toolkits for Data Transformation, Exploration and Research**.
- [`docs/llm-brief.md`](docs/llm-brief.md) for agents (landing boundary, diagram contract, Pages).
- [`docs/interoperability.md`](docs/interoperability.md): hub-and-spoke dogma — Viewer Contract via WOLKE/sidecars; no Viewer↔Viewer mesh; DONNER + BLITZ dual view on one hub.
- Parked Viewer Contract follow-ups in [`TODO.MD`](TODO.MD) (DONNER Streamer UI, Open-in/ROI, WOLKE↔DONNER selection).

### Changed

- Landing hero: acronym directly under **WETTER**, then benefit lead and CTAs; DPG PDF in the footer.
- Ecosystem edges use a base stroke plus traveling dash pulse; side routes use shallow curves.
- BLITZ and DONNER cards both expose explicit action links (Download / Open in browser + GitHub) instead of a whole-card primary href.
- Ecosystem diagram no longer dims non-hovered paths; soft path-family emphasis only.
- Path legend pill removed — path names sit on the matching group heads (same colors as edges).
- Ecosystem cards show tool screenshots as the visual; BLITZ and DONNER sit as a labeled viewer pair. Raw Data Ocean uses a mixed mosaic with always-visible captions.
- Wider gaps between Curated / Viewers / Sidecars so flow edges read clearly.
- README presents viewers and the three paths first (no linear pipeline as the entry story).
- [`docs/framework-visual-concept.md`](docs/framework-visual-concept.md) documents the HTML/CSS/JS landing as the maintained master form (SVG-all-content master superseded).
- Event camera Streamer card links to [PiMaV/event-reader](https://github.com/PiMaV/event-reader).
