import { getSessionUser } from "./session"
import { assertGenerationQuota, clientIp, recordUsage } from "./usage"
import { resolveEntitlements } from "./entitlements"
import { saveGeneration } from "./users"

export async function withGenerationGuard(req: Request, action: "lyrics" | "poem" | "story" | "song") {
  const session = await getSessionUser()
  const entitlements = session?.entitlements ?? resolveEntitlements(null)
  const ip = clientIp(req)
  const quota = await assertGenerationQuota({
    userId: session?.user.id ?? null,
    ip,
    entitlements,
  })
  if (!quota.allowed) {
    return {
      ok: false as const,
      response: Response.json(
        {
          error: "Daily generation limit reached. Sign in or upgrade to Pro for more.",
          code: "RATE_LIMITED",
          limit: quota.limit,
        },
        { status: 429 },
      ),
    }
  }
  return {
    ok: true as const,
    session,
    entitlements,
    ip,
    action,
  }
}

export async function afterGeneration(opts: {
  userId?: string | null
  ip: string
  action: string
  input: unknown
  output: string
  historyLimit: number | null
}) {
  await recordUsage(opts.userId ?? null, opts.ip, opts.action)
  if (opts.userId) {
    await saveGeneration(opts.userId, opts.action, opts.input, opts.output, opts.historyLimit)
  }
}

export function deepseekKey() {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    throw new Error("OPENAI_API_KEY is not configured")
  }
  return key
}
