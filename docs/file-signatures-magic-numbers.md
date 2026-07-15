# File signatures (magic numbers): identify a file by its bytes

**The first few bytes of a file usually tell you what it really is, regardless of its extension.** This dataset lists the magic-number signature, its byte offset, and the MIME type for 54 file formats that have one: [`data/file-types.csv`](../data/file-types.csv) (12 more text formats have no signature and are marked as such).

## The common signatures

| Type | Signature (hex) | Offset | ASCII |
|---|---|---|---|
| PNG | `89 50 4E 47 0D 0A 1A 0A` | 0 | `.PNG....` |
| JPEG | `FF D8 FF` | 0 | |
| GIF | `47 49 46 38` | 0 | `GIF8` |
| PDF | `25 50 44 46` | 0 | `%PDF` |
| ZIP (also docx/xlsx/jar) | `50 4B 03 04` | 0 | `PK..` |
| gzip | `1F 8B` | 0 | |
| WebP | `57 45 42 50` | **8** | `WEBP` (RIFF at 0) |
| MP4 / MOV / HEIC / AVIF | `66 74 79 70` | **4** | `ftyp` (brand at 8) |
| WebM / MKV | `1A 45 DF A3` | 0 | EBML |
| SQLite | `53 51 4C 69 74 65 20 66 6F 72 6D 61 74 20 33 00` | 0 | `SQLite format 3\0` |
| ELF | `7F 45 4C 46` | 0 | `.ELF` |
| WASM | `00 61 73 6D` | 0 | `\0asm` |
| Class (Java) | `CA FE BA BE` | 0 | |

## Why the offset column matters

Not every signature is at byte 0:

- **RIFF containers** (WebP, WAV, AVI) all start with `52 49 46 46` (`RIFF`) at offset 0, and only differ at **byte 8** (`WEBP`, `WAVE`, `AVI `). Reading byte 0 alone can't tell them apart — this dataset stores the *distinguishing* bytes and their offset.
- **ISO-BMFF containers** (MP4, MOV, M4A, HEIC, AVIF) put `ftyp` at **byte 4**, then a brand at byte 8.
- **tar** puts `ustar` at **byte 257**, deep inside the header.

That is the whole reason a magic-number table needs an offset column and most "magic bytes" lists that only give byte 0 quietly get RIFF and ISO-BMFF formats wrong. Filter [`data/file-types.csv`](../data/file-types.csv) for a non-empty `magic_hex` to get every format with a signature.
