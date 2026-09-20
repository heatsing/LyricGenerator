# SaaS Launch Report

Date: 2026-09-20  
Site: https://lyricgenerator.cc  
Repo: https://github.com/heatsing/LyricGenerator

## 1. Can this SaaS operate in production today?

**Partially.** The SaaS UI and billing routes are deployed on the existing ranked site. Public homepage SEO is intact. Paid checkout cannot go live until Vercel has `PAYPAL_MODE=live` and a hosted database. Public lyric generation currently 500s on the first SaaS deploy; a hotfix is committed locally.

## 2. Login

**Code deployed. Production DB is not durable.** `/login` is live. Account APIs 500 without hosted libSQL.

## 3. Payments

Live PayPal plans exist in `.env.local`. They are not on Vercel yet. Local `PAYPAL_MODE` stays sandbox.

| Plan | Price | PayPal plan id |
| --- | --- | --- |
| Basic monthly | $9.70 | `P-7SK23358BU6089700NKXLOQY` |
| Basic yearly | $58.20 | `P-6P497186U7451625PNKXLORA` |
| Premium monthly | $16.00 | `P-4U428262JP4647148NKXLORA` |
| Premium yearly | $96.00 | `P-1N575623B09131146NKXLORI` |

Webhook: `https://lyricgenerator.cc/api/billing/webhook` (id `5GR70029125121704`). Return URL does not grant access.

## 4. Git / deploy

- Pushed: `24997ca` feat SaaS on `main` (Vercel production success)
- Local unpushed: `ea776c4` generator hotfix (`file:/tmp` on Vercel + fail-open)
- GitHub:443 from this machine later timed out; Vercel CLI device login was opened

## 5. SEO

Existing public URLs, titles, and homepage copy were not replaced. `/pricing` was added. robots still allow `/`.

## 6. Plans

| Plan | Price | Quota | Lyrics-to-song | Commercial |
| --- | --- | --- | --- | --- |
| Free | $0 | 10/day | No | No |
| Basic monthly | $9.70 | 40/day | Yes | No |
| Basic yearly | $58.20 | 40/day | Yes | Yes |
| Premium monthly | $16 | 120/day, 3 devices | Yes | No |
| Premium yearly | $96 | 120/day, 3 devices | Yes | Yes |

## 7. Next (no extra owner questions except the open OAuth window)

Set Vercel production env and hosted DB as soon as the CLI session exists, then deploy the generator hotfix.
