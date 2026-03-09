# WETTER

**WETTER** is a modular framework ecosystem for structured processing, exploration, and analysis of large experimental imaging datasets.

<p align="center">
  <img src="assets/WETTER_Concept.png" alt="WETTER framework overview" width="100%">
</p>

---

## Overview

The **WETTER framework** separates indexing, analysis, exploration, and high-performance inspection into independent but connected components.

Raw experimental datasets are treated as a **structured information space** rather than isolated files.  
Each module of the framework focuses on a specific stage of the workflow.

---

## Processing Pipeline

```text
Raw Data → DAMPF → KEIM → WOLKE → BLITZ
```

---

## Core Modules

### DAMPF

**D**ata **A**ggregation & **M**odular **P**rocessing **F**ramework

A filename-semantic indexer that scans folder and file structures, extracts metadata from naming conventions, and builds a structured **WETTER SQLite database**.

Repository:
https://github.com/PiMaV/DAMPF

---

### KEIM

**K**nowledge **E**xtraction & **I**ndexing **M**odule

Performs scalar statistics and data extraction on WETTER databases and enriches the indexed dataset with derived information.

Repository:
https://github.com/PiMaV/KEIM

---

### WOLKE

**W**eb-**O**riented **L**ayout for **K**nowledge **E**xploration

Provides an interactive web-based exploration environment that reads WETTER databases together with linked image data.

WOLKE enables dataset navigation, filtering, and interactive analysis and integrates directly with **BLITZ** via HTTP.

Repository:
https://github.com/PiMaV/WOLKE

---

### BLITZ

**B**ulk **L**oading and **I**nteractive **T**ime-series **Z**onal Analysis

A high-performance drag-and-drop image exploration and analysis tool designed for rapid inspection of large image datasets.

BLITZ synchronizes with WOLKE to allow seamless transitions between dataset exploration and detailed image inspection.

Repository:
https://github.com/PiMaV/BLITZ

---

## Architectural Idea

WETTER organizes large imaging datasets into a modular workflow:

* **DAMPF** indexes raw datasets and extracts semantic structure from folder and file naming conventions
* **KEIM** performs statistical analysis and data enrichment on indexed datasets
* **WOLKE** exposes the structured data through an interactive exploration layer
* **BLITZ** enables fast and detailed inspection of the underlying image data

This separation enables scalable workflows across **scientific, medical, and industrial imaging applications**.

---

## Talks and Background

Further architectural background is available in presentations and documentation.

* DPG Symposium Presentation
  `docs/BLITZ_WOLKE_DPG25V2_Compact.pdf`

---
