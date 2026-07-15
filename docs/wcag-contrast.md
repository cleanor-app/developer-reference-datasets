# Which colour pairs pass WCAG contrast? A computed dataset

**WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text (AA), 3:1 for large text, and 7:1 for AAA.** This dataset computes the ratio and the pass/fail for every foreground/background pair of a 25-colour UI palette: [`data/wcag-contrast-pairs.csv`](../data/wcag-contrast-pairs.csv), plus each colour against white and black in [`data/wcag-on-white-black.csv`](../data/wcag-on-white-black.csv).

## Each neutral on white

The most common question is "will this grey text pass on a white background". Straight from [`data/wcag-on-white-black.csv`](../data/wcag-on-white-black.csv):

| Colour | Hex | Contrast on white | AA normal (4.5) | AAA normal (7.0) |
|---|---|---|---|---|
| gray-400 | #9ca3af | 2.54 | fail | fail |
| gray-500 | #6b7280 | 4.83 | **pass** | fail |
| gray-600 | #4b5563 | 7.56 | pass | **pass** |
| gray-700 | #374151 | 10.31 | pass | pass |
| gray-900 | #111827 | 17.74 | pass | pass |

The practical line: on white, body text needs **gray-500 or darker** to pass AA, and **gray-600 or darker** to pass AAA. Anything lighter than gray-500 fails for normal text.

## The formula

WCAG contrast is `(L1 + 0.05) / (L2 + 0.05)`, where L is relative luminance: linearise each sRGB channel (`c ≤ 0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`), then `0.2126·R + 0.7152·G + 0.0722·B`. Thresholds: AA normal 4.5, AA large 3.0, AAA normal 7.0, AAA large 4.5. Implemented in [`generators/wcag-contrast.mjs`](../generators/wcag-contrast.mjs); check any row against an online contrast tool and it will match.

## Using the pairs file

[`data/wcag-contrast-pairs.csv`](../data/wcag-contrast-pairs.csv) has all 600 ordered pairs (25 colours, both directions, minus same-on-same). Filter `aa_normal == pass` for a palette of legible text/background combinations, or sort by `contrast_ratio` to find the safest pairings. Swap in your own palette by editing the `PALETTE` map and re-running.
