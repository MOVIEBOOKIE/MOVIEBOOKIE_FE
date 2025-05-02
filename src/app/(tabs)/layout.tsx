import { BottomNavigation } from "@/components";
import "@/styles/globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
}
