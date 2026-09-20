# Architecture

## Runtime

```
Browser (public SEO + generators)
    │
    ├─ Next.js App Router pages (SSR/SSG, unchanged public URLs)
    ├─ NextAuth session cookie (JWT, 30d)
    └─ Fetch /api/*

Next.js Route Handlers
    ├─ /api/generate-*     public + daily quota
    ├─ /api/lyrics-to-song Pro entitlement
    ├─ /api/auth/*         NextAuth + register/reset/verify
    ├─ /api/account/*      session required
    └─ /api/billing/*      session required except webhook

Drizzle
    └─ SQLite / libSQL locally (`file:./data/app.db`)
       Neon Postgres in production (`DATABASE_URL` / `POSTGRES_URL_NON_POOLING`)

PayPal Subscriptions API
    └─ /api/billing/webhook  (signature + idempotency)
```

## Why this stack

- The production site is already Next.js 16. Replacing it would risk SEO.
- NextAuth v4 is already in the tree. Extending it avoids a second login system.
- SQLite/libSQL locally so the product runs without a cloud database. Production uses Neon Postgres via the Vercel integration.
- PayPal Subscriptions match a recurring SaaS. Webhooks are the only trusted payment signal.

## Data model

### users

`id`, `email` (unique), `name`, `image`, `passwordHash`, `emailVerifiedAt`, `accountStatus` (`active` \| `disabled`), `plan` (`free` \| `pro_monthly` \| `pro_yearly`), `entitlementStatus` (`free` \| `active` \| `past_due` \| `canceled` \| `expired` \| `suspended`), `createdAt`, `updatedAt`.

### subscriptions

`id`, `userId`, `paypalSubscriptionId` (unique), `paypalPayerId`, `paypalPlanId`, `planId`, `status`, `approvalUrl`, `currentPeriodStart`, `currentPeriodEnd`, `cancelAtPeriodEnd`, `createdAt`, `updatedAt`.

### payments

`id`, `userId`, `subscriptionId`, `paypalSaleId`, `amount`, `currency`, `status`, `createdAt`.

### webhook_events

`id` = PayPal event id (unique). Duplicate deliveries are ignored.

### auth_tokens

Hashed `email_verify` and `password_reset` tokens with expiry.

### usage_events / generations

Daily quota accounting and saved outputs for signed-in users.

## Auth flow

1. Google: existing provider. JWT callback upserts a `users` row by email.
2. Credentials: `/api/auth/register` hashes the password, then `signIn("credentials")`.
3. Forgot password writes a SHA-256 hashed token; reset consumes it.
4. Email verification is recorded but does not block login or public generation.
5. `/account` is the only page family gated by middleware (cookie presence). Real entitlement checks happen in Node route handlers.

## Billing flow

1. Logged-in user POSTs `/api/billing/create-subscription`.
2. Server creates a PayPal subscription with `custom_id = userId`.
3. Browser redirects to PayPal approval URL.
4. PayPal webhook `BILLING.SUBSCRIPTION.ACTIVATED` marks the user Active/Pro.
5. Return URL only shows status; it never flips paid itself.
6. Cancel calls PayPal, then webhook `CANCELLED` sets `canceled` and keeps Pro until period end.

## SEO boundary

Middleware matcher is only `/account/:path*`.

Public routes, sitemap, robots allow list, titles, and canonicals stay as they are. New private routes are `noindex`. `/pricing` may be indexed as a new page.
