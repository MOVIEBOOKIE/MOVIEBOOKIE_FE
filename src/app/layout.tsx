import "@/app/_styles/globals.css";
import { ReactNode } from "react";
import BottomNavigation from "./_components/bottom-navibar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="border">
        <main>
          {children}
          <BottomNavigation />
        </main>
      </body>
    </html>
  );
}
