import { ReactNode } from "react";
import "@/styles/globals.css";
import { pretendard } from "../app/fonts/pretendard";
import InAppRedirect from "./_components/inapp-redirect";
import { ReactQueryProvider } from "./providers/react-query-provider";
import GlobalLoading from "./_components/global-loading";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <InAppRedirect />
        <ReactQueryProvider>
          <GlobalLoading />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
