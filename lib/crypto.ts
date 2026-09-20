import { createHash, randomBytes, timingSafeEqual } from "node:crypto"

export function newId() {
  return randomBytes(16).toString("hex")
}

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex")
}

export function newToken() {
  return randomBytes(32).toString("hex")
}

export function hashIp(ip: string) {
  const salt = process.env.NEXTAUTH_SECRET || "lyricgenerator-ip-salt"
  return sha256(`${salt}:${ip}`)
}

export function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}
