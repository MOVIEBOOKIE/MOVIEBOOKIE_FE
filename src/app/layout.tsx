import "@/app/_styles/globals.css";
import { ReactNode } from "react";
import BottomNavigation from "./_components/bottom-navibar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main className="h-[calc(100vh-102px)] overflow-y-auto">
          {children}
          <BottomNavigation />
        </main>
      </body>
    </html>
  );
}
