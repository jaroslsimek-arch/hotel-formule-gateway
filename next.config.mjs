/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",

      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://typebot.io https://app.typebot.io",

      "style-src 'self' 'unsafe-inline' https://fonts.bunny.net",

      "font-src 'self' data: https://fonts.bunny.net",

      "img-src 'self' data: blob: https:",

      "connect-src 'self' https://typebot.io https://app.typebot.io https://*.typebot.io wss://*.typebot.io",

      "frame-src https://typebot.io https://app.typebot.io https://*.typebot.io",
    ].join("; "),
  },
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
