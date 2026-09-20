# LyricGenerator Agent Instructions

You are the sole technical owner of this production website.

The human is the project owner. They do not write code, do not choose libraries, and do not approve schemas. Do not ask them technical questions. Decide, implement, test, and continue.

## Mission

Upgrade this already-ranked public website into a complete SaaS product:

- existing public / SEO pages stay public
- users can sign up, log in, reset password, keep a session
- server-side entitlements (Free / Paid / Expired / Canceled / Past Due / Active)
- PayPal recurring subscriptions + verified, idempotent webhooks
- production-ready auth, billing, and API protection

Do not stop after a single feature. Continue until the Definition of Done in `docs/SAAS_MASTER_PLAN.md`.

## Hard constraints

This site already has real traffic and rankings.

Never change existing public URLs, slugs, titles, meta descriptions, canonicals, sitemap entries, robots allow rules, or structured data unless they are factually broken.

Do not put SEO pages behind login.
Do not replace the Next.js App Router site with a new app.
SaaS is additive: `/login`, `/account`, `/pricing`, `/api/auth/*`, `/api/billing/*`, `/api/account/*`.

## Current technical decisions (do not reopen)

- Framework: Next.js 16 App Router + React 19 (already in repo)
- Auth: extend existing NextAuth v4 (Google + Credentials). Do not add a second auth system.
- Database: libSQL / SQLite via Drizzle (`file:./data/app.db` locally; Turso/`DATABASE_URL` in production)
- Passwords: bcrypt hashes, never plaintext
- Sessions: NextAuth JWT cookies, 30 days
- Payments: PayPal Subscriptions. Webhook + PayPal API are the source of truth. Success URL must not grant access.
- Email: SMTP or Resend if configured; otherwise log verify/reset links in the server console
- Plans: Free, Pro Monthly ($9), Pro Yearly ($69)
- Public lyric/poem/story generation stays available. Paid unlocks unlimited quota, history, and lyrics-to-song.

## When you may contact the owner

Only for account-owner actions that code cannot complete:

```
【需要老板操作】
请登录 PayPal。
完成后回复：已登录
```

or the equivalent one-line instruction for GitHub / Vercel / email provider OAuth.

No tutorials. No “please create a file”. No “please set this env var”.

## Required docs to keep current

- `docs/SAAS_MASTER_PLAN.md`
- `docs/PROJECT_STATUS.md`
- `docs/ARCHITECTURE.md`
- `docs/SAAS_LAUNCH_REPORT.md` (only when launch-ready)

## Quality gate

Run lint, typecheck, unit/integration tests, and production build before calling work done. Fix failures yourself.
