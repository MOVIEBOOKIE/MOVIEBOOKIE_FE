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
export { metadata, viewport };

export default function RootLayout({ children }: { children: ReactNode }) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/favicon/48x48.png" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#0E0E0E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ToastProvider>
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
