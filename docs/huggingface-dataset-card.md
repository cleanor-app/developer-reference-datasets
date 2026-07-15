---
license: cc-by-4.0
language:
  - en
pretty_name: "Developer Reference Datasets: Aspect Ratios, WCAG Contrast, MIME, Encoding, QR"
tags:
  - aspect-ratio
  - screen-resolution
  - wcag
  - accessibility
  - color-contrast
  - mime-types
  - magic-numbers
  - character-encoding
  - utf-8
  - qr-code
  - web-development
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

<img src="https://raw.githubusercontent.com/cleanor-app/developer-reference-datasets/main/docs/kaggle/cover.png" alt="Developer Reference Datasets: aspect ratios, WCAG contrast, MIME, encoding, QR, format support" width="720">

Open, reproducible lookup tables that web and app developers reach for constantly — **computed from first principles, not scraped, so every value is exact and re-runnable.** CC BY 4.0.

## Quick answers (straight from the data)

- **What is 16:9 in pixels?** 1920×1080, 1280×720, 3840×2160. 9:16 (Stories, Reels, TikTok) is those flipped. → `aspect-ratios`, `resolutions`
- **What contrast ratio does WCAG require?** 4.5:1 for normal text (AA), 3:1 for large, 7:1 for AAA. `#6b7280` on white is 4.83 (passes AA); `#9ca3af` is 2.54 (fails). → `wcag-contrast-pairs`, `wcag-on-white-black`
- **How many bytes is a character?** In UTF-8: Latin 1, accented/Greek/Cyrillic 2, CJK 3, most emoji 4 (a flag emoji is 8 bytes / 2 code points). → `encoding-sizes`
- **What is the MIME type / magic number of a file?** Extension → MIME type + byte signature, **with the offset** (RIFF/ISO-BMFF/tar signatures are not at byte 0, which most lists get wrong). `.docx` is a ZIP (`PK`). → `file-types`
- **How many characters fit in a QR code?** A version-1 QR holds 41 digits / 25 alphanumeric / 17 bytes at ECC level L; up to 7,089 digits at version 40. Computed from ISO/IEC 18004, verified. → `qr-code-capacity`
- **Which browsers support AVIF / WebP / JPEG XL?** AVIF is fully supported since Chrome 85, Firefox 93, Safari 16.4; JPEG XL is fully supported nowhere. → `image-format-support`
- Plus favicon/app-icon sizes per platform and current social-media image sizes (date-stamped).

## Why it's trustworthy

These are exact answers from the spec, not measurements. An aspect ratio, a WCAG contrast ratio, a UTF-8 byte count and a QR capacity are computable — so the CSVs are computed and re-runnable, and checkable against any online tool.

- **Cite:** DOI [10.5281/zenodo.21369536](https://doi.org/10.5281/zenodo.21369536) (concept DOI, all versions, CC BY 4.0, Cleanor Labs)
- **Code + methodology:** https://github.com/cleanor-app/developer-reference-datasets
- **Human-readable write-ups:** https://cleanor.app/research/open-datasets
- **License:** CC BY 4.0 (attribution to Cleanor Labs).
