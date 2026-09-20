function readEnv(name: string) {
  const raw = process.env[name]
  if (!raw) return ""
  const value = raw.trim()
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

export function getDatabaseUrl() {
  const configured =
    readEnv("POSTGRES_URL_NON_POOLING") ||
    readEnv("DATABASE_URL_UNPOOLED") ||
    readEnv("DATABASE_URL") ||
    readEnv("POSTGRES_URL") ||
    readEnv("POSTGRES_PRISMA_URL") ||
    "file:./data/app.db"
  if (configured.startsWith("file:") && process.env.VERCEL) {
    return "file:/tmp/lyricgenerator.db"
  }
  return configured
}

export function isPostgresUrl(url = getDatabaseUrl()) {
  return url.startsWith("postgres://") || url.startsWith("postgresql://")
}
