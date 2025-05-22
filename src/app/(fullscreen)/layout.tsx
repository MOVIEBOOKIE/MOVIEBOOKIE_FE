import { ReactNode } from "react";
import "@/styles/globals.css";

export default function FullscreenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="scrollbar-hide h-screen w-full overflow-auto">
      {children}
    </main>
  );
}
