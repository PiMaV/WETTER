# WETTER interoperability (hub-and-spoke)

Tools in the suite stay **loosely coupled**. They do not form a peer mesh
(DONNER does not open a socket to BLITZ, and new programs are not required
to talk to every other tool).

## Roles

| Role | Examples | How they exchange data |
|------|----------|------------------------|
| **Pipeline stage** | DAMPF → KEIM → WOLKE | SQLite + files on disk |
| **Hub / producer** | WOLKE, EVT, DGM, HIKMICRO, DICOM sidecars, later FUNKE | Server side of the Viewer Contract |
| **Viewer** | BLITZ, DONNER | Client side of the Viewer Contract |

## Dogma

1. **One live interchange** — the **WETTER Viewer Contract** (Socket.IO notify
   + HTTP `.npy`). Canonical text lives in the WOLKE repo as
   [`WETTER_Viewer_Contract.md`](../../WOLKE/WETTER_Viewer_Contract.md)
   (legacy alias: `BLITZ_Receiver_Contract.md`).
2. **Hub-and-spoke** — viewers connect to a hub. Hubs push cubes and may
   relay a playhead `index`. Viewers may emit `viewer_index` back to the hub.
   There is **no** private Viewer↔Viewer API.
3. **Dual view is intentional** — the same EVT (or other) stack can sit in
   BLITZ (2D slices) and DONNER (3D / XR) at once because both clients share
   one hub, not because they sync each other.
4. **Handoffs later** — “Open in DONNER”, “analyze in BLITZ”, or a space-time
   ROI are **contract extensions** (one-shot payload via the hub or a deep
   link), not a second protocol and not shared widgets. Parked with DONNER
   Streamer UI and WOLKE selection parity in
   [`../TODO.MD`](../TODO.MD) (2026-09).

## What not to build

- Mandatory bidirectional links between every pair of tools
- Shared GUI widgets across BLITZ and DONNER
- A second live sync bus beside the Viewer Contract
