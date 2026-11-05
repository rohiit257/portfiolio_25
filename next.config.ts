import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Skip ESLint during `next build` — run `npm run lint` separately
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Skip TypeScript type checking during build — run `tsc` separately
  typescript: {
    ignoreBuildErrors: true,
  },

  // Compress output
  compress: true,

  // Security & performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Block MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer info for analytics while protecting privacy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Basic permissions policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // XSS protection for older browsers
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      {
        // Long-term cache for static assets
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache favicons and public assets
        source: "/favicon.ico",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },

  // Redirect /about → /
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
