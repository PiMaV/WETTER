# WETTER Framework

**WETTER** is a modular framework for structured processing, exploration, and analysis of large experimental imaging datasets.

**Live overview and pipeline:** [wetter.mess.engineering](https://wetter.mess.engineering)

---

## Pipeline

```text
Raw Data → DAMPF → KEIM → WOLKE → BLITZ
```

---

## Core Modules

| Module | Role | Repository |
|--------|------|------------|
| **DAMPF** | Data Aggregation & Modular Processing — indexes folders/files, builds WETTER SQLite DB | [PiMaV/DAMPF](https://github.com/PiMaV/DAMPF) |
| **KEIM** | Knowledge Extraction & Indexing — statistics, data extraction, enrichment | [PiMaV/KEIM](https://github.com/PiMaV/KEIM) |
| **WOLKE** | Web exploration layer — reads WETTER DB + images, integrates with BLITZ | [PiMaV/WOLKE](https://github.com/PiMaV/WOLKE) |
| **BLITZ** | Bulk loading & interactive analysis — fast image inspection, syncs with WOLKE | [PiMaV/BLITZ](https://github.com/PiMaV/BLITZ) |

## Shared resources (suite)

Tool names stay uppercase (`BLITZ`, …). Shared resource **folders** stay
lowercase locally; GitHub repo names carry the `WETTER-` prefix so they stay
unambiguous under PiMaV:

| Local folder | GitHub repo (planned) | Role |
|--------------|----------------------|------|
| `converters/` | `PiMaV/WETTER-converters` | Format bridges → `.npy` |
| `datasets/` | `PiMaV/WETTER-datasets` | Sample / reference datasets |

---

## Background

* DPG Symposium: [`docs/BLITZ_WOLKE_DPG25V2_Compact.pdf`](docs/BLITZ_WOLKE_DPG25V2_Compact.pdf)

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
GitHub repos may stay under the PiMaV nickname