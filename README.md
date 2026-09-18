# WETTER — Workspace and Experimental Toolkits for Data Transformation, Exploration and Research

**WETTER** is a modular suite for scientific imaging: analyze data in **2D** (**BLITZ**) or explore it in **3D / XR** (**DONNER**). Drop raw files straight into a viewer, or take an optional curated or converted route when the dataset needs it.

**Live overview:** [wetter.mess.engineering](https://wetter.mess.engineering)

| Start here | Link |
|------------|------|
| **DONNER** — open in browser | [donner.mess.engineering](https://donner.mess.engineering/) |
| **BLITZ** — download | [GitHub Releases](https://github.com/PiMaV/BLITZ/releases/latest) |

---

## Ways into the viewers

```text
Raw Data Ocean ──Direct──────────────→ BLITZ / DONNER
       │
       ├── Curated: DAMPF → KEIM → WOLKE ──→ BLITZ / DONNER
       └── Converted: sidecars (Event / DGM / HIKMICRO / DICOM) ──→ BLITZ / DONNER
```

- **Direct** — drag-and-drop (or open) raw scientific images and arrays in a viewer.
- **Curated** — build a browsable SQL image database, then filter into the viewers.
- **Converted** — when a format needs a sidecar.

Live viewers and hubs share one **hub-and-spoke** interchange — see
[`docs/interoperability.md`](docs/interoperability.md) and the
[WETTER Viewer Contract](../WOLKE/WETTER_Viewer_Contract.md).

LLMs / agents: [`docs/llm-brief.md`](docs/llm-brief.md).

---

## Modules

| Module | Role | Repository |
|--------|------|------------|
| **BLITZ** | 2D inspection, measurement, and stats | [PiMaV/BLITZ](https://github.com/PiMaV/BLITZ) |
| **DONNER** | 3D / XR exploration | [PiMaV/DONNER](https://github.com/PiMaV/DONNER) |
| **DAMPF** | Ingest & normalize — indexes folders/files, builds WETTER SQLite DB | [PiMaV/DAMPF](https://github.com/PiMaV/DAMPF) |
| **KEIM** | Index & enrich — statistics and knowledge extraction | [PiMaV/KEIM](https://github.com/PiMaV/KEIM) |
| **WOLKE** | Filter & select — web layer over the WETTER DB | [PiMaV/WOLKE](https://github.com/PiMaV/WOLKE) |
| **Event camera Streamer** | Sidecar: EVT3 `.raw` → Viewer Contract stream | [PiMaV/event-reader](https://github.com/PiMaV/event-reader) |
| **DGM mosaic** | Sidecar: GeoTIFF tiles → mosaic stream | [PiMaV/dgm-mosaic](https://github.com/PiMaV/dgm-mosaic) |
| **HIKMICRO reader** | Sidecar: radiometric JPEG / CSV → °C | [PiMaV/hikmicro-reader](https://github.com/PiMaV/hikmicro-reader) |
| **DICOM reader** | Sidecar: uncompressed series → stack | [PiMaV/dicom-reader](https://github.com/PiMaV/dicom-reader) |

## Shared resources (suite)

Tool names stay uppercase (`BLITZ`, …). Sample data stays local:

| Local folder | GitHub repo (planned) | Role |
|--------------|----------------------|------|
| `datasets/` | `PiMaV/WETTER-datasets` | Sample / reference datasets |

---

## Background

* DPG Symposium: [`docs/BLITZ_WOLKE_DPG25V2_Compact.pdf`](docs/BLITZ_WOLKE_DPG25V2_Compact.pdf)
* Landing visual architecture: [`docs/framework-visual-concept.md`](docs/framework-visual-concept.md)

## Author

Philipp Mattern  
M.E.S.S. – Mattern Engineering & Software Solutions  

## Research context

Parts of this framework evolved during scientific work and collaborations
at the [Leibniz Institute for Plasma Science and Technology (INP)](https://www.inp-greifswald.de).

## Linux packaging

Flathub app not yet approved by Mods.
Prepared for:
IDs use the M.E.S.S. namespace `engineering.mess.*`
(first app: [`engineering.mess.BLITZ`](https://github.com/PiMaV/BLITZ/tree/main/flatpak)).
GitHub repos may stay under the PiMaV nickname.
