import type { NextConfig } from "next";

const securityHeaders = [
  // Force HTTPS for 1 year, include subdomains, preload-eligible
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // No referrer info to third parties beyond origin
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disallow MIME sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Modern frame protection (CSP frame-ancestors is preferred but X-Frame-Options for legacy)
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Limit powerful APIs we don't need
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
