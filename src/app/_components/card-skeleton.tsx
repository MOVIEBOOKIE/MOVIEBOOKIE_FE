"use client";

export default function CardSkeleton() {
  return (
    <div className="relative flex h-30 w-full animate-pulse gap-3">
      <div className="h-30 w-30 rounded-md bg-gray-900" />

      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="h-3 w-1/4 rounded bg-gray-800" />
        <div className="h-5 w-3/4 rounded bg-gray-800" />
        <div className="h-3 w-1/2 rounded bg-gray-800" />
        <div className="h-4 w-full rounded bg-gray-800" />
      </div>
    </div>
  );
}
