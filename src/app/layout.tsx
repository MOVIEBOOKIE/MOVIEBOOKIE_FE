import { ReactNode } from "react";
import "@/styles/globals.css";
import { pretendard } from "../app/fonts/pretendard";
import InAppRedirect from "./_components/inapp-redirect";
import { ReactQueryProvider } from "./providers/react-query-provider";
import ToastRenderer from "./_components/toast-renderer";
import Script from "next/script";
import { ToastProvider } from "./_context/toast-context";
import Toast from "./_components/noti-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ServiceWorkerDebug from "./_components/FCM/ServiceWorkerDebug";
import DebugLogger from "./_components/debug-logger";
import { LoadingProvider } from "./_context/loading-context";

export const metadata = {
  title: "무비부키 | 영화관 모임의 시작",
  description: "지금 바로 영화관에서 당신만의 추억을 예약해보세요.",
  viewport: "width=device-width, initial-scale=1",
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
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/favicon/48x48.png" />
      </head>
      <body>
        <ToastProvider>
          <DebugLogger />
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
          />
          <InAppRedirect />
          <ToastRenderer />
          <ReactQueryProvider>
            <ServiceWorkerDebug />
            <LoadingProvider> {children}</LoadingProvider>
            <SpeedInsights />
            <Toast />
          </ReactQueryProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
