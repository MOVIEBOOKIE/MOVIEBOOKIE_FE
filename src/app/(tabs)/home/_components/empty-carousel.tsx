import Image from "next/image";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import {
  BallIcon,
  CamcorderIcon,
  PopcornIcon,
  TelevisionIcon,
  SmileIcon,
} from "@/icons/index";
import { Button } from "@/components";

export interface EmptyCarouselProps {
  type: "userType" | "event";
}

const CONTENT = {
  event: {
    title: (
      <>
        아직 추천할 수 있는
        <br />
        이벤트가 없어요
      </>
    ),
    subtitle: "같이 보고 싶은 콘텐츠가 있다면?",
    cta: { label: "나만의 이벤트 만들러 가기", href: PATHS.EVENT_CREATE },
    showBgImage: true,
  },
  userType: {
    title: (
      <>
        내 취향의 이벤트를
        <br />
        추천 받아 보세요
      </>
    ),
    subtitle: "간단한 테스트 후 유형을 알아봐요",
    cta: { label: "내 유형 테스트 하러 가기", href: PATHS.TRAIT },
    showBgImage: false,
  },
} as const;

export default function EmptyCarousel({ type }: EmptyCarouselProps) {
  const router = useRouter();
  const content = CONTENT[type];

  return (
    <div className="relative flex w-full items-center justify-center gap-3.75 overflow-x-hidden">
      <div className="relative h-90 w-15 shrink-0 overflow-hidden rounded-xl bg-gray-950" />

      <div className="relative z-10 h-113.5 w-70.5 shrink-0 overflow-hidden rounded-xl bg-gray-900 shadow-xl">
        {content.showBgImage && (
          <Image
            src="/images/empty-home.png"
            alt=""
            fill
            className="rounded-xl object-cover"
          />
        )}

        <div className="absolute inset-0 flex flex-col justify-between px-5 pb-7 text-white">
          <div className="flex flex-col items-center">
            {type === "event" && (
              <PopcornIcon
                aria-hidden="true"
                focusable="false"
                className="mt-26 mb-3 h-14.5 w-14.5 rotate-[-15deg]"
              />
            )}

            {type === "userType" && (
              <>
                <div
                  className="pointer-events-none absolute left-1/2 h-full w-93.75 -translate-x-1/2"
                  aria-hidden="true"
                >
                  <TelevisionIcon className="absolute top-15 left-27.5 h-12 w-12 rotate-13" />
                  <SmileIcon className="absolute top-17.5 left-53 h-12 w-12" />
                  <PopcornIcon className="absolute top-34.5 left-23 h-12 w-12 -rotate-15" />
                  <BallIcon className="absolute top-29 left-41 h-12 w-12" />
                  <CamcorderIcon className="absolute top-36 left-56.5 h-12 w-12" />
                </div>
                <div className="h-52" />
              </>
            )}

            <p className="title-3-bold mt-7 text-center leading-snug">
              {content.title}
            </p>
            <p className="caption-1-medium mt-4 text-gray-200">
              {content.subtitle}
            </p>
          </div>
          <Button
            variant="primary"
            className="body-3-semibold py-3"
            onClick={() => router.push(content.cta.href)}
          >
            {content.cta.label}
          </Button>
        </div>
      </div>

      <div className="relative h-90 w-15 shrink-0 overflow-hidden rounded-xl bg-gray-950" />
    </div>
  );
}
