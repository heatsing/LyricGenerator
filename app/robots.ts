import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lyricgenerator.cc"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/login", "/account", "/forgot-password", "/reset-password", "/verify-email"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
