# WETTER TODOs

Parking lot for suite-wide leftovers. Tool-specific work stays in that tool’s
repo. This file is **not** a schedule.

## Parked (2026-09) — Viewer Contract follow-ups

Shipped for now: hub-and-spoke dogma
([`docs/interoperability.md`](docs/interoperability.md)), EVT playhead ↔
`viewer_index` with BLITZ, DONNER client index seek/emit in code (Streamer UI
still hidden).

**Do later (not peer-mesh):**

1. **DONNER Streamer UI (local only)** — show Connect under Source for LAN /
   sidecar QA; keep hidden on GitHub Pages. Load NumPy / drop is already in.
   Unlocks EVT + BLITZ + DONNER dual-scrub (2D + 3D). Owner: `DONNER/`.
2. **Open-in / ROI handoffs** — one-shot “Open in DONNER” / “analyze in BLITZ”
   or space-time ROI as **Viewer Contract extensions** via the hub (or deep
   link). No Viewer↔Viewer socket, no shared widgets. Owners: contract in
   `WOLKE/`, clients in `DONNER/` + `BLITZ/`.
3. **WOLKE ↔ DONNER parity** — packed `__selection__.npy` multi-row + table
   sync when exploring from WOLKE (not required for EVT dual-view). Owners:
   `WOLKE/` + `DONNER/`.

## Parked (2026-08)

- **WOLKE / KEIM:** local trees are linked to GitHub but have drifted since
  March. Do not dump a blind commit. Sit with the diff when ready. **WOLKE gzip
  was removed** — Event reader keeps opt-in gzip; WOLKE stays raw `.npy`.
- **Gzip cutoff:** only useful on a real network with thin / large `.npy`.
  Localhost zip+unzip is wasted CPU (Event reader default off; BLITZ loopback
  uses `Accept-Encoding: identity`). Later: when to offer gzip (size, occupancy,
  not-loopback).
- **Sparse D / Floor C:** dropped. BLITZ stays a dense cube; contrast is LUT
  Fit/Trim. Sparse-native analysis only if a weak-RAM machine actually fails on
  event stacks — see [`docs/sparse_matrices.md`](docs/sparse_matrices.md).
- **FUNKE:** backlog name only — [`docs/funke.md`](docs/funke.md). Not on the
  landing README, not in the pipeline line. Event reader stays `event-reader`.
- **datasets/:** local folder, not a git clone. Leave
  [PiMaV/WETTER-datasets](https://github.com/PiMaV/WETTER-datasets) as the small
  private snapshot; do not push `.raw` / MRT.

## README: einheitlicher Header in allen WETTER-Repos

In **allen** WETTER-Repos denselben kurzen Header oben in der README:

- Framework-Name + Einzeiler
- Link zur Live-Übersicht: https://wetter.mess.engineering
- Pipeline-Zeile: `Raw Data → DAMPF → KEIM → WOLKE → BLITZ`
- Hinweis, welches Repo das hier ist (Tool vs. Shared Resource)
- Link zurück zu WETTER / M.E.S.S.

Repos: `WETTER` (landing + docs only), `DAMPF`, `KEIM`, `WOLKE`, `BLITZ`, `DGM`, `HIKMICRO`, `DICOM`, `EVT`. `datasets/` is local-only (not a clone). `converters/` is a pointer README only.

Noch nicht umsetzen — erst Naming/Repos stehen, dann Header einmal definieren und überall kopieren.

## Sonstiges

- In die jeweiligen Programme Verlinkungen auf WETTER und M.E.S.S.
- Landingpage braucht mehr Futter (`@wetter_header` — Teile davon auf die Landingpage)
