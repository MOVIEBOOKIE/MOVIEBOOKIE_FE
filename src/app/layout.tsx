import { ReactNode } from "react";
import "@/styles/globals.css";
import { pretendard } from "../app/fonts/pretendard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "무비부키",
  description: "당신의 일상을 영화처럼",
  themeColor: "#0E0E0E",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <link rel="icon" href="/images/favicon.png" sizes="512x512" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
