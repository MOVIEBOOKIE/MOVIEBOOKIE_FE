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
import { metadata, viewport } from "@/constants/metadata";
import InAppRedirect from "./_components/inapp-redirect";
import DebugLogger from "./_components/debug-logger";

export { metadata, viewport };
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
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
            <Toast />
          </ReactQueryProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
