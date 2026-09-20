# Project Status

Last updated: 2026-09-20

## Now

SaaS layer is being merged onto GitHub `main` (production branch) without replacing ranked SEO pages. Local PayPal sandbox + live credentials stay in `.env.local`. Production still needs hosted DB and Vercel live env.

## Done

- Full repository audit
- Local workspace connected to https://github.com/heatsing/LyricGenerator (`origin/main`)
- Agent instructions: `AGENTS.md`, `.cursor/rules/saas-owner.mdc`
- Docs: `SAAS_MASTER_PLAN.md`, `ARCHITECTURE.md`, `SAAS_LAUNCH_REPORT.md`
- Drizzle + libSQL schema and auto-migrate
- NextAuth v4 extended with Credentials (Google kept)
- Register, login, logout, forgot/reset, email verification
- Account + billing + pricing UI (`/pricing` added; existing slugs unchanged)
- GSong-aligned entitlements (Free / Basic / Premium, yearly commercial rights)
- Daily generation quota; lyrics-to-song requires a paid plan
- PayPal subscription create/cancel/status + verified idempotent webhook
- Hardcoded DeepSeek key fallback removed from generate routes
- Sandbox token, 4 plans, webhook `1JE460846T859983K`
- Live token OK for app “Lyrics Generator”
- Live product `PROD-6MR33779FT603081T`
- Live Basic monthly `P-7SK23358BU6089700NKXLOQY` ($9.70)
- Live Basic yearly `P-6P497186U7451625PNKXLORA` ($58.20)
- Live Premium monthly `P-4U428262JP4647148NKXLORA` ($16)
- Live Premium yearly `P-1N575623B09131146NKXLORI` ($96)
- Live webhook `5GR70029125121704` → `https://lyricgenerator.cc/api/billing/webhook`
- Secrets only in `.env.local` (gitignored)

## Test results

```
pnpm test        9/9 passed (local SaaS branch)
pnpm typecheck   passed
pnpm lint        passed (pre-existing warnings only)
pnpm build       passed, existing SEO routes unchanged
```

## Remaining / production blockers

1. Hosted `DATABASE_URL` (Turso/libSQL) so auth/billing persist on Vercel
2. SMTP or Resend
3. Vercel production env: `PAYPAL_MODE=live`, live PayPal vars, `NEXTAUTH_SECRET`, `DATABASE_URL`
4. Production deploy of this SaaS commit after push

## Known leftover issues (non-blocking)

- Next.js 16 warns that `middleware` is deprecated in favor of `proxy`
- Google One Tap still does not create a NextAuth session
- Lyrics-to-song remains a sample-audio stub, now paid-gated
