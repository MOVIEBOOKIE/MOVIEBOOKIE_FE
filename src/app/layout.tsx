import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main className="mx-auto mb-25.5 h-[calc(100vh-102px)] overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
