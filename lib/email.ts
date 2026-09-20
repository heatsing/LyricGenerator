import { createTransport } from "nodemailer"

function siteUrl() {
  return process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

async function sendMail(to: string, subject: string, text: string, html: string) {
  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "LyricGenerator <noreply@lyricgenerator.cc>",
        to,
        subject,
        text,
        html,
      }),
    })
    if (!response.ok) {
      throw new Error(`Resend failed: ${response.status}`)
    }
    return
  }

  if (process.env.SMTP_HOST) {
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          }
        : undefined,
    })
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "LyricGenerator <noreply@lyricgenerator.cc>",
      to,
      subject,
      text,
      html,
    })
    return
  }

  console.log(`[email:dev] to=${to} subject=${subject}\n${text}`)
}

export async function sendPasswordResetEmail(to: string, token: string) {
  const url = `${siteUrl()}/reset-password?token=${token}`
  await sendMail(
    to,
    "Reset your LyricGenerator password",
    `Reset your password: ${url}\nThis link expires in 1 hour.`,
    `<p>Reset your password:</p><p><a href="${url}">${url}</a></p><p>This link expires in 1 hour.</p>`,
  )
}

export async function sendVerificationEmail(to: string, token: string) {
  const url = `${siteUrl()}/verify-email?token=${token}`
  await sendMail(
    to,
    "Verify your LyricGenerator email",
    `Verify your email: ${url}\nThis link expires in 24 hours.`,
    `<p>Verify your email:</p><p><a href="${url}">${url}</a></p><p>This link expires in 24 hours.</p>`,
  )
}
