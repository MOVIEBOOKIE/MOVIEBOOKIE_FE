const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const withSvgr = require("next-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kr.object.ncloudstorage.com",
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "movie-bookie-storage.kr.object.ncloudstorage.com",
        pathname: "/**",
      },
    ],
  },
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
