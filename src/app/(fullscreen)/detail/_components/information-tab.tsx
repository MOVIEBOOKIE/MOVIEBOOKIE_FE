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
          <p className="caption-1-medium mt-0.5 text-gray-600">
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
          <Image
            src={PATH_IMAGES.TMP_MAP}
            width={335}
            height={192}
            alt="map"
            className="w-full object-cover"
          />
          <div className="mt-6 mb-5 h-0.25 w-full rounded-sm bg-gray-950" />
          <p className="body-2-medium mb-2 text-gray-400">영화관 내부</p>
          <Image
            src={PATH_IMAGES.TMP_MOVIE}
            width={335}
            height={192}
            alt="movie"
            className="w-full object-cover"
          />
        </div>
      ) : (
        <div className="mt-5 pb-17">
          <p className="body-2-medium mb-2 text-gray-400">모집 일정</p>
          <div className="flex gap-3">
            <p className="body-3-medium text-gray-400">모집 기간</p>
            <div className="flex gap-1.5">
              <p className="body-3-regular text-gray-200">
                2025. 04. 15 - 2025. 04. 20
              </p>
              <Badge variant="primary">D-4</Badge>
            </div>
          </div>
          <div className="mt-6 mb-5 h-0.25 w-full rounded-sm bg-gray-950" />
          <p className="body-2-medium mb-2 text-gray-400">모집 인원</p>
          <p className="caption-1-medium mt-0.5 text-gray-600">
            *모집 인원 미달성시, 이벤트 진행 취소
          </p>
          <div className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
            <span className="body-3-medium text-gray-600">모집 인원</span>
            <p className="body-3-regular text-gray-200">20 - 56명</p>
            <span className="body-3-medium text-gray-600">현재 참여자</span>
            <p className="body-3-regular text-gray-200">12명 신청</p>
            <span className="body-3-medium text-gray-600">모집 달성률</span>
            <p className="body-3-medium text-red-main">60%</p>
          </div>
        </div>
      )}
    </div>
  );
}
