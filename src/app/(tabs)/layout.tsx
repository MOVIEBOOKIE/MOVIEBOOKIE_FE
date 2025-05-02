import { BottomNavigation } from "@/components";
import { ReactNode } from "react";

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
}
