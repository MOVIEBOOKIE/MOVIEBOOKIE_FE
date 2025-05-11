const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest.json$/],
});

const withSvgr = require("next-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  outputFileTracingRoot: path.resolve(__dirname),
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
};

module.exports = withSvgr(withPWA(nextConfig));
