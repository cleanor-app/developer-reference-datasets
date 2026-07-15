#!/usr/bin/env node
// Character-encoding size dataset. Pure computation — how many bytes a string costs in UTF-8,
// UTF-16 and UTF-32 across scripts. Ties directly to why QR/QR-like byte-mode payloads and text
// storage differ by language: a Latin character is 1 byte in UTF-8, a CJK glyph is 3, an emoji 4.
//
//   data/encoding-sizes.csv   per sample: code points, and bytes in each encoding
//
//   node generators/encoding-sizes.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
fs.mkdirSync(DATA, { recursive: true });

// Representative samples. Text kept short and neutral; the point is the byte arithmetic per script.
const SAMPLES = [
  ['ascii-basic', 'Latin (ASCII)', 'Hello, world!'],
  ['latin1-accented', 'Latin-1 accented', 'Café, naïve, résumé, Zürich'.normalize('NFC')],
  ['latin-extended', 'Latin extended', 'Łódź, Kraków, Škoda, Þórr'],
  ['greek', 'Greek', 'Καλημέρα κόσμε'],
  ['cyrillic', 'Cyrillic', 'Здравствуй, мир'],
  ['hebrew', 'Hebrew (RTL)', 'שלום עולם'],
  ['arabic', 'Arabic (RTL)', 'مرحبا بالعالم'],
  ['devanagari', 'Devanagari (Hindi)', 'नमस्ते दुनिया'],
  ['thai', 'Thai', 'สวัสดีชาวโลก'],
  ['cjk-chinese', 'Chinese (Han)', '你好，世界'],
  ['cjk-japanese', 'Japanese (mixed)', 'こんにちは世界'],
  ['cjk-korean', 'Korean (Hangul)', '안녕하세요 세계'],
  ['emoji-basic', 'Emoji', '😀🎉🚀'],
  ['emoji-zwj', 'Emoji (ZWJ family)', '👨‍👩‍👧‍👦'],
  ['emoji-flag', 'Emoji (flag)', '🇺🇸'],
  ['mixed', 'Mixed scripts + emoji', 'Hi 世界 مرحبا 🚀'],
];

const rows = [['sample_id', 'script', 'code_points', 'utf16_code_units', 'utf8_bytes', 'utf16_bytes', 'utf32_bytes', 'utf8_bytes_per_code_point']];
for (const [id, script, text] of SAMPLES) {
  const codePoints = [...text].length; // spread iterates by code point
  const utf16Units = text.length; // JS string length = UTF-16 code units
  const utf8 = Buffer.byteLength(text, 'utf8');
  const utf16 = utf16Units * 2;
  const utf32 = codePoints * 4;
  rows.push([id, `"${script}"`, codePoints, utf16Units, utf8, utf16, utf32, (utf8 / codePoints).toFixed(2)]);
}
fs.writeFileSync(path.join(DATA, 'encoding-sizes.csv'), rows.map((r) => r.join(',')).join('\n') + '\n');
console.log(`✓ data/encoding-sizes.csv (${rows.length - 1} rows)`);
