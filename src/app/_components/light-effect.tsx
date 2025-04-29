"use client";

import LightIcon from "@/icons/light.svg";

export default function LightEffect() {
  return (
    <div className="absolute -top-2.25 flex flex-col items-center">
      <div className="-mb-1 h-0.5 w-5.5 rounded-full bg-red-500" />
      <LightIcon width={75} height={57} className="object-contain" />
    </div>
  );
}
