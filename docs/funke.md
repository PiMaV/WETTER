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
