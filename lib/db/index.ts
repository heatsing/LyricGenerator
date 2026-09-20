import { createClient, type Client } from "@libsql/client"
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql"
import { mkdirSync } from "node:fs"
import { dirname } from "node:path"
import * as schema from "./schema"

type AppDb = LibSQLDatabase<typeof schema>

let cached: { url: string; db: AppDb; client: Client } | null = null
let migratedUrl: string | null = null

export function getDatabaseUrl() {
  return process.env.DATABASE_URL || "file:./data/app.db"
}

function ensureLocalDir(url: string) {
  if (!url.startsWith("file:")) return
  const filePath = url.slice("file:".length)
  const dir = dirname(filePath)
  if (dir && dir !== ".") {
    mkdirSync(dir, { recursive: true })
  }
}

function getConnection() {
  const url = getDatabaseUrl()
  if (cached && cached.url === url) return cached

  ensureLocalDir(url)
  const client = createClient({
    url,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  })
  const db = drizzle(client, { schema })
  cached = { url, db, client }
  return cached
}

export function getDb(): AppDb {
  return getConnection().db
}

export function getClient(): Client {
  return getConnection().client
}

export async function ensureMigrated() {
  const url = getDatabaseUrl()
  if (migratedUrl === url) return
  const { migrate } = await import("./migrate")
  await migrate()
  migratedUrl = url
}

export { schema }
