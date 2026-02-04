"use client";

import { PopcornIcon } from "@/icons/index";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import Image from "next/image";

export default function EventBannerSection() {
  const router = useRouter();

  return (
    <section
      className="relative mx-5 overflow-hidden rounded-3xl"
      style={{ height: 254 }}
    >
      <Image
        src="/images/event-banner.webp"
        alt="이벤트 배너"
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 600px"
      />
      <div className="relative z-10 flex flex-col items-center px-5 py-8 text-center text-white">
        <PopcornIcon className="mb-3 h-11 w-11 rotate-[-15.59deg]" />
        <p className="title-3-semibold leading-snug">
          지금, 같이 보고 싶은 <br /> 콘텐츠가 있다면?
        </p>
        <button
          type="button"
          onClick={() => router.push(PATHS.EVENT_CREATE)}
          className="bg-red-main body-3-semibold mt-5 rounded-xl px-6 py-3 text-white focus:bg-red-700"
        >
          나만의 이벤트 만들러 가기
        </button>
      </div>
    </section>
  );
}
