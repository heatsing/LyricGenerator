import { integer, sqliteTable, text, uniqueIndex, index } from "drizzle-orm/sqlite-core"

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name"),
    image: text("image"),
    passwordHash: text("password_hash"),
    emailVerifiedAt: integer("email_verified_at"),
    accountStatus: text("account_status").notNull().default("active"),
    plan: text("plan").notNull().default("free"),
    entitlementStatus: text("entitlement_status").notNull().default("free"),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => [uniqueIndex("users_email_idx").on(table.email)],
)

export const subscriptions = sqliteTable(
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
    currentPeriodStart: integer("current_period_start"),
    currentPeriodEnd: integer("current_period_end"),
    cancelAtPeriodEnd: integer("cancel_at_period_end").notNull().default(0),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => [
    uniqueIndex("subscriptions_paypal_id_idx").on(table.paypalSubscriptionId),
    index("subscriptions_user_id_idx").on(table.userId),
  ],
)

export const payments = sqliteTable(
  "payments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    subscriptionId: text("subscription_id"),
    paypalSaleId: text("paypal_sale_id"),
    amount: text("amount"),
    currency: text("currency"),
    status: text("status").notNull(),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [index("payments_sale_idx").on(table.paypalSaleId)],
)

export const webhookEvents = sqliteTable("webhook_events", {
  id: text("id").primaryKey(),
  eventType: text("event_type").notNull(),
  payloadJson: text("payload_json").notNull(),
  processedAt: integer("processed_at").notNull(),
})

export const authTokens = sqliteTable(
  "auth_tokens",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    type: text("type").notNull(),
    tokenHash: text("token_hash").notNull(),
    expiresAt: integer("expires_at").notNull(),
    usedAt: integer("used_at"),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [uniqueIndex("auth_tokens_hash_idx").on(table.tokenHash)],
)

export const usageEvents = sqliteTable(
  "usage_events",
  {
    id: text("id").primaryKey(),
    userId: text("user_id"),
    ipHash: text("ip_hash"),
    action: text("action").notNull(),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [
    index("usage_user_created_idx").on(table.userId, table.createdAt),
    index("usage_ip_created_idx").on(table.ipHash, table.createdAt),
  ],
)

export const generations = sqliteTable(
  "generations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    type: text("type").notNull(),
    inputJson: text("input_json"),
    output: text("output").notNull(),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [index("generations_user_created_idx").on(table.userId, table.createdAt)],
)
