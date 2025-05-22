const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

let withSvgr = (config: any) => config;

try {
  withSvgr = require("next-svgr");
} catch (err) {
  console.warn("'next-svgr' not found. Skipping SVGR plugin in CI.");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    const baseurl = process.env.NEXT_PUBLIC_API_PROD_URL;
    return [
      {
        source: "/api/:path*",
        destination: `${baseurl}/api/:path*`,
      },
    ];
  },
};

module.exports = withSvgr(withPWA(nextConfig));
