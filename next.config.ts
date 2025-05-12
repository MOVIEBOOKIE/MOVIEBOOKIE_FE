const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const withSvgr = require("next-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-movie-bookie.shop/api/:path*",
      },
    ];
  },
};

module.exports = withSvgr(withPWA(nextConfig));
