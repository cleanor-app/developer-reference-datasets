#!/usr/bin/env node
// QR code capacity dataset. Computed from first principles — the same error-correction codeword
// tables Cleanor's own QR encoder uses (ISO/IEC 18004) — so every number is derived, not typed.
// For each version (1-40) and error-correction level (L/M/Q/H), the maximum characters in
// numeric, alphanumeric, byte (UTF-8) and kanji mode.
//
//   data/qr-code-capacity.csv
//   node generators/qr-code-capacity.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
fs.mkdirSync(DATA, { recursive: true });

// Copied verbatim from the encoder (src/lib/browser-qr-tools.ts). Index 0 is padding.
const ECC_CODEWORDS_PER_BLOCK = {
  L: [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  M: [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  Q: [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  H: [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
};
const NUM_BLOCKS = {
  L: [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  M: [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  Q: [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  H: [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
};

function rawDataModules(version) {
  const size = version * 4 + 17;
  let r = size * size - 8 * 8 * 3 - (15 * 2 + 1) - (size - 16) * 2;
  if (version >= 2) {
    const n = Math.floor(version / 7) + 2;
    r -= (n - 1) * (n - 1) * 25;
    r -= (n - 2) * 2 * 20;
    if (version >= 7) r -= 6 * 3 * 2;
  }
  return r;
}
const dataCodewords = (v, ecc) => Math.floor(rawDataModules(v) / 8) - ECC_CODEWORDS_PER_BLOCK[ecc][v] * NUM_BLOCKS[ecc][v];

// Character-count bit widths by mode and version band (1-9 / 10-26 / 27-40).
const CC = { numeric: [10, 12, 14], alphanumeric: [9, 11, 13], byte: [8, 16, 16], kanji: [8, 10, 12] };
const ccBits = (mode, v) => CC[mode][v <= 9 ? 0 : v <= 26 ? 1 : 2];

function capacity(mode, v, ecc) {
  const bits = dataCodewords(v, ecc) * 8 - 4 - ccBits(mode, v);
  if (mode === 'numeric') { const full = Math.floor(bits / 10) * 3, rem = bits % 10; return full + (rem >= 7 ? 2 : rem >= 4 ? 1 : 0); }
  if (mode === 'alphanumeric') { const full = Math.floor(bits / 11) * 2, rem = bits % 11; return full + (rem >= 6 ? 1 : 0); }
  if (mode === 'byte') return Math.floor(bits / 8);
  return Math.floor(bits / 13); // kanji: 13 bits per character
}

const rows = [['version', 'modules', 'ecc_level', 'ecc_recovery_pct', 'numeric', 'alphanumeric', 'byte', 'kanji', 'data_codewords']];
const RECOVERY = { L: 7, M: 15, Q: 25, H: 30 };
for (let v = 1; v <= 40; v++) {
  for (const ecc of ['L', 'M', 'Q', 'H']) {
    rows.push([v, v * 4 + 17, ecc, RECOVERY[ecc], capacity('numeric', v, ecc), capacity('alphanumeric', v, ecc), capacity('byte', v, ecc), capacity('kanji', v, ecc), dataCodewords(v, ecc)]);
  }
}
fs.writeFileSync(path.join(DATA, 'qr-code-capacity.csv'), rows.map((r) => r.join(',')).join('\n') + '\n');

// Self-check against the published ISO table for version 1, level L: 41 / 25 / 17 / 10.
const v1 = ['numeric', 'alphanumeric', 'byte', 'kanji'].map((m) => capacity(m, 1, 'L'));
const ok = v1.join(',') === '41,25,17,10';
console.log(`✓ data/qr-code-capacity.csv (${rows.length - 1} rows) · v1-L check ${v1.join('/')} ${ok ? 'OK' : 'MISMATCH (expected 41/25/17/10)'}`);
if (!ok) process.exit(1);
