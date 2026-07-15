#!/usr/bin/env node
// WCAG contrast-ratio dataset. Pure computation from the WCAG 2.1 relative-luminance formula —
// no inputs, fully reproducible, and independently checkable against any online contrast tool.
//
// For a curated palette of common UI colors, every ordered foreground/background pair gets its
// contrast ratio and its WCAG 2.1 pass/fail for AA and AAA at normal and large text.
//
//   data/wcag-contrast-pairs.csv   every fg×bg pair
//   data/wcag-on-white-black.csv   each colour vs white and vs black (the most-asked question)
//
//   node generators/wcag-contrast.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
fs.mkdirSync(DATA, { recursive: true });

// A palette of colours a UI actually uses: neutrals + one ramp of common accent hues.
const PALETTE = {
  white: 'ffffff', 'gray-50': 'f9fafb', 'gray-100': 'f3f4f6', 'gray-200': 'e5e7eb',
  'gray-300': 'd1d5db', 'gray-400': '9ca3af', 'gray-500': '6b7280', 'gray-600': '4b5563',
  'gray-700': '374151', 'gray-800': '1f2937', 'gray-900': '111827', black: '000000',
  'red-500': 'ef4444', 'red-700': 'b91c1c', 'orange-500': 'f97316', 'amber-500': 'f59e0b',
  'green-500': '22c55e', 'green-700': '15803d', 'teal-500': '14b8a6', 'blue-500': '3b82f6',
  'blue-600': '2563eb', 'blue-700': '1d4ed8', 'indigo-500': '6366f1', 'purple-500': 'a855f7',
  'pink-500': 'ec4899',
};

// WCAG 2.1 relative luminance and contrast ratio.
function luminance(hex) {
  const c = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a, b) {
  const la = luminance(a), lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
// WCAG 2.1: AA normal 4.5, AA large 3.0, AAA normal 7.0, AAA large 4.5.
const pass = (r) => ({
  aa_normal: r >= 4.5 ? 'pass' : 'fail',
  aa_large: r >= 3.0 ? 'pass' : 'fail',
  aaa_normal: r >= 7.0 ? 'pass' : 'fail',
  aaa_large: r >= 4.5 ? 'pass' : 'fail',
});

const names = Object.keys(PALETTE);
const pairs = [['fg_name', 'fg_hex', 'bg_name', 'bg_hex', 'contrast_ratio', 'aa_normal', 'aa_large', 'aaa_normal', 'aaa_large']];
for (const fg of names) {
  for (const bg of names) {
    if (fg === bg) continue;
    const r = contrast(PALETTE[fg], PALETTE[bg]);
    const p = pass(r);
    pairs.push([fg, `#${PALETTE[fg]}`, bg, `#${PALETTE[bg]}`, r.toFixed(2), p.aa_normal, p.aa_large, p.aaa_normal, p.aaa_large]);
  }
}
fs.writeFileSync(path.join(DATA, 'wcag-contrast-pairs.csv'), pairs.map((r) => r.join(',')).join('\n') + '\n');

const wb = [['color_name', 'hex', 'vs', 'contrast_ratio', 'aa_normal', 'aa_large', 'aaa_normal', 'aaa_large']];
for (const name of names) {
  for (const [bg, bghex] of [['white', 'ffffff'], ['black', '000000']]) {
    if (PALETTE[name] === bghex) continue;
    const r = contrast(PALETTE[name], bghex);
    const p = pass(r);
    wb.push([name, `#${PALETTE[name]}`, bg, r.toFixed(2), p.aa_normal, p.aa_large, p.aaa_normal, p.aaa_large]);
  }
}
fs.writeFileSync(path.join(DATA, 'wcag-on-white-black.csv'), wb.map((r) => r.join(',')).join('\n') + '\n');

console.log(`✓ data/wcag-contrast-pairs.csv (${pairs.length - 1} rows), data/wcag-on-white-black.csv (${wb.length - 1} rows)`);
