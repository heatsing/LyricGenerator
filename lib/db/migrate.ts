import { execSql, isPostgresUrl } from "./index"

const SQLITE_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    image TEXT,
    password_hash TEXT,
    email_verified_at INTEGER,
    account_status TEXT NOT NULL DEFAULT 'active',
    plan TEXT NOT NULL DEFAULT 'free',
    entitlement_status TEXT NOT NULL DEFAULT 'free',
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON users(email)`,
  `CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    paypal_subscription_id TEXT NOT NULL,
    paypal_payer_id TEXT,
    paypal_plan_id TEXT,
    plan_id TEXT NOT NULL,
    status TEXT NOT NULL,
    approval_url TEXT,
    current_period_start INTEGER,
    current_period_end INTEGER,
    cancel_at_period_end INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_paypal_id_idx ON subscriptions(paypal_subscription_id)`,
  `CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions(user_id)`,
  `CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    subscription_id TEXT,
    paypal_sale_id TEXT,
    amount TEXT,
    currency TEXT,
    status TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS payments_sale_idx ON payments(paypal_sale_id)`,
  `CREATE TABLE IF NOT EXISTS webhook_events (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    processed_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS auth_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    used_at INTEGER,
    created_at INTEGER NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS auth_tokens_hash_idx ON auth_tokens(token_hash)`,
  `CREATE TABLE IF NOT EXISTS usage_events (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    ip_hash TEXT,
    action TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS usage_user_created_idx ON usage_events(user_id, created_at)`,
  `CREATE INDEX IF NOT EXISTS usage_ip_created_idx ON usage_events(ip_hash, created_at)`,
  `CREATE TABLE IF NOT EXISTS generations (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    input_json TEXT,
    output TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS generations_user_created_idx ON generations(user_id, created_at)`,
]

const POSTGRES_STATEMENTS = SQLITE_STATEMENTS.map((sql) =>
  sql
    .replaceAll("INTEGER NOT NULL DEFAULT 0", "INTEGER NOT NULL DEFAULT 0")
    .replaceAll("email_verified_at INTEGER", "email_verified_at BIGINT")
    .replaceAll("current_period_start INTEGER", "current_period_start BIGINT")
    .replaceAll("current_period_end INTEGER", "current_period_end BIGINT")
    .replaceAll("processed_at INTEGER", "processed_at BIGINT")
    .replaceAll("expires_at INTEGER", "expires_at BIGINT")
    .replaceAll("used_at INTEGER", "used_at BIGINT")
    .replaceAll("created_at INTEGER", "created_at BIGINT")
    .replaceAll("updated_at INTEGER", "updated_at BIGINT"),
)

export async function migrate() {
  const statements = isPostgresUrl() ? POSTGRES_STATEMENTS : SQLITE_STATEMENTS
  for (const [index, sql] of statements.entries()) {
    try {
      await execSql(sql)
    } catch (error) {
      const preview = sql.replace(/\s+/g, " ").slice(0, 80)
      console.error(`migrate statement ${index} failed: ${preview}`)
      throw error
    }
  }
}

if (process.argv[1] && process.argv[1].includes("migrate")) {
  migrate()
    .then(() => {
      console.log("Database migrated")
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
