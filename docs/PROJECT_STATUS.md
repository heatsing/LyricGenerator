# Project Status

Last updated: 2026-09-20

## Now

SaaS is live on https://lyricgenerator.cc. Production env (PayPal live+sandbox, NEXTAUTH, OPENAI_API_KEY) is on Vercel. Public pages and `/pricing` are up. `/api/account/me` returns 401 (auth alive). Public generate is blocked by DeepSeek `402 Insufficient Balance`, not by SQLite. Hosted Turso is still missing; Vercel uses `/tmp` SQLite as a temporary fallback.

## Done

- GitHub `main` includes SaaS + generator hotfix (`c1d943d`)
- Vercel production deploy aliased to lyricgenerator.cc
- Production env set via API (secrets not committed)
- Live PayPal plan ids and webhook id on Vercel with `PAYPAL_MODE=live`
- Sandbox PayPal ids kept on Vercel too
- Existing SEO homepage title/copy unchanged
- `/login`, `/pricing`, `/poem-generator`, `/genre/pop` return 200

## Remaining

1. DeepSeek account has no balance (public generate 503/500 until topped up)
2. Durable hosted libSQL/Turso (Windows Turso CLI needs WSL; marketplace slug not available)
3. Google OAuth secret was never in the repo, so Google login may still be incomplete
4. Email provider

## Test results (local)

```
pnpm test        9/9 passed
```
