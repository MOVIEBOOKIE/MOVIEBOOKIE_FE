import { BackIcon, UploadIcon } from "@/icons/index";
import Image from "next/image";
import React from "react";
import Badge from "./badge";
import InformationTab from "app/(fullscreen)/detail/_components/information-tab";

export default function DetailContent() {
  const percentage = 60;

  return (
    <>
      <div className="relative h-75 w-full">
        <Image
          src="/images/image.png"
          alt="movie poster"
          fill
          className="object-cover"
        />
        <div className="from-gray-black/20 to-gray-black absolute inset-0 z-1 bg-gradient-to-b" />
        <p className="caption-1-medium absolute bottom-0 left-5 z-10 text-gray-500">
          영화 · 신촌 아트레온
        </p>
      </div>
      <div className="mx-5">
        <p className="text-gray-white title-2-semibold mt-1">
          더 폴: 오디어스와 환상의 문
        </p>
        <div className="mt-3.5 flex justify-between">
          <p className="body-3-medium text-gray-500">모집 달성률</p>
          <p className="body-2-semibold text-red-main">{percentage}%</p>
        </div>
        <div className="mt-2.5 h-1 w-full rounded-[10px] bg-gray-800">
          <div
            className="bg-red-main h-1 rounded-[10px]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-8.5 flex flex-col gap-3">
          <div className="flex gap-2">
            <Image
              src="/images/image.png"
              alt="profile"
              width={34}
              height={34}
              className="h-8.5 w-8.5 rounded-full object-cover"
            />
            <div className="flex flex-col gap-0.5">
              <p className="body-3-medium text-gray-200">닉네임</p>
              <p className="caption-1-regular text-gray-500">
                단관 경험 00회 (상세정보)
              </p>
            </div>
          </div>
          <p className="body-2-medium text-gray-300">
            더 폴은 진짜 정말 명작입니다!
          </p>
          <p className="body-3-medium text-gray-600">
            이번에 영화 단체 관람 같이 보러 갈 사람 구해요! 영화 진짜 재밌고
            같이 보면 훨씬 더 웃기고 몰입감도 두 배임ㅋㅋ 혼자 보기 아까운
            작품이라 같이 보면 좋을 것 같아서요 :) 같이 가고 싶은 사람 편하게
            신청해줘요~!
          </p>
        </div>
        <div className="caption-1-regular mt-8 grid grid-cols-[74px_1fr] gap-y-2 rounded-xl bg-gray-950 px-5 pt-5 pb-6 text-gray-300">
          <span>예상 가격</span>
          <span>24,000원</span>

          <span>이벤트 일시</span>
          <span>2025. 05. 26 (월)</span>

          <span>모집 기간</span>

          <span className="-my-0.25 flex items-center gap-1">
            2025. 04. 15 - 2025. 04. 20
            <Badge variant="primary" className="px-1 py-0.25">
              D-3
            </Badge>
          </span>

          <span>모집 인원</span>
          <span>20 - 56명</span>
        </div>
        <div className="mt-4 mb-6 h-0.25 w-full rounded-sm bg-gray-950" />
        <InformationTab />
      </div>
    </>
  );
}
