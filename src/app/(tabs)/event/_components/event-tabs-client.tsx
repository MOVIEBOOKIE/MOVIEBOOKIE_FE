"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import CardSkeleton from "@/components/card-skeleton";

const EventTab = dynamic(() => import("./event-tabs"), {
  ssr: false,
  loading: () => (
    <div className="mt-8">
      <CardSkeleton />
    </div>
  ),
});

export default function EventTabsClient({
  type,
}: {
  type: "신청 목록" | "주최 목록";
}) {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <EventTab type={type} />
    </Suspense>
  );
}
