import { ReactNode } from "react";
import "@/styles/globals.css";
import { pretendard } from "../app/fonts/pretendard";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <link rel="icon" href="/images/favicon.png" sizes="512x512" />
      </head>
      <body>{children}</body>
    </html>
  );
}
