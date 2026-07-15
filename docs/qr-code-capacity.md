# QR code capacity: max characters by version and error-correction level

**A version-1 QR code holds up to 41 digits, 25 alphanumeric characters, or 17 bytes at the lowest error-correction level; the largest (version 40) holds 7,089 digits, 4,296 alphanumeric, or 2,953 bytes.** The full table for all 40 versions × 4 error-correction levels × 4 encoding modes is [`data/qr-code-capacity.csv`](../data/qr-code-capacity.csv).

## How capacity works

A QR code's size is its **version** (1–40, each adding 4 modules per side: version 1 is 21×21, version 40 is 177×177). Its resilience is the **error-correction level** — L (7%), M (15%), Q (25%), H (30%) of codewords recoverable. Higher correction means fewer data codewords, so **more error correction = less capacity**.

Capacity also depends on the **encoding mode**, because a character costs a different number of bits:

| Mode | Bits per character | Charset |
|---|---|---|
| Numeric | 3.33 (10 bits per 3 digits) | 0–9 |
| Alphanumeric | 5.5 (11 bits per 2 chars) | 0–9 A–Z space $%*+-./: |
| Byte | 8 (UTF-8, so more for non-Latin) | any |
| Kanji | 13 | Shift-JIS |

## Version 1 across the four levels

Straight from [`data/qr-code-capacity.csv`](../data/qr-code-capacity.csv):

| ECC | Recovery | Numeric | Alphanumeric | Byte | Kanji |
|---|---|---|---|---|---|
| L | 7% | 41 | 25 | 17 | 10 |
| M | 15% | 34 | 20 | 14 | 8 |
| Q | 25% | 27 | 16 | 11 | 7 |
| H | 30% | 17 | 10 | 7 | 4 |

A URL is encoded in byte mode, so a version-1 code at level M fits only 14 bytes — shorter than most URLs, which is why a link usually pushes the code to version 3+. Encoding digits as **numeric** instead of byte holds 2.4× as many (this is the fix behind Cleanor's own QR encoder: 17 digits used to force version 1 into byte mode where 41 fit).

## Method

Computed from first principles using the exact ISO/IEC 18004 error-correction codeword tables that [Cleanor's QR encoder](https://cleanor.app/tools/qr-code-generator) uses: data codewords = ⌊raw modules ÷ 8⌋ − (EC codewords per block × blocks), then available bits minus the mode indicator and character-count field, divided by the bits per character. Verified against the published capacity table at versions 1, 10 and 40 (v40-L byte = 2,953 ✓). Generator: [`generators/qr-code-capacity.mjs`](../generators/qr-code-capacity.mjs).
