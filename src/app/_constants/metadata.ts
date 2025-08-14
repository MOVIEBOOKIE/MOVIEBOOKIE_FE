import type { Metadata } from "next";
import type { Viewport } from "next";

const siteUrl = process.env.NEXT_PUBLIC_API_PROD_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "무비부키 | 영화관 모임의 시작",
  description: "지금 바로 영화관에서 당신만의 추억을 예약해보세요.",
  icons: {
    icon: "/images/favicon/48x48.png",
  },
  openGraph: {
    title: "무비부키 | 영화관 모임의 시작",
    description: "지금 바로 영화관에서 당신만의 추억을 예약해보세요.",
    url: "https://movie-bookie.shop",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "MovieBookie",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "무비부키 | 영화관 모임의 시작",
    description: "지금 바로 영화관에서 당신만의 추억을 예약해보세요.",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "MovieBookie",
      },
    ],
  },
} as const;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
