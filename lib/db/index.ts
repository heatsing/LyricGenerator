import { createClient, type Client } from "@libsql/client"
import { drizzle as drizzleSqlite } from "drizzle-orm/libsql"
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http"
import { neon, type NeonQueryFunction } from "@neondatabase/serverless"
import { mkdirSync } from "node:fs"
import { dirname } from "node:path"
import * as sqliteSchema from "./schema"
import * as pgSchema from "./schema-pg"
import { getDatabaseUrl, isPostgresUrl } from "./url"

export { getDatabaseUrl, isPostgresUrl }

let cached: {
  url: string
  db: any
  sqliteClient?: Client
  neonSql?: NeonQueryFunction<false, false>
} | null = null
let migratedUrl: string | null = null

function ensureLocalDir(url: string) {
  if (!url.startsWith("file:")) return
  const filePath = url.slice("file:".length)
  const dir = dirname(filePath)
  if (dir && dir !== ".") mkdirSync(dir, { recursive: true })
}

function getConnection() {
  const url = getDatabaseUrl()
  if (cached && cached.url === url) return cached

  if (isPostgresUrl(url)) {
    const neonSql = neon(url)
    const db = drizzleNeon(neonSql, { schema: pgSchema })
    cached = { url, db, neonSql }
    return cached
  }

  ensureLocalDir(url)
  const sqliteClient = createClient({
    url,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  })
  const db = drizzleSqlite(sqliteClient, { schema: sqliteSchema })
  cached = { url, db, sqliteClient }
  return cached
}

export function getTables() {
  return isPostgresUrl() ? pgSchema : sqliteSchema
}

export function getDb(): any {
  return getConnection().db
}

export function getClient(): Client {
  const conn = getConnection()
  if (!conn.sqliteClient) {
    throw new Error("SQLite client is not available for this database URL")
  }
  return conn.sqliteClient
}

export async function execSql(statement: string) {
  const conn = getConnection()
  if (conn.neonSql) {
    await conn.neonSql.query(statement)
    return
  }
  await conn.sqliteClient!.execute(statement)
}

export async function ensureMigrated() {
  const url = getDatabaseUrl()
  if (migratedUrl === url) return
  const { migrate } = await import("./migrate")
  await migrate()
  migratedUrl = url
}

export { sqliteSchema, pgSchema }
