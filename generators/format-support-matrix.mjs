#!/usr/bin/env node
// Image/video format browser-support matrix. Transforms a vendored caniuse snapshot
// (data/sources/caniuse-format-support.json) into a flat CSV: for each format × browser, the
// first version with FULL support and the current status. Dependency-free — reads the JSON.
//
// The snapshot is derived from caniuse-lite (CC BY 4.0), and its `caniuse_version` field is the
// data vintage. To refresh it, in a project that has caniuse-lite installed, re-run the
// extraction documented in docs/image-format-support.md, then re-run this.
//
//   data/image-format-support.csv
//   node generators/format-support-matrix.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
const snap = JSON.parse(fs.readFileSync(path.join(DATA, 'sources', 'caniuse-format-support.json'), 'utf8'));

const q = (v) => { const s = String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const rows = [['format', 'format_title', 'browser', 'browser_name', 'first_full_support_version', 'current_support', 'caniuse_version']];
for (const [fkey, f] of Object.entries(snap.formats)) {
  for (const [bkey, b] of Object.entries(f.browsers)) {
    rows.push([fkey, f.title, bkey, b.name, b.first_full_version ?? 'never', b.current, snap.caniuse_version]);
  }
}
fs.writeFileSync(path.join(DATA, 'image-format-support.csv'), rows.map((r) => r.map(q).join(',')).join('\n') + '\n');
console.log(`✓ data/image-format-support.csv (${rows.length - 1} rows, caniuse-lite ${snap.caniuse_version})`);
