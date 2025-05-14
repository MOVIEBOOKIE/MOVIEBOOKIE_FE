"use client";

import { Badge, ToggleTab } from "@/components";
import { PATH_IMAGES } from "@/constants";
import Image from "next/image";
import { useState } from "react";

export default function InformationTab() {
  const [selected, setSelected] = useState("이벤트");

  return (
    <div>
      <ToggleTab
        options={["이벤트", "모집"]}
        selected={selected}
        onSelect={setSelected}
        withSuffix="정보"
      />
      {selected === "이벤트" ? (
        <div className="mt-5 pb-35">
          <p className="body-2-medium text-gray-400">가격</p>
          <p className="caption-1-medium mt-0.5">
            *최소 인원 기준 가격으로, 모집인원에 따라 변동가능
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <p className="body-2-medium">24,000원</p>
            <Badge variant="primary" className="px-1 py-0.5">
              변동 가능
            </Badge>
          </div>
          <div className="mt-6 mb-5 h-0.25 w-full rounded-sm bg-gray-950" />
          <p className="body-2-medium text-gray-400">일정</p>
          <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3.25 gap-y-1">
            <span className="body-3-medium text-gray-600">날짜</span>
            <p className="body-3-regular text-gray-200">2025. 05. 26 (월)</p>
            <span className="body-3-medium text-gray-600">시간</span>
            <p className="body-3-regular text-gray-200">00시 00분</p>
          </div>
          <div className="mt-6 mb-5 h-0.25 w-full rounded-sm bg-gray-950" />
          <p className="body-2-medium mb-2 text-gray-400">위치</p>
          <Image src={PATH_IMAGES.TMP_MAP} width={335} height={192} alt="map" />
          <div className="mt-6 mb-5 h-0.25 w-full rounded-sm bg-gray-950" />
          <p className="body-2-medium mb-2 text-gray-400">영화관 내부</p>
          <Image
            src={PATH_IMAGES.TMP_MOVIE}
            width={335}
            height={192}
            alt="map"
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
