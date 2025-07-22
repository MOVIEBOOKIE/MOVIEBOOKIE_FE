"use client";

import { Button } from "@/components";
import { LineBreak } from "@/components/line-break";
import { PATH_IMAGES, PATHS } from "@/constants/index";
import { LogoWhiteIcon } from "@/icons/index";
import { useGetUserTypeResult } from "app/_hooks/use-user-type";
import { useUserStore } from "app/_stores/use-user-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { USER_TYPE_ICONS } from "@/constants/user-type-icon";

export default function TraitResult() {
  const [isShortScreen, setIsShortScreen] = useState(false); // ← 초기값 false
  const router = useRouter();

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
  }, [data?.title, user?.userTypeTitle, setUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsShortScreen(window.innerHeight < 700);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const iconSet =
    USER_TYPE_ICONS[data?.userTypeCode as keyof typeof USER_TYPE_ICONS] ??
    USER_TYPE_ICONS["MOVIE_DETAIL_COLLECTOR"];

  const imageSrc =
    data?.userTypeCode &&
    PATH_IMAGES.TRAIT[data.userTypeCode as keyof typeof PATH_IMAGES.TRAIT];

  return (
    <div className="relative grid min-h-screen w-full grid-rows-[auto_1fr_auto] overflow-hidden bg-black">
      <div
        className={`flex justify-center ${isShortScreen ? "mt-8" : "mt-20"}`}
      >
        <div className="rounded-full bg-gray-900 px-5 py-1.5 text-gray-200">
          무비부키 유형 테스트
        </div>
      </div>
      <div className="flex items-start justify-center">
        <div
          className="relative mt-8 h-[460px] w-[320px] overflow-hidden rounded-[20px] bg-cover bg-center shadow-lg"
          style={{
            backgroundImage: `url(${PATH_IMAGES.TRAIT.BACKGROUND})`,
          }}
        >
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

      <div className="fixed bottom-0 z-50 w-full max-w-125 px-5 pt-5 pb-12">
        <Button onClick={handleClick}>무비부키 시작하기</Button>
      </div>
    </div>
  );
}
