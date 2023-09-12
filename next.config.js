/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: "http://localhost:5000/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
