import Image from "next/image";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { PopcornIcon } from "@/icons/index";

export default function EmptyCarousel() {
  const router = useRouter();

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-x-hidden"
      style={{ maxWidth: "100%" }}
    >
      <div className="relative h-[320px] w-[60px] flex-shrink-0 overflow-hidden">
        <div className="absolute top-0 right-[-6px] h-full w-[260px] scale-[0.88] rounded-xl bg-[#1E1E1E] opacity-50" />
      </div>

      <div className="relative z-10 h-[404px] w-[282px] flex-shrink-0 overflow-hidden rounded-xl shadow-xl">
        <Image
          src="/images/empty-home.png"
          alt="empty home"
          fill
          className="rounded-xl object-cover opacity-85"
          priority
        />

        <div className="absolute inset-0 flex flex-col justify-between px-6 py-10 text-white">
          <div className="mt-12 flex flex-col items-center">
            <PopcornIcon className="mb-3 h-11 w-11 rotate-[-15deg]" />
            <p className="title-3-bold text-center leading-snug">
              아직 추천할 수 있는 <br />
              이벤트가 없어요
            </p>
            <p className="caption-1-medium mt-1 text-gray-200">
              같이 보고 싶은 콘텐츠가 있다면?
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push(PATHS.EVENT_CREATE)}
            className="bg-red-main body-3-semibold mt-5 w-full rounded-xl px-6 py-3"
          >
            나만의 이벤트 만들러 가기
          </button>
        </div>
      </div>

      <div className="relative h-[320px] w-[60px] flex-shrink-0 overflow-hidden">
        <div className="absolute top-0 left-[-6px] h-full w-[260px] scale-[0.88] rounded-xl bg-[#1E1E1E] opacity-50" />
      </div>
    </div>
  );
}
