/**
 * Next.js Instrumentation Hook
 *
 * 此文件会被同时编译到 Node.js 和 Edge 两个运行时，
 * 因此不能包含任何 Node.js 内置模块或 eval() 调用。
 *
 * Node.js 专属代码（代理设置）通过动态 import 在运行时按需加载，
 * Edge 运行时不会执行该分支。
 */
export async function register() {
  // 只在 Node.js 服务端运行时配置代理（NextAuth 的 OAuth 流程在服务端）
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY
    if (proxyUrl) {
      // 动态 import 确保代理代码（含 Node.js 内置模块）只在 Node.js 运行时加载
      const { setupProxy } = await import("./instrumentation-proxy")
      setupProxy(proxyUrl)
    }
  }
}
