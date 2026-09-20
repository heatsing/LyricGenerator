import { readFileSync } from "node:fs"
import { migrate } from "../lib/db/migrate"

const text = readFileSync(new URL("../.env.neon.local", import.meta.url), "utf8")
for (const line of text.split(/\r?\n/)) {
  if (!line || line.startsWith("#") || !line.includes("=")) continue
  const idx = line.indexOf("=")
  const key = line.slice(0, idx).trim()
  let value = line.slice(idx + 1).trim()
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  }
  process.env[key] = value
}

async function main() {
  const url =
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.DATABASE_URL ||
    ""
  process.env.DATABASE_URL = url
  if (!url.startsWith("postgres")) {
    throw new Error("DATABASE_URL is not postgres")
  }
  await migrate()
  const { neon } = await import("@neondatabase/serverless")
  const sql = neon(url)
  const tables = await sql.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name",
  )
  const users = await sql.query("SELECT COUNT(*)::int AS n FROM users")
  const subscriptions = await sql.query("SELECT COUNT(*)::int AS n FROM subscriptions")
  const tableNames = tables
    .map((row) => String(row.table_name ?? ""))
    .filter(Boolean)
    .join(",")
  console.log(
    "migrate=ok tables=" +
      tableNames +
      " users=" +
      users[0].n +
      " subscriptions=" +
      subscriptions[0].n,
  )
}

void main()
