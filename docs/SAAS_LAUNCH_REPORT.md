# SaaS Launch Report

Date: 2026-09-20  
Site: https://lyricgenerator.cc  
Repo: https://github.com/heatsing/LyricGenerator

## 1. Can this SaaS operate in production today?

**Yes for public site, generate APIs, auth, and durable user/subscription data.** Neon Postgres is attached on Vercel. Auth/billing rows persist across deploys. PayPal live credentials are on Vercel (`PAYPAL_MODE=live`). Google sign-in still lacks a client secret. Verify/reset emails log to the server unless SMTP/Resend is added.

## 2. Login

`/login` is public. Email register writes to Neon (`POST /api/auth/register`). Duplicate email returns 409. Session-protected billing returns 401 until sign-in. Google client id is set; Google client secret is still missing.

## 3. Payments

Live + sandbox PayPal env is on Vercel. Unsigned webhook calls return 401. Create-subscription requires a session. Subscription rows live in Neon `subscriptions`.

## 4. Generate (after DeepSeek recharge)

| API | Result |
| --- | --- |
| `/api/generate-lyrics` | 200, lyrics payload |
| `/api/generate-poem` | 200 |
| `/api/generate-story` | 200 |

## 5. SEO

Homepage title remains `Free AI Lyrics Generator | Create Song Lyrics Online`. `/`, `/poem-generator`, `/story-generator`, `/genre/pop` are 200 without login. `robots.txt` allows `/`.

## 6. Database

Neon (Vercel Marketplace) is the production database. `DATABASE_URL` / `POSTGRES_URL_NON_POOLING` are set on the Vercel project (not in git). Local development still uses SQLite `file:./data/app.db`. Schema includes `users`, `subscriptions`, `payments`, `webhook_events`, `auth_tokens`, `usage_events`, `generations`. Ephemeral `/tmp` SQLite is no longer the production store.

## 7. Remaining owner-only step

None for database. Optional later: add a Google OAuth client secret, and an email provider for verify/reset mail.
