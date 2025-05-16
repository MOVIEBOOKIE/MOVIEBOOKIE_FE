import { ReactNode } from "react";
import "@/styles/globals.css";
import { pretendard } from "../app/fonts/pretendard";
import InAppRedirect from "./_components/inapp-redirect";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {" "}
      <InAppRedirect />
      <html lang="ko" className={pretendard.variable}>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
