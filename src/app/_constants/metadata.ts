import type { Metadata } from "next";
import type { Viewport } from "next";

const baseUrl = "https://movie-bookie.shop";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "무비부키 | 영화관 모임의 시작",
  description: "지금 바로 영화관에서 당신만의 추억을 예약해보세요.",
  icons: {
    icon: `${baseUrl}/images/favicon/48x48.png`,
  },
  openGraph: {
    title: "무비부키 | 영화관 모임의 시작",
    description: "지금 바로 영화관에서 당신만의 추억을 예약해보세요.",
    url: baseUrl,
    siteName: "무비부키",
    images: [
      {
        url: `${baseUrl}/images/thumbnail.png`,
        width: 1200,
        height: 630,
        alt: "MovieBookie - 영화관 모임의 시작",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "무비부키 | 영화관 모임의 시작",
    description: "지금 바로 영화관에서 당신만의 추억을 예약해보세요.",
    images: [
      {
        url: `${baseUrl}/images/thumbnail.png`,
        width: 1200,
        height: 630,
        alt: "MovieBookie - 영화관 모임의 시작",
      },
    ],
  },
} as const;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
