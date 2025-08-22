const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable:
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV !== "production",
  skipWaiting: true,
  swSrc: "public/custom-sw.js",
});

const withSvgr = require("next-svgr");

const STAGE =
  process.env.NEXT_PUBLIC_STAGE ??
  (process.env.VERCEL_ENV === "production" ? "prod" : "dev");

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (STAGE === "prod"
    ? "https://api.movie-bookie.shop"
    : "https://api.dev-movie-bookie.shop");

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
      { protocol: "http", hostname: "img1.kakaocdn.net", pathname: "/**" },
      { protocol: "http", hostname: "k.kakaocdn.net", pathname: "/**" },
      {
        protocol: "https",
        hostname: "movie-bookie-storage.kr.object.ncloudstorage.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "maps.googleapis.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "naveropenapi.apigw.ntruss.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const rules = [
      {
        source: "/events/:id/participants",
        destination: `${BASE_URL}/events/:id/participants`,
      },
      {
        source: "/events/:id/participants/",
        destination: `${BASE_URL}/events/:id/participants/`,
      },
      {
        source: "/api/:path*",
        destination: `${BASE_URL}/api/:path*`,
      },
    ];

    return rules;
  },
};

module.exports = withPWA(withSvgr(nextConfig));
