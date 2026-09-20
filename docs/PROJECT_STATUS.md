# Project Status

Last updated: 2026-09-20

## Now

Public generate is healthy after DeepSeek recharge. Homepage/pricing/login stay public. Auth register and billing-without-session behave correctly. Durable hosted DB is blocked on Neon marketplace terms in the Vercel dashboard; production still uses ephemeral `/tmp` SQLite until that is accepted.

## Done

- GitHub `main` has SaaS + generator hotfix + webhook harden
- Vercel production env: PayPal live+sandbox, NEXTAUTH, OPENAI_API_KEY
- `PAYPAL_MODE=live` on Vercel
- Existing SEO homepage title/copy unchanged
- Public generate APIs after recharge:
  - `/api/generate-lyrics` 200
  - `/api/generate-poem` 200
  - `/api/generate-story` 200
- `/`, `/pricing`, `/login`, `/poem-generator`, `/story-generator`, `/genre/pop` 200
- `robots.txt` allows `/`; auth/account/api disallowed
- `/api/auth/register` 200; `/api/billing/create-subscription` 401 without session
- `/api/account/me` 401 unsigned (healthy)

## Remaining

1. Accept Neon terms in Vercel so a durable Postgres can replace `/tmp` SQLite
2. Google OAuth client secret was never in the repo
3. Email provider

## Test results (local)

```
pnpm test        9/9 passed
```
