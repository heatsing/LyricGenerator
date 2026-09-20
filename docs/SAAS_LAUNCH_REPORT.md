# SaaS Launch Report

Date: 2026-09-20  
Site: https://lyricgenerator.cc  
Repo: https://github.com/heatsing/LyricGenerator

## 1. Can this SaaS operate in production today?

**Code is ready to deploy on top of the existing ranked site.** Public SEO URLs stay public. Paid live checkout still needs Vercel `PAYPAL_MODE=live`, hosted database, and this commit on `main`.

## 2. Login

**Code: yes. Production: needs env + hosted DB.**

Working locally: sign up, login, logout, 30-day session, forgot/reset, email verification link, `/account`. Google OAuth on `/login` is unchanged.

## 3. Payments

**Sandbox: ready locally. Live: plans created; production must use `PAYPAL_MODE=live`.**

- Return URL does not grant access
- Webhook + PayPal API are the source of truth
- Local default stays sandbox so development does not charge real money
- Live app name: Lyrics Generator

Live plans:

| Plan | Price | PayPal plan id |
| --- | --- | --- |
| Basic monthly | $9.70 | `P-7SK23358BU6089700NKXLOQY` |
| Basic yearly | $58.20 | `P-6P497186U7451625PNKXLORA` |
| Premium monthly | $16.00 | `P-4U428262JP4647148NKXLORA` |
| Premium yearly | $96.00 | `P-1N575623B09131146NKXLORI` |

Secrets stay in `.env.local` only. They are never committed.

## 4. Webhooks

`POST https://lyricgenerator.cc/api/billing/webhook`

- Sandbox webhook id: `1JE460846T859983K`
- Live webhook id: `5GR70029125121704`
- Signature verification + idempotency implemented
- Production deploy must include `/api/billing/webhook` before live events succeed

## 5. Production environment

| Check | Result |
| --- | --- |
| Existing SEO routes | Unchanged and public |
| GitHub remote | `origin` → https://github.com/heatsing/LyricGenerator (`main`) |
| PayPal sandbox | Done |
| PayPal live token/plans/webhook | Done in `.env.local` |
| Hosted DB | In progress |
| Email delivery | Missing (dev logs the link) |
| Vercel env / deploy of SaaS routes | In progress after push |

## 6. Plans

| Plan | Price | Quota | Lyrics-to-song | Commercial |
| --- | --- | --- | --- | --- |
| Free | $0 | 10/day | No | No |
| Basic monthly | $9.70 | 40/day | Yes | No |
| Basic yearly | $58.20 | 40/day | Yes | Yes |
| Premium monthly | $16 | 120/day, 3 devices | Yes | No |
| Premium yearly | $96 | 120/day, 3 devices | Yes | Yes |

Modeled after https://www.gsong.ai/pricing/ (annual commercial rights, Premium ≈ 3× Basic).

## 7. What paid users get

Server-enforced: higher daily quota, lyrics-to-song, saved history. Commercial flag only on yearly plans.

## 8. Blockers being handled without owner input

1. Push SaaS commit to `main` (GitHub git credentials already work)
2. Create hosted libSQL/Turso and set Vercel production env
3. Confirm lyricgenerator.cc deploy
