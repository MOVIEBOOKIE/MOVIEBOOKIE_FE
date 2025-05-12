import { ReactNode } from "react";
import "@/styles/globals.css";
import { pretendard } from "../app/fonts/pretendard";
import { PATH_IMAGES } from "./_constants";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <link rel="icon" href={PATH_IMAGES.FAVICON} sizes="512x512" />
      </head>
      <body>{children}</body>
    </html>
  );
}
