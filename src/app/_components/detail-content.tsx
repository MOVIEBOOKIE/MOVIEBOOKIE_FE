"use client";

import Image from "next/image";
import React from "react";
import Badge from "./badge";
import InformationTab from "app/(fullscreen)/detail/_components/information-tab";
import { useUserStore } from "app/_stores/useUserStore";
import { EventData } from "app/_types/event";
// import { useEventFormStore } from "app/_stores/useEventCreateForm";

export default function DetailContent({ data }: { data: EventData }) {
  const user = useUserStore((state) => state.user);
  // const { formData } = useEventFormStore();
  // const {
  //   thumbnail,
  //   mediaTitle,
  //   eventTitle,
  //   description,
  //   eventDate,
  //   recruitmentStart,
  //   recruitmentEnd,
  //   minParticipants,
  //   maxParticipants,
  // } = formData;

  // const thumbnail = null;

  // const thumbnailUrl = thumbnail
  //   ? URL.createObjectURL(thumbnail)
  //   : "/images/image.png";
  return (
    <>
      <div className="relative h-75 w-full">
        {/* {thumbnailUrl && ( */}
        <Image
          src={data.posterImageUrl}
          alt="movie-poster"
          fill
          className="object-cover"
          priority
        />
        {/* )} */}
        <div className="from-gray-black/20 to-gray-black absolute inset-0 z-1 bg-gradient-to-b" />
        <p className="caption-1-medium absolute bottom-0 z-10 pl-5 text-gray-500">
          {data.mediaType} · {data.locationName}
        </p>
      </div>
      <div className="px-5">
        <p className="text-gray-white title-2-semibold mt-1">
          {data.mediaTitle}
        </p>
        <div className="mt-3.5 flex justify-between">
          <p className="body-3-medium text-gray-500">모집 달성률</p>
          <p className="body-2-semibold text-red-main">
            {data.recruitmentRate}%
          </p>
        </div>
        <div className="mt-2.5 h-1 w-full rounded-[10px] bg-gray-800">
          <div
            className="bg-red-main h-1 rounded-[10px]"
            style={{ width: `${data.recruitmentRate}%` }}
          />
        </div>
        <div className="mt-8.5 flex flex-col gap-3">
          <div className="flex gap-2">
            <Image
              src={data.userImageUrl}
              alt="profile"
              width={34}
              height={34}
              className="h-8.5 w-8.5 rounded-full object-cover"
            />
            <div className="flex flex-col gap-0.5">
              <p className="body-3-medium text-gray-200"> {data.username}</p>
              <p className="caption-1-regular text-gray-500">
                단관 경험 {data.recruitment}회 (상세정보)
              </p>
            </div>
          </div>
          <p className="body-2-medium text-gray-300">{data.eventTitle}</p>
          <p className="body-3-medium text-gray-600">{data.description}</p>
        </div>
        <div className="caption-1-regular mt-8 grid grid-cols-[74px_1fr] gap-y-2 rounded-xl bg-gray-950 px-5 pt-5 pb-6 text-gray-300">
          <span>예상 가격</span>
          <span>{data.estimatedPrice}</span>

          <span>이벤트 일시</span>
          <span>{data.eventDate}</span>

          <span>모집 기간</span>

          <span className="-my-0.25 flex items-center gap-1">
            {/* {recruitmentStart} - {recruitmentEnd} */}
            {data.recruitmentDate}
            <Badge variant="primary" className="px-1 py-0.25">
              {/* D-3 */}
              {data.d_day}
            </Badge>
          </span>

          <span>모집 인원</span>
          <span>
            {data.minParticipants} - {data.maxParticipants}명
          </span>
        </div>
        <div className="mt-4 mb-6 h-0.25 w-full rounded-sm bg-gray-950" />
        <InformationTab {...data} />
      </div>
    </>
  );
}
