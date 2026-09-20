# Project Status

Last updated: 2026-09-20

## Now

Neon Postgres is provisioned and linked on Vercel. Users, subscriptions, and related tables are migrated. Production uses `DATABASE_URL` / Neon instead of ephemeral `/tmp` SQLite. Public generate, homepage, pricing, and login stay public.

## Done

- GitHub `main` has SaaS + generator hotfix + webhook harden + Neon Postgres adapter
- Vercel production env: PayPal live+sandbox, NEXTAUTH, OPENAI_API_KEY, Neon `DATABASE_URL`
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
- Neon schema migrated: `users`, `subscriptions`, `payments`, `webhook_events`, `auth_tokens`, `usage_events`, `generations`

## Remaining

1. Google OAuth client secret was never in the repo
2. Email provider

## Test results (local)

```
pnpm test        9/9 passed
```
