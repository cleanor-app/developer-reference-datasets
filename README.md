# Developer Reference Datasets: aspect ratios, WCAG contrast, encoding sizes

**Open, reproducible reference data every web and app developer looks up: aspect-ratio pixel tables, WCAG 2.1 colour-contrast ratios with AA/AAA pass-fail, and UTF-8/16/32 byte sizes by script.** Every number is generated from first principles by a script in [`generators/`](generators/) — no scraping, no hand-typed tables to go stale.

[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)
[![Data: CC BY 4.0](https://img.shields.io/badge/data-CC%20BY%204.0-lightgrey.svg)](data/LICENSE)
[![Reference](https://img.shields.io/badge/read%20the%20reference-cleanor.app%2Freference-0a7cff.svg)](https://cleanor.app/reference)

> These are lookup tables computed from the spec, not measurements. That is the point: an aspect
> ratio, a contrast ratio and a byte count have exact answers, so this repo gives you the exact
> answers as clean CSV you can import, diff, or wire into a test.

## Datasets

| File | What it is | Rows |
| --- | --- | --- |
| [`data/aspect-ratios.csv`](data/aspect-ratios.csv) | 16 named aspect ratios × 11 common widths → the exact height (e.g. 16:9 at 1920 = 1080) | 176 |
| [`data/resolutions.csv`](data/resolutions.csv) | 29 named resolutions (720p → 8K, phones, social) → pixel size, megapixels, reduced ratio | 29 |
| [`data/wcag-contrast-pairs.csv`](data/wcag-contrast-pairs.csv) | every foreground×background pair of a 25-colour UI palette → WCAG 2.1 contrast ratio + AA/AAA pass-fail | 600 |
| [`data/wcag-on-white-black.csv`](data/wcag-on-white-black.csv) | each colour vs white and vs black — the most-asked contrast question | 48 |
| [`data/encoding-sizes.csv`](data/encoding-sizes.csv) | 16 text samples across scripts → code points and bytes in UTF-8 / UTF-16 / UTF-32 | 16 |
| [`data/file-types.csv`](data/file-types.csv) | 66 file types → MIME type + magic-number signature (with offset) + category | 66 |
| [`data/favicon-icon-sizes.csv`](data/favicon-icon-sizes.csv) | favicon / app-icon size requirements across Web, Apple, PWA, Android, iOS, Windows, stores | 32 |
| [`data/social-media-image-sizes.csv`](data/social-media-image-sizes.csv) | recommended image sizes for 7 platforms + Open Graph, each date-stamped (they change) | 26 |

## A few answers straight from the data

- **16:9 is 1920×1080, 1280×720, 3840×2160.** 9:16 (Stories/Reels/TikTok) is those flipped. Full table with 16 ratios in [`data/aspect-ratios.csv`](data/aspect-ratios.csv).
- **`#6b7280` (gray-500) on white has a contrast ratio of 4.83 — it passes WCAG AA for normal text; `#9ca3af` (gray-400) is 2.54 and fails.** The line between "readable" and "not" on white sits right around gray-500. Full matrix in [`data/wcag-on-white-black.csv`](data/wcag-on-white-black.csv).
- **A Latin letter costs 1 byte in UTF-8, an accented Latin or Greek/Cyrillic letter 2, a CJK glyph 3, and most emoji 4** (a flag emoji is 8, a ZWJ family emoji 25). UTF-16 is 2 bytes for everything on the Basic Multilingual Plane and 4 for the rest; UTF-32 is always 4× the code-point count. Per-sample in [`data/encoding-sizes.csv`](data/encoding-sizes.csv).

## Docs

| Doc | What it answers |
| --- | --- |
| [`docs/aspect-ratios.md`](docs/aspect-ratios.md) | What is 16:9 in pixels? Every common ratio and resolution, as a table |
| [`docs/wcag-contrast.md`](docs/wcag-contrast.md) | Which colour pairs pass WCAG AA/AAA, and the formula behind it |
| [`docs/character-encoding-sizes.md`](docs/character-encoding-sizes.md) | How many bytes is a character in UTF-8 vs UTF-16 vs UTF-32? |
| [`docs/mime-types-list.md`](docs/mime-types-list.md) | Extension → MIME type, and the traps (docx is a ZIP, svg is svg+xml) |
| [`docs/file-signatures-magic-numbers.md`](docs/file-signatures-magic-numbers.md) | Identify a file by its bytes — signatures with the offset that most lists get wrong |
| [`docs/favicon-and-app-icon-sizes.md`](docs/favicon-and-app-icon-sizes.md) | Every favicon and app-icon size, per platform |
| [`docs/social-media-image-sizes.md`](docs/social-media-image-sizes.md) | Current social image sizes, date-stamped |

## Reproduce

```bash
node generators/aspect-ratios.mjs
node generators/wcag-contrast.mjs
node generators/encoding-sizes.mjs
```

No dependencies — plain Node. The WCAG numbers are checkable against any online contrast tool; the encoding numbers against any UTF-8 byte counter.

## Cite

Cleanor Labs, *Developer Reference Datasets: Aspect Ratios, WCAG Contrast, Encoding Sizes*, CC BY 4.0. https://github.com/cleanor-app/developer-reference-datasets · write-ups at https://cleanor.app/reference

Maintained by [Cleanor Labs](https://cleanor.app). More open datasets: [cleanor-storage-lab](https://github.com/cleanor-app/cleanor-storage-lab) (image/video compression benchmarks), [search-index](https://github.com/cleanor-app/search-index) (Google search demand).
