import { readFileSync } from "node:fs"

const text = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
for (const line of text.split(/\r?\n/)) {
  if (!line || line.startsWith("#") || !line.includes("=")) continue
  const idx = line.indexOf("=")
  process.env[line.slice(0, idx).trim()] ||= line.slice(idx + 1).trim()
}

const id = process.env.PAYPAL_CLIENT_ID || ""
const secret = process.env.PAYPAL_CLIENT_SECRET || ""
const auth = Buffer.from(`${id}:${secret}`).toString("base64")
const res = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: "grant_type=client_credentials",
})
const body = await res.text()
console.log(`status=${res.status}`)
console.log(`client_id_len=${id.length}`)
console.log(`error=${body.slice(0, 160)}`)
