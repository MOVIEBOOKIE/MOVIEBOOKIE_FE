const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const withSvgr = require("next-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  outputFileTracingRoot: path.resolve(__dirname),
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = withSvgr(withPWA(nextConfig));
