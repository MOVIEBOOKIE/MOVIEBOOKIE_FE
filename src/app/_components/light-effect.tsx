"use client";

import LightIcon from "@/icons/light.svg";

export default function LightEffect() {
  return (
    <div className="absolute top-[-9px] flex flex-col items-center">
      <div className="mb-[-4px] h-[2px] w-[22px] rounded-full bg-red-500" />
      <LightIcon width={75} height={57} className="object-contain" />
    </div>
  );
}
