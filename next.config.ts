const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const withSvgr = require("next-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  appDir: true,
  outputFileTracingRoot: path.resolve(__dirname),
};

module.exports = withSvgr(withPWA(nextConfig));
