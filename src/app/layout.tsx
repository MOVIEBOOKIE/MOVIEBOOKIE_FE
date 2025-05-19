import { ReactNode } from "react";
import "@/styles/globals.css";
import { pretendard } from "../app/fonts/pretendard";
import InAppRedirect from "./_components/inapp-redirect";
import { ReactQueryProvider } from "./providers/react-query-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
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
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </body>
      </html>
    </>
  );
}
