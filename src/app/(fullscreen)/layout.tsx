import { ReactNode } from "react";
import "@/styles/globals.css";

export default function FullscreenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main className="h-screen w-full">{children}</main>;
}
