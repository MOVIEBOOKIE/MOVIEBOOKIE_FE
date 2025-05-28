"use client";

import { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { StepHeader } from "@/components";
import { ImageIcon, ImageDeleteIcon } from "@/icons/index";
import PostTextArea from "./post-textarea";
import { useUserStore } from "app/_stores/useUserStore";

export default function Step7() {
  const { register, setValue } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const nickname = useUserStore((state) => state.user?.nickname);
  const displayName = nickname || "회원님";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    setValue("thumbnail", file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setValue("thumbnail", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <StepHeader
        StepHeader="7/7"
        title={
          <>
            {displayName}님, 거의 다 왔어요!
            <br />
            이벤트를 더 자세히 소개해볼까요?
          </>
        }
        description="매력적인 썸네일과 제목, 소개글로 더 많은 사람들을 모아보세요"
      />

      <div className="mt-6 flex flex-col gap-6">
        <div>
          <p className="body-3-medium mb-3 text-gray-300">썸네일 업로드</p>
          <div className="flex items-center gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="caption-1-regular flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border border-gray-900 text-gray-300"
            >
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span className="text-xl">
                  <ImageIcon />
                </span>
                <span>{previewUrl ? "1/1" : "0/1"}</span>
              </div>
            </div>

            {previewUrl && (
              <div className="relative">
                <div className="h-20 w-20 overflow-hidden rounded-lg border border-gray-900">
                  <Image
                    src={previewUrl}
                    alt="썸네일 미리보기"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 z-10 rounded-full"
                  aria-label="이미지 삭제"
                >
                  <ImageDeleteIcon />
                </button>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div>
          <label className="body-3-medium mb-3 block text-gray-300">
            콘텐츠 제목
          </label>
          <input
            {...register("mediaTitle")}
            type="text"
            placeholder="콘텐츠의 제목을 입력해 주세요 (ex 타이타닉)"
            className="body-3-medium w-full rounded-xl border border-gray-900 p-5 text-gray-300 placeholder-gray-800 focus:outline-none"
          />
        </div>

        <div>
          <PostTextArea />
        </div>
      </div>
    </>
  );
}
