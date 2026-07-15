# Column descriptions

Every column of every CSV in this dataset. Generated from `docs/kaggle/dataset-metadata.json`.

## `aspect-ratios.csv`

_Named aspect ratios × common widths → exact height._

| Column | Type | Description |
| --- | --- | --- |
| `ratio` | string | Aspect ratio label (e.g. 16:9) |
| `ratio_w` | number | Ratio width term |
| `ratio_h` | number | Ratio height term |
| `ratio_decimal` | number | Width/height as a decimal |
| `orientation` | string | landscape, portrait, or square |
| `use_case` | string | Where the ratio is commonly used |
| `width_px` | number | Width in pixels |
| `height_px` | number | Computed height in pixels |

## `resolutions.csv`

_Named resolutions → pixel size, megapixels, reduced aspect ratio._

| Column | Type | Description |
| --- | --- | --- |
| `name` | string | Resolution name |
| `width_px` | number | Width in pixels |
| `height_px` | number | Height in pixels |
| `megapixels` | number | Total megapixels |
| `aspect_ratio` | string | Reduced aspect ratio |
| `aspect_decimal` | number | Aspect ratio as a decimal |
| `orientation` | string | landscape, portrait, or square |

## `wcag-contrast-pairs.csv`

_WCAG 2.1 contrast ratio and AA/AAA pass-fail for every fg×bg colour pair._

| Column | Type | Description |
| --- | --- | --- |
| `fg_name` | string | Foreground colour name |
| `fg_hex` | string | Foreground hex |
| `bg_name` | string | Background colour name |
| `bg_hex` | string | Background hex |
| `contrast_ratio` | number | WCAG 2.1 contrast ratio |
| `aa_normal` | string | Pass/fail AA normal text (>=4.5) |
| `aa_large` | string | Pass/fail AA large text (>=3.0) |
| `aaa_normal` | string | Pass/fail AAA normal text (>=7.0) |
| `aaa_large` | string | Pass/fail AAA large text (>=4.5) |

## `wcag-on-white-black.csv`

_Each colour's contrast vs white and vs black with AA/AAA pass-fail._

| Column | Type | Description |
| --- | --- | --- |
| `color_name` | string | Colour name |
| `hex` | string | Colour hex |
| `vs` | string | Background compared against (white/black) |
| `contrast_ratio` | number | WCAG 2.1 contrast ratio |
| `aa_normal` | string | Pass/fail AA normal text |
| `aa_large` | string | Pass/fail AA large text |
| `aaa_normal` | string | Pass/fail AAA normal text |
| `aaa_large` | string | Pass/fail AAA large text |

## `encoding-sizes.csv`

_Code points and UTF-8/16/32 byte sizes per text sample by script._

| Column | Type | Description |
| --- | --- | --- |
| `sample_id` | string | Sample identifier |
| `script` | string | Writing system |
| `code_points` | number | Number of Unicode code points |
| `utf16_code_units` | number | Number of UTF-16 code units |
| `utf8_bytes` | number | Size in UTF-8 bytes |
| `utf16_bytes` | number | Size in UTF-16 bytes |
| `utf32_bytes` | number | Size in UTF-32 bytes |
| `utf8_bytes_per_code_point` | number | UTF-8 bytes per code point |

## `file-types.csv`

_66 file types → MIME type and magic-number signature (with byte offset)._

| Column | Type | Description |
| --- | --- | --- |
| `category` | string | File category (image, audio, video, archive, document, font, executable, data, web, text) |
| `extension` | string | File extension |
| `mime_type` | string | IANA media type |
| `magic_hex` | string | Distinguishing byte signature in hex (blank for text formats) |
| `magic_offset_bytes` | number | Byte offset of the signature |
| `notes` | string | Disambiguation notes |

## `favicon-icon-sizes.csv`

_Favicon and app-icon size requirements per platform._

| Column | Type | Description |
| --- | --- | --- |
| `platform` | string | Platform or context |
| `purpose` | string | What the icon is for |
| `size_px` | string | Required pixel size(s) |
| `format` | string | File format |
| `reference` | string | The link/manifest key/resource name |
| `notes` | string | Notes |

## `social-media-image-sizes.csv`

_Recommended social-media image sizes, date-stamped (they change)._

| Column | Type | Description |
| --- | --- | --- |
| `platform` | string | Social platform |
| `placement` | string | Where the image goes |
| `width_px` | number | Recommended width in pixels |
| `height_px` | number | Recommended height in pixels |
| `aspect_ratio` | string | Aspect ratio |
| `measured_date` | string | Month the value was verified |
| `notes` | string | Safe-area and other notes |

## `qr-code-capacity.csv`

_Max characters per QR version × ECC level × mode (computed from ISO/IEC 18004)._

| Column | Type | Description |
| --- | --- | --- |
| `version` | number | QR version 1-40 |
| `modules` | number | Side length in modules |
| `ecc_level` | string | Error-correction level L/M/Q/H |
| `ecc_recovery_pct` | number | Percent of codewords recoverable |
| `numeric` | number | Max digits in numeric mode |
| `alphanumeric` | number | Max chars in alphanumeric mode |
| `byte` | number | Max bytes in byte (UTF-8) mode |
| `kanji` | number | Max characters in kanji mode |
| `data_codewords` | number | Data codewords available |

## `image-format-support.csv`

_AVIF/WebP/JPEG XL/HEIC/AV1/HEVC support per browser (first full version + current)._

| Column | Type | Description |
| --- | --- | --- |
| `format` | string | Format key |
| `format_title` | string | Format title |
| `browser` | string | Browser key |
| `browser_name` | string | Browser name |
| `first_full_support_version` | string | First version with full support ('never' if none) |
| `current_support` | string | full / partial / no / unknown |
| `caniuse_version` | string | caniuse-lite data vintage |
