import { Agent } from "https"
import { request as httpRequest } from "http"
import { connect as tlsConnect } from "tls"
import type { TLSSocket } from "tls"
import { createRequire } from "module"

/**
 * 内置 HTTPS 代理 Agent（通过 CONNECT 隧道）
 * 不依赖外部包，仅使用 Node.js 内置模块
 * 仅在 Node.js 运行时加载，避免 Edge Runtime 报错
 */
class HttpsProxyAgent extends Agent {
  private proxyHost: string
  private proxyPort: number

  constructor(proxyUrl: string) {
    super({ timeout: 10000 })
    const url = new URL(proxyUrl)
    this.proxyHost = url.hostname
    this.proxyPort = parseInt(url.port || "80", 10)
  }

  createConnection(
    opts: Record<string, unknown>,
    callback: (err: Error | null, socket?: TLSSocket) => void,
  ): void {
    const targetHost = (opts.host as string) || (opts.servername as string)
    const targetPort = (opts.port as number) || 443

    const proxyReq = httpRequest({
      method: "CONNECT",
      host: this.proxyHost,
      port: this.proxyPort,
      path: `${targetHost}:${targetPort}`,
      headers: { Host: `${targetHost}:${targetPort}` },
      agent: false,
    })

    proxyReq.once("connect", (res, socket) => {
      if (res.statusCode !== 200) {
        socket.destroy()
        callback(new Error(`Proxy responded with ${res.statusCode}`))
        return
      }

      const tlsSocket = tlsConnect({
        socket,
        servername: (opts.servername as string) || targetHost,
      })

      tlsSocket.once("secureConnect", () => {
        callback(null, tlsSocket)
      })

      tlsSocket.once("error", (err: Error) => {
        callback(err)
      })
    })

    proxyReq.once("error", (err: Error) => {
      callback(err)
    })

    proxyReq.end()
  }
}

/**
 * 配置 HTTPS 代理（仅用于本地开发环境，Vercel 生产环境不需要）
 */
export function setupProxy(proxyUrl: string) {
  // 使用 createRequire 获取 CommonJS 模块（ESM 中 https.globalAgent 是只读的）
  const dynamicRequire = createRequire(import.meta.url)
  const https = dynamicRequire("https")
  const proxyAgent = new HttpsProxyAgent(proxyUrl)

  // 1. 设置全局 agent（作为后备）
  https.globalAgent = proxyAgent as typeof https.globalAgent
  console.log(`[instrumentation] HTTPS global agent set to proxy: ${proxyUrl}`)

  // 2. Monkey-patch https.request，确保 Turbopack 打包的模块也走代理
  const originalRequest = https.request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  https.request = function (...args: any[]) {
    try {
      const first = args[0]
      // 情况 A: (urlString | URL, options?, callback?)
      if (typeof first === "string" || first instanceof URL) {
        const parsedUrl = typeof first === "string" ? new URL(first) : first
        const host = parsedUrl.hostname
        if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
          const second = args[1]
          if (typeof second === "function" || second === undefined) {
            args.splice(1, 0, { agent: proxyAgent })
          } else if (second && typeof second === "object" && !second.agent) {
            second.agent = proxyAgent
          }
        }
      } else if (first && typeof first === "object") {
        // 情况 B: (options, callback?)
        const host = first.hostname || first.host
        if (host && !host.includes("localhost") && !host.includes("127.0.0.1") && !first.agent) {
          first.agent = proxyAgent
        }
      }
    } catch {
      // 出错时回退到原始 request
    }
    return originalRequest.apply(this, args)
  } as typeof https.request
  console.log(`[instrumentation] https.request monkey-patched for proxy`)
}
