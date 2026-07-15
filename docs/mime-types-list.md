# MIME types list: extension to Content-Type, as a CSV

**A clean, importable table mapping 66 common file extensions to their MIME (media) type** — the value you put in a `Content-Type` header or check on upload. Full data: [`data/file-types.csv`](../data/file-types.csv) (the same file also carries the byte signature for each type; see [file signatures](file-signatures-magic-numbers.md)).

## The ones people look up most

| Extension | MIME type |
|---|---|
| .json | application/json |
| .pdf | application/pdf |
| .png | image/png |
| .jpg | image/jpeg |
| .webp | image/webp |
| .svg | image/svg+xml |
| .mp4 | video/mp4 |
| .webm | video/webm |
| .mp3 | audio/mpeg |
| .zip | application/zip |
| .csv | text/csv |
| .woff2 | font/woff2 |
| .docx | application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| .xlsx | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet |
| .wasm | application/wasm |

## Traps worth knowing

- **`.docx`, `.xlsx`, `.pptx`, `.epub` are all ZIP containers.** Their magic bytes are `50 4B 03 04` (a ZIP), so you cannot tell them apart by the first four bytes — you have to look inside. The MIME type is specific; the signature is not.
- **`.svg` is `image/svg+xml`, not `image/svg`.** It is XML text with no binary signature.
- **`.js` is `text/javascript`** in the current IANA registration (the old `application/javascript` still works but is obsolete).
- **`.mp4`, `.m4a`, `.mov`, `.heic`, `.avif` share the ISO-BMFF `ftyp` box** at byte 4; the *brand* at byte 8 (`isom`, `M4A `, `qt  `, `heic`, `avif`) is what distinguishes them.

Filter [`data/file-types.csv`](../data/file-types.csv) by the `category` column (image, audio, video, archive, document, font, executable, data, web, text) to pull just the group you need.
