"use client";
import { useEffect, useRef } from "react";
import { ev } from "@/lib/gtm";
import Home from "./(tabs)/home/page";
import TabsLayout from "./(tabs)/layout";

export default function WrappedTabsHome() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    ev.homeView();
  }, []);

  return (
    <TabsLayout>
      <Home />
    </TabsLayout>
  );
}
