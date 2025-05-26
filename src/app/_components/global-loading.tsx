"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Loading from "app/loading";

export default function GlobalLoading() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;

  if (!isLoading) return null;

  return <Loading />;
}
