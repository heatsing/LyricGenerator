# SaaS Master Plan

Status: in progress. This is the single source of truth for finishing LyricGenerator as a paid product.

## Product

Public website: https://lyricgenerator.cc  
Repo: https://github.com/heatsing/LyricGenerator  
Local workspace: `C:\Users\heats\Desktop\LyricGenerator-main`

The site already ranks and has real traffic. SaaS is an additive layer. Public SEO pages stay public.

## Locked decisions

| Area | Decision | Why |
| --- | --- | --- |
| Framework | Keep Next.js 16 App Router | Already in production, SEO depends on it |
| Auth | Extend NextAuth v4 | Already integrated (Google + JWT). Do not add Clerk/Better Auth |
| Database | Drizzle + SQLite locally / Neon Postgres in production | Local file DB; Vercel Neon for durable auth/billing |
| Email | Nodemailer SMTP or Resend; console fallback | `nodemailer` is already a dependency |
| Payments | PayPal Subscriptions | Owner requirement |
| Plans | Free / Pro Monthly $9 / Pro Yearly $69 | Simple SaaS, low support cost |
| Session | NextAuth JWT cookie, 30 days | Already configured, serverless-safe |
| Entitlements | Server-side only | Frontend hiding is not access control |

## What already exists

- Public lyric, poem, story generators
- Ranked landing pages, genre pages, generator pages
- Sitemap, robots, JSON-LD, Umami, GA
- NextAuth Google OAuth + `/login` UI
- Google One Tap (incomplete, does not persist a real user)
- Header login/logout for Google sessions
- Fake email/password form on `/login` (no Credentials provider, no user table)
- Fake lyrics-to-song API (sample MP3)

## What was missing (audit)

- No git repo in the local folder (now initialized, GitHub fetch blocked by network)
- No database, no user model, no password hashes
- No register / forgot / reset / verify
- No entitlements, no plan, no subscription table
- No PayPal, no webhook
- Generate APIs are open, unauthenticated, no durable rate limit
- Hardcoded DeepSeek API key fallback in generate routes
- `next.config.mjs` ignores TypeScript build errors
- No middleware, no tests, no lint config
- Login page Terms/Privacy point to `#`

## Incremental URL policy

Do not change existing public URLs.

Allowed new URLs:

- `/pricing`
- `/account`
- `/account/billing`
- `/forgot-password`
- `/reset-password`
- `/verify-email`
- `/api/auth/register`
- `/api/auth/forgot-password`
- `/api/auth/reset-password`
- `/api/auth/verify-email`
- `/api/account/me`
- `/api/account/generations`
- `/api/billing/*`

`/login` stays `/login`.

## Entitlement model

| Plan | Price | Generations / day | History | Lyrics-to-song | Commercial |
| --- | --- | --- | --- | --- | --- |
| Anonymous | $0 | 30 (abuse cap, not a hard paywall for normal use) | No | No | Personal |
| Free account | $0 | 50 | Last 20 | No | Personal |
| Pro Monthly | $9 / month | Unlimited | Unlimited | Yes | Yes |
| Pro Yearly | $69 / year | Unlimited | Unlimited | Yes | Yes |

Subscription lifecycle stored in DB and enforced on the server:

`free` → `active` → `past_due` / `suspended` / `canceled` → `expired`

Canceled Pro keeps access until `currentPeriodEnd`.

Public pages and the core generators remain crawlable and usable. Paid access is extra quota + Pro features.

## PayPal

Source of truth = PayPal webhook + PayPal API, never the return URL.

Handled events:

- `BILLING.SUBSCRIPTION.ACTIVATED`
- `BILLING.SUBSCRIPTION.CANCELLED`
- `BILLING.SUBSCRIPTION.SUSPENDED`
- `BILLING.SUBSCRIPTION.EXPIRED`
- `BILLING.SUBSCRIPTION.UPDATED`
- `BILLING.SUBSCRIPTION.PAYMENT.FAILED`
- `PAYMENT.SALE.COMPLETED`
- `PAYMENT.SALE.DENIED`

Guarantees:

- webhook signature verification
- idempotency on PayPal event id
- subscription and user entitlement written in one flow
- secrets only in env vars

## Security

- bcrypt password hashes
- hashed email-verify and reset tokens
- JWT httpOnly cookies via NextAuth
- billing APIs require a session
- webhook route is public but signature-verified
- generate APIs rate-limited
- robots keeps `/api/` and `/login` disallowed; account routes also disallowed
- no secrets in git

## Test matrix (must pass)

Guest → register → login → free → pricing → PayPal sandbox → webhook → paid → refresh → logout → login still paid → cancel → webhook → access follows period rules.

Also: duplicate webhook, double checkout click, closed browser after pay, delayed webhook, PayPal timeout, DB failure, unpaid user hitting paid API, expired session, malicious API calls.

## Production blockers the owner may still need to unblock

These cannot be completed by code alone:

1. PayPal Business login to create/confirm the app, webhook, and live credentials — done
2. Hosted Neon Postgres `DATABASE_URL` on Vercel so auth/billing persist — done
3. SMTP or Resend so verify/reset emails leave the server
4. Google OAuth client secret (optional; email/password login already works)

Until those exist, local/sandbox code and tests must still be complete.

## Definition of Done

- Existing SEO pages unchanged and public
- Register, login, logout, forgot/reset, session, profile
- Free and Paid entitlements enforced server-side
- PayPal sandbox subscription + webhook + cancel
- Production env contract documented and wired
- lint / typecheck / tests / build pass
- `docs/SAAS_LAUNCH_REPORT.md` written honestly
