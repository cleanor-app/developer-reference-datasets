#!/usr/bin/env node
// Favicon and app-icon size requirements, by platform. Compiled from stable platform
// conventions (HTML favicon set, PWA manifest, Apple Human Interface, Android adaptive icons,
// Windows tiles, store listings). These change rarely; where a platform states a single
// canonical size we give it, where it wants a set we list the set.
//
//   data/favicon-icon-sizes.csv
//   node generators/icon-sizes.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
fs.mkdirSync(DATA, { recursive: true });

// [platform, purpose, size_px, format, reference, notes]
const ICONS = [
  ['Web', 'Classic favicon (multi-size .ico)', '16, 32, 48', 'ICO', 'favicon.ico', 'served at site root; browsers pick a size'],
  ['Web', 'PNG favicon', '16', 'PNG', '<link rel="icon" sizes="16x16">', ''],
  ['Web', 'PNG favicon', '32', 'PNG', '<link rel="icon" sizes="32x32">', 'most-used tab size'],
  ['Web', 'PNG favicon (high-DPI)', '48', 'PNG', '<link rel="icon" sizes="48x48">', ''],
  ['Web', 'Safari pinned tab', '16 (vector)', 'SVG', '<link rel="mask-icon">', 'monochrome SVG'],
  ['Apple', 'apple-touch-icon (current)', '180', 'PNG', '<link rel="apple-touch-icon">', 'iPhone home screen @3x; no transparency'],
  ['Apple', 'apple-touch-icon (iPad Pro)', '167', 'PNG', 'apple-touch-icon-167x167.png', ''],
  ['Apple', 'apple-touch-icon (iPad)', '152', 'PNG', 'apple-touch-icon-152x152.png', ''],
  ['Apple', 'apple-touch-icon (older iPhone)', '120', 'PNG', 'apple-touch-icon-120x120.png', ''],
  ['PWA', 'Manifest icon (min)', '192', 'PNG', 'manifest icons[]', 'required for installability'],
  ['PWA', 'Manifest icon (splash/large)', '512', 'PNG', 'manifest icons[]', 'required for installability'],
  ['PWA', 'Maskable icon', '192, 512', 'PNG', 'purpose:"maskable"', 'keep content in the 80% safe zone'],
  ['Android', 'Adaptive icon canvas', '432', 'PNG/vector', 'ic_launcher (foreground+background)', '108dp @ xxxhdpi; 66dp safe zone'],
  ['Android', 'Legacy launcher mdpi', '48', 'PNG', 'mipmap-mdpi', '48dp baseline'],
  ['Android', 'Legacy launcher hdpi', '72', 'PNG', 'mipmap-hdpi', ''],
  ['Android', 'Legacy launcher xhdpi', '96', 'PNG', 'mipmap-xhdpi', ''],
  ['Android', 'Legacy launcher xxhdpi', '144', 'PNG', 'mipmap-xxhdpi', ''],
  ['Android', 'Legacy launcher xxxhdpi', '192', 'PNG', 'mipmap-xxxhdpi', ''],
  ['Android', 'Play Store listing icon', '512', 'PNG (32-bit)', 'Play Console', 'no transparency'],
  ['iOS', 'App icon (App Store)', '1024', 'PNG', 'AppIcon (Marketing)', 'no alpha; Xcode generates the rest'],
  ['iOS', 'App icon iPhone @3x', '180', 'PNG', 'AppIcon 60pt @3x', ''],
  ['iOS', 'App icon iPhone @2x', '120', 'PNG', 'AppIcon 60pt @2x', ''],
  ['iOS', 'App icon iPad Pro', '167', 'PNG', 'AppIcon 83.5pt @2x', ''],
  ['iOS', 'App icon iPad', '152', 'PNG', 'AppIcon 76pt @2x', ''],
  ['macOS', 'App icon set', '16, 32, 64, 128, 256, 512, 1024', 'PNG (.icns)', 'AppIcon', 'each @1x and @2x'],
  ['Windows', 'PWA/Store tile (small)', '71', 'PNG', 'manifest / Store', ''],
  ['Windows', 'PWA/Store tile (medium)', '150', 'PNG', 'msapplication tile', ''],
  ['Windows', 'PWA/Store tile (large)', '310', 'PNG', 'wide/large tile', ''],
  ['Windows', 'browserconfig tile', '144', 'PNG', 'msapplication-TileImage', ''],
  ['Windows', 'App icon (.ico)', '16, 24, 32, 48, 256', 'ICO', 'app resource', ''],
  ['Chrome Web Store', 'Extension icon', '128', 'PNG', 'manifest icons 128', 'store + toolbar source'],
  ['Chrome extension', 'Toolbar action icon', '16, 32, 48', 'PNG', 'action.default_icon', ''],
];

const q = (v) => { const s = String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const rows = [['platform', 'purpose', 'size_px', 'format', 'reference', 'notes']];
for (const [p, purpose, size, fmt, ref, notes] of ICONS) rows.push([p, purpose, size, fmt, ref, notes]);
fs.writeFileSync(path.join(DATA, 'favicon-icon-sizes.csv'), rows.map((r) => r.map(q).join(',')).join('\n') + '\n');
console.log(`✓ data/favicon-icon-sizes.csv (${rows.length - 1} rows)`);
