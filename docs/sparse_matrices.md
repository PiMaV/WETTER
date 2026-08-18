# Sparse & thinly populated matrices across WETTER

**Status:** Epic in progress
**Scope:** DAMPF → KEIM → WOLKE → BLITZ, including EVT sidecars

Many WETTER datasets contain mostly background or zeros but have long time axes. Dense `(T, Y, X[, C])` storage therefore creates unnecessary I/O and RAM pressure. EVT makes this especially visible because its native event list becomes dense during binning.

## Current behavior

BLITZ always materializes a dense matrix after loading.

* HTTP gzip reduces transfer size, not BLITZ peak RAM.
* `Floor |v|` replaces values below a threshold with zero.
* Zeroing values does not reduce dense `nbytes`, but improves later compression.
* EVT sends dense binned stacks as `float32` by default, with optional display-oriented conversion.
* WOLKE continues to send dense `.npy` without thresholding.

```mermaid
flowchart LR
    native["Native sparse data"] -->|"optional binning"| dense["Dense .npy"]
    dense -->|"optional gzip"| load["BLITZ load"]
    load -->|"optional Floor |v|"| ram["Dense ImageData"]
```

## Strategy

| Layer | Approach                        | Benefit                              | BLITZ RAM | Signal               |
| ----- | ------------------------------- | ------------------------------------ | --------- | -------------------- |
| **A** | Compress dense payload          | Smaller transfer                     | Unchanged | Lossless             |
| **B** | Sparse payload, densify on load | Smaller transfer and temporary files | Unchanged | Lossless             |
| **C** | Threshold before storage/export | Higher sparsity and compression      | Unchanged | Lossy                |
| **D** | Sparse-native analysis          | Lower RAM and scalable processing    | Reduced   | Depends on operation |

### A — Current transport optimization

EVT can gzip dense `.npy` responses when explicitly requested. Loopback clients use uncompressed transfer because compression usually wastes CPU locally.

This is the preferred first step because it is lossless and requires no BLITZ data-model changes.

### C — Current threshold option

BLITZ provides an opt-in `Floor |v|` parameter in the File tab. It is applied after `np.load` and before resizing or 8-bit conversion. Network loading uses the same parameters.

The threshold must remain:

* disabled by default,
* visible in the load log,
* labelled as lossy,
* excluded from WOLKE-side preprocessing.

> Thresholding can remove weak signal and bias ROI statistics, means and correlations. Use it only when the discarded range is scientifically irrelevant.

## Tool responsibilities

| Tool      | Responsibility                                            |
| --------- | --------------------------------------------------------- |
| **DAMPF** | Optionally record dtype, occupancy and threshold metadata |
| **KEIM**  | Avoid unnecessary dense materialization where practical   |
| **WOLKE** | Preserve the current dense `.npy` delivery contract       |
| **BLITZ** | Dense loading, RAM limits and explicit thresholding       |
| **EVT**   | Preserve native events; optionally bin and gzip for BLITZ |

## Next decisions

1. Measure compression ratio, CPU cost and transfer time using representative EVT recordings.
2. Keep the existing dense contract if gzip is sufficient.
3. Sketch a sparse NPZ/COO sidecar format only if measurements justify it.
4. Consider sparse-native `ImageData` only after demonstrated failure at approximately `T ≥ 10⁴`.

## Out of scope

* EVT SDK integration into BLITZ
* automatic thresholding of calibrated data
* thresholding inside WOLKE
* sparse payload contracts or sparse-native `ImageData` without measured need
