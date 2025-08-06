import { ReactNode } from "react";
import "@/styles/globals.css";
import { pretendard } from "../app/fonts/pretendard";
import { ReactQueryProvider } from "./providers/react-query-provider";
import ToastRenderer from "./_components/toast-renderer";
import Script from "next/script";
import { ToastProvider } from "./_context/toast-context";
import Toast from "./_components/noti-toast";
import ServiceWorkerDebug from "./_components/ServiceWorkerDebug";
import { LoadingProvider } from "./_context/loading-context";

export const metadata = {
  title: "무비부키 | 영화관 모임의 시작",
  description: "지금 바로 영화관에서 당신만의 추억을 예약해보세요.",
  icons: {
    icon: "/favicon.png",
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
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/favicon/48x48.png" />
        <meta
          name="naver-site-verification"
          content="7dd8da1c8834169e1812e1266f327334c8462dc0"
        />
      </head>
      <body>
        <ToastProvider>
          {/* <DebugLogger /> */}
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
          />
          {/* <InAppRedirect /> */}
          <ToastRenderer />
          <ReactQueryProvider>
            <ServiceWorkerDebug />
            <LoadingProvider> {children}</LoadingProvider>
            <Toast />
          </ReactQueryProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
