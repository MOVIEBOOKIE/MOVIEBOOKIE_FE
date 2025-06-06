"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Badge from "./badge";
import InformationTab from "app/(fullscreen)/detail/_components/information-tab";
import { useUserStore } from "app/_stores/use-user-store";
import EventStatus from "app/(fullscreen)/detail/_components/event-status";

export default function DetailContent({ ...props }) {
  const user = useUserStore((state) => state.user);

  console.log(user);

  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  useEffect(() => {
    if (props.thumbnail) {
      const url = URL.createObjectURL(props.thumbnail);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [props.thumbnail]);

  const posterImageUrl = previewUrl || props.posterImageUrl;

  const recruitmentDate =
    props.recruitmentStart && props.recruitmentEnd
      ? `${props.recruitmentStart} - ${props.recruitmentEnd}`
      : props.recruitmentDate;

  const eventTime = props.eventStartTime
    ? props.eventStartTime
    : props.eventTime;
  return (
    <>
      <div className="relative h-75 w-full">
        {posterImageUrl && (
          <Image
            src={posterImageUrl}
            alt="movie-poster"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="from-gray-black/20 to-gray-black absolute inset-0 z-1 bg-gradient-to-b" />
        <p className="caption-1-medium absolute bottom-0 z-10 pl-5 text-gray-500">
          {props.mediaType || "영화"} ·
          {props.locationName || "코엑스 더 부티크 프라이빗 1관"}
        </p>
      </div>

      <div className="px-5">
        <p className="text-gray-white title-2-semibold mt-1">
          {props.mediaTitle || "작품 제목"}
        </p>
        <EventStatus
          eventState={props.eventState}
          recruitmentRate={props.recruitmentRate}
        />
        <div
          className={
            props.eventState === "모집 취소" || props.eventState === "대관 취소"
              ? "opacity-30"
              : ""
          }
        >
          <div className="mt-8.5 flex flex-col gap-3">
            <div className="flex gap-2">
              {props.userImageUrl && (
                <Image
                  src={props.userImageUrl}
                  alt="profile"
                  width={34}
                  height={34}
                  className="h-8.5 w-8.5 rounded-full object-cover"
                />
              )}

              <div className="flex flex-col gap-0.5">
                <p className="body-3-medium text-gray-200">
                  {props.username || "회원"}
                </p>
                <p className="caption-1-regular text-gray-500">
                  단관 경험 {props.recruitment ?? "0"}회
                </p>
              </div>
            </div>

            <p className="body-2-medium text-gray-300">
              {props.eventTitle || "이벤트 제목"}
            </p>
            <p className="body-3-medium text-gray-600">
              {props.description || "이벤트 설명"}
            </p>
          </div>
          <div className="caption-1-regular mt-8 grid grid-cols-[74px_1fr] gap-y-2 rounded-xl bg-gray-950 px-5 pt-5 pb-6 text-gray-300">
            <span>예상 가격</span>
            <span>{props.estimatedPrice?.toLocaleString() ?? "24,000"}원</span>

            <span>이벤트 일시</span>
            <span>{props.eventDate || "2025. 05. 30 (금)"}</span>

            <span>모집 기간</span>
            <span className="-my-0.25 flex items-center gap-1">
              {recruitmentDate || "2025. 04. 28 - 2025. 05. 09"}
              {props.d_day && (
                <Badge variant="primary" className="px-1 py-0.25">
                  {props.d_day}
                </Badge>
              )}
            </span>

            <span>모집 인원</span>
            <span>
              {props.minParticipants ?? "0"} - {props.maxParticipants ?? "0"}명
            </span>
          </div>
          <div className="mt-4 mb-6 h-0.25 w-full rounded-sm bg-gray-950" />
          <InformationTab
            {...props}
            recruitmentDate={recruitmentDate}
            eventTime={eventTime}
          />
        </div>
      </div>
    </>
  );
}
