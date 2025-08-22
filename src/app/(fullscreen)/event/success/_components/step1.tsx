"use client";

import { useEventFormStore } from "app/_stores/use-event-create-form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { textUp } from "@/utils/text-motion";

export default function Step1() {
  const { formData } = useEventFormStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!formData.thumbnail) return;
    const url = URL.createObjectURL(formData.thumbnail);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [formData.thumbnail]);

  const textParent = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  return (
    <>
      <div
        className="relative mt-11.5 flex w-full justify-center overflow-hidden rounded-xl"
        style={{ aspectRatio: "375 / 302" }}
      >
        <div className="from-gray-black/0 to-gray-black absolute inset-0 z-10 bg-gradient-to-b" />
        <div className="to-70.53% from-gray-black absolute inset-0 z-10 bg-gradient-to-b from-0% to-black/0" />
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="movie-poster"
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <motion.div
        className="mt-11.75 flex w-full flex-col justify-center gap-2"
        variants={textParent}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={textUp}
          className="text-gray-white title-1-bold text-center"
        >
          미리보기를 통해
          <br />
          이벤트를 확인해 보아요!
        </motion.p>

        <motion.p
          variants={textUp}
          className="caption-1-medium text-center text-red-600"
        >
          생성한 이벤트는 수정이 불가능해요
          <br />
          <span className="text-red-600">
            지금 만든 이벤트를 다시 한번 점검해 주세요!
          </span>
        </motion.p>
      </motion.div>
    </>
  );
}
