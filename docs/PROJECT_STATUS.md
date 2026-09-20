# Project Status

Last updated: 2026-09-20

## Now

SaaS code is on GitHub `main` (`24997ca`) and live at https://lyricgenerator.cc. `/pricing` is public. Existing homepage SEO copy is unchanged. Production still needs hosted libSQL, live PayPal env on Vercel, and a local generator hotfix (`ea776c4`) that GitHub/Vercel CLI could not finish because this machine lost GitHub:443 and Vercel device login was not completed.

## Done

- Workspace connected to https://github.com/heatsing/LyricGenerator (`main`)
- SaaS auth, entitlements, GSong pricing, PayPal sandbox + live plans
- First SaaS commit pushed and auto-deployed by Vercel
- Live webhook route exists at `/api/billing/webhook`
- Secrets remain in `.env.local` only (not committed)

## Production check (after `24997ca` deploy)

| Surface | Result |
| --- | --- |
| `/` homepage title/copy | Unchanged, public |
| `/pricing` | Live, Free / Basic $9.70 / Premium $16 |
| `/robots.txt` | Public allow kept; extra disallows only for account/auth |
| `/api/billing/webhook` | Live (rejects invalid JSON) |
| `/api/generate-lyrics` | 500 until hotfix is deployed (DB mkdir on Vercel) |
| Hosted `DATABASE_URL` | Not set |
| `PAYPAL_MODE=live` on Vercel | Not set |

Local hotfix `ea776c4` writes SQLite to `/tmp` on Vercel and fail-opens public generation if DB is down.

## Remaining

1. Complete Vercel CLI device authorize so production env can be written
2. Push `ea776c4` (or `vercel --prod`) to restore public generators
3. Hosted libSQL + live PayPal env
4. Email provider
