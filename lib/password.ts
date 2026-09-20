import bcrypt from "bcryptjs"

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function validatePassword(password: string) {
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters."
  }
  if (password.length > 128) {
    return "Password is too long."
  }
  return null
}

export function validateEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return null
  }
  return normalized
}
