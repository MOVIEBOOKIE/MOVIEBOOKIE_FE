import { ReactNode } from "react";
import "@/styles/globals.css";
import { BottomNavigation } from "@/components";

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="scrollbar-hide h-[calc(100vh-102px)] overflow-y-auto">
        {children}
      </main>
      <BottomNavigation />
    </>
  );
}
