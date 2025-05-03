const withPWA = require("next-pwa")({
  dest: "public",
});

const withSvgr = require("next-svgr");

const nextConfig = { trailingSlash: true };

module.exports = withSvgr(withPWA(nextConfig));
