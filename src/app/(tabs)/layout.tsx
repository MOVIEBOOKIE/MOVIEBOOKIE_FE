import BottomNavigation from "@/components/bottom-navibar";
import { ReactNode } from "react";

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="scrollbar-hide app-shell pt-safe-top min-h-[calc(100vh-102px)] overflow-y-auto">
        {children}
      </main>
      <BottomNavigation />
    </>
  );
}
