"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Badge from "./badge";
import InformationTab from "app/(fullscreen)/detail/_components/information-tab";
import EventStatus from "app/(fullscreen)/detail/_components/event-status";
import { textUp } from "@/utils/text-motion";

export default function DetailContent({ ...props }) {
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

  const userProfile = props.userImageUrl || props.profileImage;

  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };

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
        <p className="body-3-medium absolute bottom-0 z-10 pl-5 text-gray-200">
          {props.mediaType || "영화"} · {props.locationName || "상상스위트"}
        </p>
      </div>

      <motion.div
        className="px-5"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={textUp}
          className="text-gray-white title-2-bold mt-1"
        >
          {props.mediaTitle || "작품 제목"}
        </motion.p>

        <motion.div variants={textUp}>
          <EventStatus
            eventState={props.eventState}
            recruitmentRate={props.recruitmentRate}
          />
        </motion.div>

        <motion.div
          variants={textUp}
          className={
            (props.eventState === "모집 취소" ||
            props.eventState === "대관 취소"
              ? "opacity-30 "
              : "") + "mt-5 rounded-xl bg-gray-950 p-5"
          }
        >
          <div className="flex gap-2">
            {userProfile && (
              <Image
                src={userProfile}
                alt="profile"
                width={34}
                height={34}
                className="h-8.5 w-8.5 rounded-full object-cover"
              />
            )}

            <div className="flex flex-col gap-0.5">
              <p className="body-3-medium text-gray-200">
                {props.username || props.nickname || "회원"}
              </p>
              <p className="caption-1-regular text-gray-500">
                단관 경험 {props.recruitment ?? "0"}회
              </p>
            </div>
          </div>
          <p className="body-1-semibold mt-3 text-gray-200">
            {props.eventTitle || "이벤트 제목"}
          </p>
          <p className="body-3-regular mt-2 text-gray-400">
            {props.description || "이벤트 설명"}
          </p>

          <motion.div
            variants={fade}
            className="my-4 h-0.5 rounded-sm bg-gray-900"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />

          <div className="body-3-medium grid grid-cols-[81px_1fr] gap-y-2 rounded-xl text-gray-300">
            <span className="text-gray-600">예상 가격</span>
            <span>{props.estimatedPrice?.toLocaleString() ?? "-"}원</span>

            <span className="text-gray-600">이벤트 일시</span>
            <span>{props.eventDate || "2025. 05. 30 (금)"}</span>

            <span className="text-gray-600">모집 기간</span>
            <span className="-my-0.25 flex items-center gap-1.5">
              {recruitmentDate || "2025. 04. 28 - 2025. 05. 09"}
              {props.d_day && (
                <Badge variant="primary" className="round-sm px-1 py-0.25">
                  {props.d_day}
                </Badge>
              )}
            </span>

            <span className="text-gray-600">모집 인원</span>
            <span>
              {props.minParticipants ?? "0"} - {props.maxParticipants ?? "0"}명
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={textUp}
          className="mt-4 mb-6 h-1.5 w-full bg-gray-950"
        />

        <motion.div variants={textUp}>
          <InformationTab
            {...props}
            recruitmentDate={recruitmentDate}
            eventTime={eventTime}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
