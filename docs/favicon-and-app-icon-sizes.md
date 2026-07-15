# Favicon and app icon sizes: every platform, as a table

**The favicon set is 16, 32 and 48 px; the current Apple touch icon is 180; a PWA needs a 192 and a 512; the iOS App Store icon is 1024; the Play Store icon is 512.** The full per-platform list, with the format and where each goes, is [`data/favicon-icon-sizes.csv`](../data/favicon-icon-sizes.csv).

## The short answer per platform

| Platform | The sizes that matter | Format |
|---|---|---|
| Web favicon | 16, 32, 48 (in one `.ico`) + PNG 16/32/48 | ICO + PNG |
| Apple touch icon | **180** (current), plus 167 / 152 / 120 for older devices | PNG, no alpha |
| PWA manifest | **192 and 512** (both required to install), maskable versions too | PNG |
| Android launcher | adaptive 432 canvas; legacy 48/72/96/144/192 by density | PNG / vector |
| iOS app | **1024** master (Xcode generates 180/167/152/120…) | PNG, no alpha |
| Android Play Store | **512** listing icon | PNG, no alpha |
| Windows tiles | 71 / 150 / 310, plus 144 `msapplication-TileImage` | PNG |
| Chrome extension | **128** store icon + 16/32/48 toolbar | PNG |

## Two things that trip people up

- **Apple touch icons and store icons must have no transparency.** iOS and the stores composite them onto their own rounded-rect mask; an alpha channel shows as black. Ship them flat.
- **A PWA is only installable with both a 192 and a 512 in the manifest.** Miss either and the install prompt never appears. Add `purpose: "maskable"` copies so Android doesn't letterbox the icon.

The CSV has the `reference` column with the exact `<link>` / manifest key / resource name for each row, so it doubles as a checklist when generating an icon set.
