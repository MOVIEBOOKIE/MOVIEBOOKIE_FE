"use client";

import Image from "next/image";

export default function LightEffect() {
  return (
    <div className="absolute top-[-9px] flex flex-col items-center">
      <div className="mb-[-4px] h-[2px] w-[22px] rounded-full bg-red-500" />
      <Image
        src="/icons/navigation/light.svg"
        alt="조명효과"
        width={75}
        height={57}
        className="object-contain"
        priority
      />
    </div>
  );
}
