# SaaS Launch Report

Date: 2026-09-20  
Site: https://lyricgenerator.cc  
Repo: https://github.com/heatsing/LyricGenerator

## 1. Can this SaaS operate in production today?

**Billing/auth code is live. Public SEO pages are intact.** Paid checkout env is on Vercel (`PAYPAL_MODE=live`). Durable database is still ephemeral `/tmp` SQLite on Vercel. Public lyric API cannot call DeepSeek because that key returns insufficient balance.

## 2. Login

`/login` is live. `/api/account/me` returns 401 when signed out (route is healthy). Google client id is set; Google client secret was not present in the project.

## 3. Payments

Live and sandbox PayPal credentials, webhook id `5GR70029125121704`, and GSong plan ids are on Vercel production. Return URL does not grant access.

| Plan | Price | PayPal plan id |
| --- | --- | --- |
| Basic monthly | $9.70 | `P-7SK23358BU6089700NKXLOQY` |
| Basic yearly | $58.20 | `P-6P497186U7451625PNKXLORA` |
| Premium monthly | $16.00 | `P-4U428262JP4647148NKXLORA` |
| Premium yearly | $96.00 | `P-1N575623B09131146NKXLORI` |

## 4. SEO

Homepage title remains `Free AI Lyrics Generator | Create Song Lyrics Online`. Ranked routes `/`, `/poem-generator`, `/genre/pop` return 200. `/pricing` is additive.

## 5. Environment

Set on Vercel production/preview/development. Nothing secret was committed.

## 6. Remaining owner-only blocker

DeepSeek API balance is empty. Public generate cannot succeed until that account is funded.
