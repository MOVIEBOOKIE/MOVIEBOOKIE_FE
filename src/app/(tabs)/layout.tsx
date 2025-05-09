import { ReactNode } from "react";
import "@/styles/globals.css";
import { BottomNavigation } from "@/components";

export default function TabsLayout({ children }: { children: ReactNode }) {
  console.log("TabsLayout rendered");
  return (
    <main className="mb-25.5 h-[calc(100vh-102px)] overflow-y-auto">
      {children}
      <BottomNavigation />
    </main>
  );
}
