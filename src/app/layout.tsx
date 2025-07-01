"use client";
import { ReactNode, useEffect } from "react";
import "@/styles/globals.css";
import { pretendard } from "../app/fonts/pretendard";
import InAppRedirect from "./_components/inapp-redirect";
import { ReactQueryProvider } from "./providers/react-query-provider";
import GlobalLoading from "./_components/global-loading";
import ToastRenderer from "./_components/toast-renderer";
import Script from "next/script";
import DebugLogger from "./_components/debug-logger";
import { ToastProvider } from "./_context/toast-context";
import Toast from "./_components/noti-toast";
import ServiceWorkerDebug from "./_components/FCM/ServiceWorkerDebug";
import FCMHandler from "./_components/FCM/fcm-handler";

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
        {" "}
        <ToastProvider>
          {/* <DebugLogger /> */}
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
          />
          <InAppRedirect />
          <ToastRenderer />
          <ReactQueryProvider>
            {/* <GlobalLoading /> */}
            <ServiceWorkerDebug />
            {children}
            <Toast />
          </ReactQueryProvider>{" "}
        </ToastProvider>
      </body>
    </html>
  );
}
