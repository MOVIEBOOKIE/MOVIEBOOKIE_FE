const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
  swSrc: "public/custom-sw.js",
});

const withSvgr = require("next-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "standalone",
  productionBrowserSourceMaps: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kr.object.ncloudstorage.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "movie-bookie-storage.kr.object.ncloudstorage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const rules = [
      {
        source: "/events/:id/participants",
        destination: "https://api.movie-bookie.shop/events/:id/participants",
      },
      {
        source: "/events/:id/participants/",
        destination: "https://api.movie-bookie.shop/events/:id/participants/",
      },
    ];

    if (process.env.NODE_ENV === "development") {
      rules.push({
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_DEV_URL}/api/:path*`,
      });
    }

    return rules;
  },
};

module.exports = withPWA(withSvgr(nextConfig));
