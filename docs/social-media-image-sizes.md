# Social media image sizes (verified 2026-07)

**These change — treat them as correct as of the `measured_date` in the CSV, not forever.** Recommended upload sizes for 7 platforms plus Open Graph: [`data/social-media-image-sizes.csv`](../data/social-media-image-sizes.csv). Every row is stamped with the month it was verified, because platforms revise these without notice.

## The ones you reach for most

| Placement | Size | Ratio |
|---|---|---|
| Open Graph `og:image` (any link) | 1200 × 630 | 1.91:1 |
| YouTube thumbnail | 1280 × 720 | 16:9 |
| Instagram post (portrait, max height) | 1080 × 1350 | 4:5 |
| Instagram / TikTok / FB Story | 1080 × 1920 | 9:16 |
| X (Twitter) header | 1500 × 500 | 3:1 |
| LinkedIn shared post | 1200 × 627 | 1.91:1 |
| Facebook cover | 820 × 312 | 2.63:1 |
| Pinterest standard pin | 1000 × 1500 | 2:3 |

## Notes

- **`og:image` at 1200×630 is the single highest-leverage size**: it is what Facebook, LinkedIn, WhatsApp, Slack, iMessage and X's fallback card all pull when your link is shared. Twitter's large summary card uses the same 1.91:1.
- **Vertical (9:16) is now the default for stories and short video** across Instagram, TikTok and Facebook — design for it first, not as an afterthought crop of a 16:9.
- **Safe areas differ from canvas size.** A YouTube banner is uploaded at 2560×1440 but only the centre 1546×423 is guaranteed visible on all devices; the CSV notes this.

To refresh: re-run `node generators/social-image-sizes.mjs --date 2026-10` after checking the platforms, and the stamp updates.
