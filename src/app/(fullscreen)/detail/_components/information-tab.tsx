"use client";

import { Badge, ToggleTab } from "@/components";
import { EventData } from "app/_types/event";
import Image from "next/image";
import { useState } from "react";
import MapThumbnail from "./map-thumbnail";

export default function InformationTab({ ...props }) {
  const [selected, setSelected] = useState("이벤트");

  return (
    <>
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
            <p className="body-2-medium">
              {(props.estimatedPrice ?? "24,000").toLocaleString?.() ||
                "24,000"}
              원
            </p>
            <Badge variant="primary" className="px-1 py-0.5">
              변동 가능
            </Badge>
          </div>

          <div className="mt-6 mb-5 h-0.25 w-full rounded-sm bg-gray-950" />

          <p className="body-2-medium text-gray-400">일정</p>
          <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3.25 gap-y-1">
            <span className="body-3-medium text-gray-600">날짜</span>
            <p className="body-3-regular text-gray-200">
              {props.eventDate ?? "2025. 05. 30 (금)"}
            </p>
            <span className="body-3-medium text-gray-600">시간</span>
            <p className="body-3-regular text-gray-200">
              {props.eventTime ?? "17시 00분"}
            </p>
          </div>

          <div className="mt-6 mb-5 h-0.25 w-full rounded-sm bg-gray-950" />

          <p className="body-2-medium mb-2 text-gray-400">위치</p>
          <MapThumbnail
            latitude={props.latitude ?? 37.511483}
            longitude={props.longitude ?? 127.060337}
            locationName={props.locationName ?? "코엑스 더 부티크 프라이빗 1관"}
            address={props.address ?? "서울 강남구 삼성동 159"}
          />

          <div className="mt-6 mb-5 h-0.25 w-full rounded-sm bg-gray-950" />

          <p className="body-2-medium mb-2 text-gray-400">영화관 내부</p>
          <div className="relative w-full" style={{ aspectRatio: "335 / 192" }}>
            <Image
              src={
                props.locationImageUrl ||
                "https://kr.object.ncloudstorage.com/movie-bookie-storage/%EC%BD%94%EC%97%91%EC%8A%A4%201%ED%98%B8.png"
              }
              alt="movie"
              fill
              className="rounded-[10px] object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 pb-44">
          <p className="body-2-medium mb-2 text-gray-400">모집 일정</p>
          <div className="flex gap-3">
            <p className="body-3-medium text-gray-400">모집 기간</p>
            <div className="flex gap-1.5">
              <p className="body-3-regular text-gray-200">
                {props.recruitmentDate ?? "2025. 04. 28 - 2025. 05. 09"}
              </p>
              {props.d_day && (
                <Badge variant="primary" className="px-1 py-0.25">
                  {props.d_day}
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-6 mb-5 h-0.25 w-full rounded-sm bg-gray-950" />

          <p className="body-2-medium mb-2 text-gray-400">모집 인원</p>
          <p className="caption-1-medium mt-0.5 text-gray-600">
            *모집 인원 미달성시, 이벤트 진행 취소
          </p>

          <div className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
            <span className="body-3-medium text-gray-600">모집 인원</span>
            <p className="body-3-regular text-gray-200">
              {props.minParticipants ?? "0"} -{props.maxParticipants ?? "0"}명
            </p>

            <span className="body-3-medium text-gray-600">현재 참여자</span>
            <p className="body-3-regular text-gray-200">
              {props.currentParticipants ?? "0"}명 신청
            </p>

            <span className="body-3-medium text-gray-600">모집 달성률</span>
            <p className="body-3-medium text-red-main">
              {props.recruitmentRate ?? "0"}%
            </p>
          </div>
        </div>
      )}
    </>
  );
}
