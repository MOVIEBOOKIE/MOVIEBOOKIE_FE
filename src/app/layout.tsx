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
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
