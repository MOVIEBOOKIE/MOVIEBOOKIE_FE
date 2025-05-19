const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
});

const withSvgr = require("next-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_PROD_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = withSvgr(withPWA(nextConfig));
