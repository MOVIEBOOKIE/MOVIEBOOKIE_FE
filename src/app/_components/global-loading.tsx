"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Loading from "app/loading";
import { usePathname } from "next/navigation";

export default function GlobalLoading() {
  const pathname = usePathname();

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  if (!isLoading || pathname?.startsWith("/event") || pathname === "/")
    return null;
  return <Loading />;
}
