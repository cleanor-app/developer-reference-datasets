# Image and video format browser support (AVIF, WebP, JPEG XL, HEIC, AV1, HEVC)

**AVIF is fully supported in Chrome (since 85), Firefox (93) and Safari (16.4). WebP is universal. JPEG XL is not fully supported in any major browser — Chrome removed it and Safari has it behind a flag.** The full matrix of 6 formats × 8 browsers, with the first fully-supporting version and the current status, is [`data/image-format-support.csv`](../data/image-format-support.csv).

## First version with full support

From [`data/image-format-support.csv`](../data/image-format-support.csv) (data: caniuse-lite `1.0.30001787`):

| Format | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| WebP | 32 | 65 | 14 | 18 |
| AVIF | 85 | 93 | 16.4 | 121 |
| JPEG XL | never (removed) | never | partial (flag) | never |
| HEIF/HEIC | never | never | partial | never |
| AV1 (video) | 70 | 67 | 17.4 | 121 |
| HEVC (video) | 107 | never | 11 | 18 |

(Exact per-browser rows, including iOS Safari, Chrome Android, Samsung Internet and Opera, are in the CSV.)

## What this tells you

- **AVIF is now safe to serve** to current browsers with a WebP or JPEG fallback — all three engines shipped full support by Safari 16.4 (2023). Use `<picture>` with sources in AVIF → WebP → JPEG order.
- **JPEG XL is not deployable on the web.** Despite being technically strong, Chrome removed it (2023) and only Safari has it, behind a flag. Do not ship `.jxl` as a primary web format; the [Cleanor storage lab](https://github.com/cleanor-app/cleanor-storage-lab) covers its lossless-recompression value, which is a server-side use, not a delivery one.
- **HEIC/HEIF is an Apple capture format, not a web format** — it is only decoded (partially) by Safari. Convert HEIC to JPG/WebP/AVIF for the web (the [HEIC tax benchmark](https://github.com/cleanor-app/cleanor-storage-lab) measures what that conversion costs).
- **AV1 video is broadly supported; HEVC is not** (Firefox never shipped it, for licensing reasons), which is why AV1 is the better choice for a modern web-video pipeline. See the [video codec benchmark](https://github.com/cleanor-app/cleanor-storage-lab).

## Method

`data/sources/caniuse-format-support.json` is a snapshot derived from [caniuse-lite](https://github.com/browserslist/caniuse-lite) (CC BY 4.0); its `caniuse_version` is the data vintage. The generator flattens it: for each format × browser it walks the browser's version list in release order and records the first version flagged fully supported (`y`), plus the current status. Refresh by re-running the extraction in a project that has caniuse-lite, then [`generators/format-support-matrix.mjs`](../generators/format-support-matrix.mjs).
