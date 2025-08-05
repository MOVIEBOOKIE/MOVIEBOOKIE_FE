import Image from "next/image";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { PopcornIcon } from "@/icons/index";

export default function EmptyCarousel() {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center gap-[-10px]">
      <div className="h-80 w-70.5 scale-90 px-4 opacity-70">
        <div className="h-full w-full rounded-xl bg-[#2A2A2A]" />
      </div>

      <div className="h-93.2 relative z-10 -mx-3 w-65 scale-100 overflow-hidden rounded-xl text-center text-white opacity-100">
        <Image
          src="/images/empty-home.png"
          alt="empty home"
          fill
          className="rounded-xl object-cover"
          priority
        />

        <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10">
          <div className="mt-14 flex flex-col items-center">
            <PopcornIcon className="mb-3 h-11 w-11 rotate-[-15.59deg]" />
            <p className="title-3-bold mb-2 text-center leading-snug">
              아직 추천할 수 있는 <br />
              이벤트가 없어요
            </p>
            <p className="caption-1-medium text-center text-gray-200">
              같이 보고 싶은 콘텐츠가 있다면?
            </p>
          </div>

          <button
            onClick={() => router.push(PATHS.EVENT_CREATE)}
            className="bg-red-main body-3-semibold mt-6 w-full rounded-xl py-3 text-white"
          >
            나만의 이벤트 만들러 가기
          </button>
        </div>
      </div>
      <div className="h-80 w-70.5 scale-90 px-4 opacity-70">
        <div className="h-full w-full rounded-xl bg-[#2A2A2A]" />
      </div>
    </div>
  );
}
