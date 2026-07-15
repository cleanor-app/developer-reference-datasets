#!/usr/bin/env node
// Aspect ratio reference dataset. Pure computation — no inputs, fully reproducible.
//
// Emits two CSVs:
//   data/aspect-ratios.csv        named ratio × common width -> exact height (the lookup people
//                                 actually want: "16:9 at 1920 wide is 1080 tall")
//   data/resolutions.csv          common named resolutions -> pixel size -> reduced ratio
//
//   node generators/aspect-ratios.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
fs.mkdirSync(DATA, { recursive: true });
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// Named ratios: [w, h, orientation, common use].
const RATIOS = [
  [1, 1, 'square', 'Instagram post, avatars, app icons'],
  [4, 3, 'landscape', 'classic TV/monitor, iPad, most cameras'],
  [3, 2, 'landscape', '35mm photography, DSLR sensors'],
  [16, 9, 'landscape', 'HD/4K video, modern displays, YouTube'],
  [16, 10, 'landscape', 'laptop and monitor panels'],
  [21, 9, 'landscape', 'ultrawide monitor, cinematic 2.35:1 approx'],
  [5, 4, 'landscape', 'large-format print, older monitors'],
  [3, 4, 'portrait', 'portrait photo, print'],
  [2, 3, 'portrait', 'portrait 35mm, Pinterest'],
  [9, 16, 'portrait', 'Stories, Reels, TikTok, phone video'],
  [9, 21, 'portrait', 'ultrawide portrait'],
  [4, 5, 'portrait', 'Instagram portrait post'],
  [1, 2, 'portrait', 'tall banners'],
  [2, 1, 'landscape', 'wide banners, panoramas'],
  [1.85, 1, 'landscape', 'cinema flat (DCI 1.85:1)'],
  [2.39, 1, 'landscape', 'cinema scope (anamorphic 2.39:1)'],
];
const WIDTHS = [320, 640, 720, 800, 1024, 1080, 1280, 1440, 1920, 2560, 3840];

const rows1 = [['ratio', 'ratio_w', 'ratio_h', 'ratio_decimal', 'orientation', 'use_case', 'width_px', 'height_px']];
for (const [w, h, orient, use] of RATIOS) {
  const label = Number.isInteger(w) && Number.isInteger(h) ? `${w}:${h}` : `${w}:${h}`;
  const dec = (w / h).toFixed(4);
  for (const width of WIDTHS) {
    const height = Math.round((width * h) / w);
    rows1.push([label, w, h, dec, orient, `"${use}"`, width, height]);
  }
}
fs.writeFileSync(path.join(DATA, 'aspect-ratios.csv'), rows1.map((r) => r.join(',')).join('\n') + '\n');

// Common named resolutions -> reduced aspect ratio.
const RES = [
  ['nHD', 640, 360], ['qHD', 960, 540], ['HD (720p)', 1280, 720], ['HD+', 1600, 900],
  ['Full HD (1080p)', 1920, 1080], ['QHD (1440p)', 2560, 1440], ['QHD+', 3200, 1800],
  ['4K UHD', 3840, 2160], ['DCI 4K', 4096, 2160], ['5K', 5120, 2880], ['8K UHD', 7680, 4320],
  ['WXGA', 1366, 768], ['WUXGA', 1920, 1200], ['WQXGA', 2560, 1600], ['UWQHD (ultrawide)', 3440, 1440],
  ['XGA', 1024, 768], ['SXGA', 1280, 1024], ['UXGA', 1600, 1200], ['SVGA', 800, 600], ['VGA', 640, 480],
  ['iPhone 15 Pro', 1179, 2556], ['Pixel 8', 1080, 2400], ['iPad 10.9"', 1640, 2360],
  ['Instagram square', 1080, 1080], ['Instagram portrait', 1080, 1350], ['Story/Reel', 1080, 1920],
  ['YouTube thumbnail', 1280, 720], ['Twitter/X header', 1500, 500], ['OG image', 1200, 630],
];
const rows2 = [['name', 'width_px', 'height_px', 'megapixels', 'aspect_ratio', 'aspect_decimal', 'orientation']];
for (const [name, w, h] of RES) {
  const g = gcd(w, h);
  const ar = `${w / g}:${h / g}`;
  const orient = w > h ? 'landscape' : w < h ? 'portrait' : 'square';
  rows2.push([`"${name}"`, w, h, ((w * h) / 1e6).toFixed(2), ar, (w / h).toFixed(4), orient]);
}
fs.writeFileSync(path.join(DATA, 'resolutions.csv'), rows2.map((r) => r.join(',')).join('\n') + '\n');

console.log(`✓ data/aspect-ratios.csv (${rows1.length - 1} rows), data/resolutions.csv (${rows2.length - 1} rows)`);
