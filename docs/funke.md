# FUNKE (backlog) — live / format streamer into BLITZ

**Status:** name and intent only. **Not** a WETTER core module yet.  
**Do not** treat the current event-camera folder as FUNKE.

**FUNKE** (working brand, uppercase) is the candidate for a later **data streamer**:
ingest live cameras and exotic formats, emit the existing **WOLKE** viewer
contract (Socket.IO + HTTP `.npy`) so **BLITZ** stays a dense-matrix viewer.

Today’s EVT3 archive reader is a **throwaway working title** (`EVT/` /
event-reader). If FUNKE ships, that reader becomes one source plugin, not the
product name.

## Intended scope (later)

| Source | Role |
|--------|------|
| Event camera **archive** (EVT3 `.raw`) | Already sketched as the event reader |
| Event camera **live** | Same binning UI, frames pushed while recording |
| Other cameras / formats | USB, vendor SDKs, binary/sparse images — without bloating the BLITZ Flatpak |

## Non-goals until FUNKE is a real repo

- Adding FUNKE to the WETTER pipeline line (`DAMPF → KEIM → WOLKE → BLITZ`)
- Folding Metavision/MDK into BLITZ
- Renaming the public event-reader repo to FUNKE on day one

Related: [`sparse_matrices.md`](sparse_matrices.md) (thin volumes, compression).

## Backlog (event reader / later FUNKE)

- **Interlace / black horizontal bars** on binned pictures. **Observed in the
  event reader even when overview Δt is held at ≥ 1 ms** — the 1 ms preview
  floor does not clear the stripes. Looks like classic even/odd field lines,
  probably from the recording (sensor readout / vendor packing), not from EVT3
  decode and not a BLITZ LUT. The reader warns on send when Δt &lt; 1 ms and
  even/odd row means differ a lot. Needs a **known sample** and an optional
  deinterlace (merge/interpolate); do not ship a silent remap.
- **Noise-filter preview in the sidecar.** Filters today apply on send only;
  the local overview stays raw. Show the 1-pixel / temporal-neighbour effect
  on overview or window max (still optional, default off) so you can judge
  whether it helps and tune knobs (neighbour Δt, maybe neighbourhood size)
  without streaming to BLITZ first.

