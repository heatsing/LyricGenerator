# SaaS Launch Report

Date: 2026-09-20  
Site: https://lyricgenerator.cc  
Repo: https://github.com/heatsing/LyricGenerator

## 1. Can this SaaS operate in production today?

**Public site and generate APIs: yes.** Auth/billing code is live. User and subscription rows will not survive Vercel deploys until a hosted database is attached. PayPal live credentials are on Vercel (`PAYPAL_MODE=live`).

## 2. Login

`/login` is public. Email register succeeds (`POST /api/auth/register` 200). Session-protected billing returns 401 until sign-in. Google client id is set; Google client secret is still missing.

## 3. Payments

Live + sandbox PayPal env is on Vercel. Unsigned webhook calls return 401. Create-subscription requires a session.

## 4. Generate (after DeepSeek recharge)

| API | Result |
| --- | --- |
| `/api/generate-lyrics` | 200, lyrics payload |
| `/api/generate-poem` | 200 |
| `/api/generate-story` | 200 |

## 5. SEO

Homepage title remains `Free AI Lyrics Generator | Create Song Lyrics Online`. `/`, `/poem-generator`, `/story-generator`, `/genre/pop` are 200 without login. `robots.txt` allows `/`.

## 6. Database

No durable `DATABASE_URL` yet. Vercel Neon install is waiting on marketplace terms. Turso CLI is not usable on this Windows/WSL setup. Until Neon is accepted, SQLite lives in `/tmp` and resets across instances.

## 7. Remaining owner-only step

Accept Neon terms in the already-opened Vercel window so a hosted database can be provisioned.
