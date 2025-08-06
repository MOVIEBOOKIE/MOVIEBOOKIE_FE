"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LoadingPage from "app/loading";

export default function ExternalRedirectPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = searchParams.get("url");
    if (url) {
      window.location.href = url;
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <LoadingPage />
    </div>
  );
}
