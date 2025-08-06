"use client";

import { usePathname } from "next/navigation";
import Loading from "./_components/loading";
import { useLoading } from "./_context/loading-context";
import { useEffect } from "react";

export default function LoadingPage() {
  const { isLoading, setLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    }
  }, [pathname, isLoading, setLoading]);
  if (!isLoading) return null;

  return (
    <div className="relative flex h-screen w-full justify-center">
      <Loading />
    </div>
  );
}
