---
license: cc-by-4.0
language:
  - en
pretty_name: "Developer Reference Datasets: Aspect Ratios, WCAG Contrast, Encoding Sizes"
tags:
  - aspect-ratio
  - resolution
  - wcag
  - accessibility
  - color-contrast
  - character-encoding
  - reference
size_categories:
  - n<1K
configs:
  - config_name: aspect-ratios
    data_files: aspect-ratios.csv
  - config_name: resolutions
    data_files: resolutions.csv
  - config_name: wcag-contrast-pairs
    data_files: wcag-contrast-pairs.csv
  - config_name: wcag-on-white-black
    data_files: wcag-on-white-black.csv
  - config_name: encoding-sizes
    data_files: encoding-sizes.csv
  - config_name: file-types
    data_files: file-types.csv
  - config_name: favicon-icon-sizes
    data_files: favicon-icon-sizes.csv
  - config_name: social-media-image-sizes
    data_files: social-media-image-sizes.csv
  - config_name: qr-code-capacity
    data_files: qr-code-capacity.csv
  - config_name: image-format-support
    data_files: image-format-support.csv
---

# Developer Reference Datasets

Open, reproducible lookup tables for web and app developers, computed from first principles:

- **aspect-ratios** — 16 named aspect ratios × 11 widths → exact height (16:9 at 1920 = 1080).
- **resolutions** — 29 named resolutions (720p → 8K, phones, social) → pixels, megapixels, reduced ratio.
- **wcag-contrast-pairs** — every fg×bg pair of a 25-colour UI palette → WCAG 2.1 contrast ratio and AA/AAA pass-fail.
- **wcag-on-white-black** — each colour vs white and black (the most-asked contrast question).
- **encoding-sizes** — 16 text samples → code points and bytes in UTF-8 / UTF-16 / UTF-32 by script.

These are exact answers from the spec, not measurements: an aspect ratio, a WCAG contrast ratio and a byte count are computable, so the CSVs are computed and re-runnable.

- Code + methodology: https://github.com/cleanor-app/developer-reference-datasets
- Write-ups: https://cleanor.app/reference
- License: **CC BY 4.0** (attribution to Cleanor Labs).
