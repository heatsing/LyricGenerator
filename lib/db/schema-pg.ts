import { bigint, index, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core"

const ts = (name: string) => bigint(name, { mode: "number" })

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name"),
    image: text("image"),
    passwordHash: text("password_hash"),
    emailVerifiedAt: ts("email_verified_at"),
    accountStatus: text("account_status").notNull().default("active"),
    plan: text("plan").notNull().default("free"),
    entitlementStatus: text("entitlement_status").notNull().default("free"),
    createdAt: ts("created_at").notNull(),
    updatedAt: ts("updated_at").notNull(),
  },
  (table) => [uniqueIndex("users_email_idx").on(table.email)],
)

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    paypalSubscriptionId: text("paypal_subscription_id").notNull(),
    paypalPayerId: text("paypal_payer_id"),
    paypalPlanId: text("paypal_plan_id"),
    planId: text("plan_id").notNull(),
    status: text("status").notNull(),
    approvalUrl: text("approval_url"),
    currentPeriodStart: ts("current_period_start"),
    currentPeriodEnd: ts("current_period_end"),
    cancelAtPeriodEnd: integer("cancel_at_period_end").notNull().default(0),
    createdAt: ts("created_at").notNull(),
    updatedAt: ts("updated_at").notNull(),
  },
  (table) => [
    uniqueIndex("subscriptions_paypal_id_idx").on(table.paypalSubscriptionId),
    index("subscriptions_user_id_idx").on(table.userId),
  ],
)

export const payments = pgTable(
  "payments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    subscriptionId: text("subscription_id"),
    paypalSaleId: text("paypal_sale_id"),
    amount: text("amount"),
    currency: text("currency"),
    status: text("status").notNull(),
    createdAt: ts("created_at").notNull(),
  },
  (table) => [index("payments_sale_idx").on(table.paypalSaleId)],
)

export const webhookEvents = pgTable("webhook_events", {
  id: text("id").primaryKey(),
  eventType: text("event_type").notNull(),
  payloadJson: text("payload_json").notNull(),
  processedAt: ts("processed_at").notNull(),
})

export const authTokens = pgTable(
  "auth_tokens",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    type: text("type").notNull(),
    tokenHash: text("token_hash").notNull(),
    expiresAt: ts("expires_at").notNull(),
    usedAt: ts("used_at"),
    createdAt: ts("created_at").notNull(),
  },
  (table) => [uniqueIndex("auth_tokens_hash_idx").on(table.tokenHash)],
)

export const usageEvents = pgTable(
  "usage_events",
  {
    id: text("id").primaryKey(),
    userId: text("user_id"),
    ipHash: text("ip_hash"),
    action: text("action").notNull(),
    createdAt: ts("created_at").notNull(),
  },
  (table) => [
    index("usage_user_created_idx").on(table.userId, table.createdAt),
    index("usage_ip_created_idx").on(table.ipHash, table.createdAt),
  ],
)

export const generations = pgTable(
  "generations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    type: text("type").notNull(),
    inputJson: text("input_json"),
    output: text("output").notNull(),
    createdAt: ts("created_at").notNull(),
  },
  (table) => [index("generations_user_created_idx").on(table.userId, table.createdAt)],
)
