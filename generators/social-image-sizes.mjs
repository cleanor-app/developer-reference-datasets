#!/usr/bin/env node
// Social-media image size reference. UNLIKE the other datasets these values are VOLATILE — the
// platforms change them — so every row carries the date it was verified, and the CSV header says
// so. Treat as "correct as of measured_date", not eternal.
//
//   data/social-media-image-sizes.csv
//   node generators/social-image-sizes.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
fs.mkdirSync(DATA, { recursive: true });

// Recommended upload sizes as of the date below. Pass --date to stamp a fresh verification.
const argv = process.argv.slice(2);
const MEASURED = argv[argv.indexOf('--date') + 1] && argv.includes('--date') ? argv[argv.indexOf('--date') + 1] : '2026-07';

// [platform, placement, width, height, aspect_ratio, notes]
const S = [
  ['Instagram', 'Profile picture', 320, 320, '1:1', 'displays as circle'],
  ['Instagram', 'Post (square)', 1080, 1080, '1:1', ''],
  ['Instagram', 'Post (portrait)', 1080, 1350, '4:5', 'max feed height'],
  ['Instagram', 'Post (landscape)', 1080, 566, '1.91:1', ''],
  ['Instagram', 'Story / Reel', 1080, 1920, '9:16', ''],
  ['Facebook', 'Profile picture', 320, 320, '1:1', 'displays as circle'],
  ['Facebook', 'Cover photo', 820, 312, '2.63:1', 'safe area smaller on mobile'],
  ['Facebook', 'Shared post / link image', 1200, 630, '1.91:1', 'same as Open Graph'],
  ['Facebook', 'Story', 1080, 1920, '9:16', ''],
  ['X (Twitter)', 'Profile picture', 400, 400, '1:1', 'displays as circle'],
  ['X (Twitter)', 'Header', 1500, 500, '3:1', ''],
  ['X (Twitter)', 'In-stream image', 1600, 900, '16:9', 'single image'],
  ['X (Twitter)', 'Summary card (large)', 1200, 628, '1.91:1', 'twitter:image'],
  ['LinkedIn', 'Profile picture', 400, 400, '1:1', ''],
  ['LinkedIn', 'Personal cover', 1584, 396, '4:1', ''],
  ['LinkedIn', 'Company logo', 300, 300, '1:1', ''],
  ['LinkedIn', 'Company cover', 1128, 191, '5.9:1', ''],
  ['LinkedIn', 'Shared post image', 1200, 627, '1.91:1', ''],
  ['YouTube', 'Channel avatar', 800, 800, '1:1', ''],
  ['YouTube', 'Channel banner', 2560, 1440, '16:9', 'safe area 1546×423 centred'],
  ['YouTube', 'Video thumbnail', 1280, 720, '16:9', 'min 640 wide'],
  ['TikTok', 'Profile picture', 200, 200, '1:1', ''],
  ['TikTok', 'Video', 1080, 1920, '9:16', ''],
  ['Pinterest', 'Profile picture', 165, 165, '1:1', ''],
  ['Pinterest', 'Standard pin', 1000, 1500, '2:3', 'recommended ratio'],
  ['Open Graph', 'og:image (all sites)', 1200, 630, '1.91:1', 'min 200×200; <8 MB'],
];

const q = (v) => { const s = String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const rows = [['platform', 'placement', 'width_px', 'height_px', 'aspect_ratio', 'measured_date', 'notes']];
for (const [p, place, w, h, ar, notes] of S) rows.push([p, place, w, h, ar, MEASURED, notes]);
fs.writeFileSync(path.join(DATA, 'social-media-image-sizes.csv'), rows.map((r) => r.map(q).join(',')).join('\n') + '\n');
console.log(`✓ data/social-media-image-sizes.csv (${rows.length - 1} rows, verified ${MEASURED})`);
