/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Note: eslint config is no longer supported in next.config.mjs (Next.js 16+)
  // Use `next lint` CLI directly instead.
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'identity-credentials-get=*, publickey-credentials-get=*',
          },
        ],
      },
    ]
  },
}

export default nextConfig
