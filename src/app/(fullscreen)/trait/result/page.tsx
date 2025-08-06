"use client";

import { Button } from "@/components";
import { LineBreak } from "@/components/line-break";
import { PATH_IMAGES, PATHS } from "@/constants/index";
import { BackIcon, LogoWhiteIcon } from "@/icons/index";
import { useGetUserTypeResult } from "app/_hooks/use-user-type";
import { useUserStore } from "app/_stores/use-user-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { USER_TYPE_ICONS } from "@/constants/user-type-icon";
import { useSearchParams, useRouter } from "next/navigation";

export default function TraitResult() {
  const [isShortScreen, setIsShortScreen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from");

  const isFromMyPage = from === "mypage";

  const handleClick = () => {
    router.push(PATHS.HOME);
  };

  const { data } = useGetUserTypeResult();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user || !data?.title) return;
    if (user.userTypeTitle === data.title) return;
    const cleanedTitle = data.title.replace(/\n/g, " ");
    setUser({ ...user, userTypeTitle: cleanedTitle });
  }, [data?.title, user, setUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsShortScreen(window.innerHeight < 700);
    };

    handleResize();
    const debounced = setTimeout(() => {
      window.addEventListener("resize", handleResize);
    }, 100);

    return () => {
      clearTimeout(debounced);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const iconSet =
    USER_TYPE_ICONS[data?.userTypeCode as keyof typeof USER_TYPE_ICONS] ??
    USER_TYPE_ICONS["MOVIE_DETAIL_COLLECTOR"];

  const imageSrc =
    data?.userTypeCode &&
    PATH_IMAGES.TRAIT[data.userTypeCode as keyof typeof PATH_IMAGES.TRAIT];

  return (
    <div className="bg-gray-black relative grid min-h-screen w-full grid-rows-[auto_1fr_auto] overflow-hidden">
      {isFromMyPage && (
        <div className="absolute top-5 left-5 z-50">
          <button
            onClick={() => router.back()}
            aria-label="뒤로가기"
            type="button"
          >
            <BackIcon className="h-full w-full" />
          </button>
        </div>
      )}

      <div
        className={`flex justify-center ${
          isShortScreen ? "mt-8" : isFromMyPage ? "mt-32" : "mt-20"
        }`}
      >
        <div className="body-3-semibold rounded-full bg-gray-900 px-5 py-2 text-center text-gray-200">
          무비부키 유형 테스트
        </div>
      </div>
      <div className="flex items-start justify-center">
        <div className="relative mt-8 h-[460px] w-[320px] overflow-hidden rounded-[20px] shadow-lg">
          <Image
            src={PATH_IMAGES.TRAIT.BACKGROUND}
            alt="배경 이미지"
            fill
            priority
            className="object-cover"
            sizes="320px"
          />
          <div className="absolute inset-0 z-0 bg-[rgba(255,255,255,0.1)]" />
          <div className="relative z-10 flex h-full flex-col items-center px-6 pt-11">
            <p className="body-2-medium text-red-100">{data?.username}님은</p>
            <p className="title-3-bold text mt-3 text-center whitespace-pre-line text-white">
              <LineBreak text={data?.title} />
            </p>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt="유형 이미지"
                width={100}
                height={100}
                className="mt-5 mb-9"
              />
            )}
            <div
              className="h-[3px] w-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 8px, transparent 8px, transparent 18px)",
              }}
            />
            <div className="mt-6 w-full space-y-4 px-5 leading-relaxed text-gray-100">
              <p className="flex items-start gap-2">
                <span className="text-lg">{iconSet.label}</span>
                <span className="body-3-regular whitespace-pre-line">
                  <LineBreak text={data?.label} />
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg">{iconSet.description}</span>
                <span className="body-3-regular whitespace-pre-line">
                  <LineBreak text={data?.description} />
                </span>
              </p>
            </div>
            <LogoWhiteIcon width={28} height={28} className="mt-auto mb-7" />
          </div>
        </div>
      </div>

      {!isFromMyPage && (
        <div className="fixed bottom-0 z-50 w-full max-w-125 px-5 pt-5 pb-12">
          <Button onClick={handleClick}>무비부키 시작하기</Button>
        </div>
      )}
    </div>
  );
}
