"use client";

import { Carousel } from "@/components";
import { PATH_IMAGES, PATHS } from "@/constants";
import { useUserStore } from "app/_stores/use-user-store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Recommend() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const handleTypeTest = () => {
    router.push(PATHS.TRAIT);
  };
  return (
    <section>
      <button
        type="button"
        aria-label="유형 테스트 버튼"
        className="mt-6 mb-5.5 flex w-full items-center justify-between rounded-xl border border-gray-900 bg-gray-950 text-start"
      >
        <div onClick={handleTypeTest} className="flex flex-col gap-0.75 pl-6">
          <p className="caption-1-medium text-gray-500">
            {user?.nickname ?? "회원"}님은 {user?.userTypeTitle}
          </p>
          <p className="body-2-semibold text-gray-100">유형테스트 다시하기</p>
        </div>
        <Image src={PATH_IMAGES.TYPE_TEST} width={105} height={77} alt="" />
      </button>

      <Carousel />
    </section>
  );
}
