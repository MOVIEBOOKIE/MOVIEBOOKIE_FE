"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageView } from "@/lib/gtm";

export default function RouteTracker() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = search?.toString() ? `${pathname}?${search}` : pathname;
    pageView(url); // dataLayer.push({ event: 'page_view', page_location: url })
  }, [pathname, search]);

  return null;
}
