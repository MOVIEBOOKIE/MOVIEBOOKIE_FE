"use client";

import { Carousel } from "@/components";
import { PATH_IMAGES, PATHS } from "@/constants";
import EmptyCarousel from "app/(tabs)/home/_components/empty-carousel";
import { useHomeEvents } from "app/_hooks/events/use-home-events";
import { useUserStore } from "app/_stores/use-user-store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Recommend() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { data: events, isFetched, isLoading } = useHomeEvents();

  const handleTypeTest = () => {
    router.push(PATHS.TRAIT);
  };

  const hasUserType = Boolean(user?.userTypeTitle);
  const hasEvents = (events?.length ?? 0) > 0;

  const emptyType = !hasUserType ? "userType" : !hasEvents ? "event" : null;

  if (!isFetched && isLoading) return null;

  return (
    <section>
      {emptyType ? (
        <EmptyCarousel type={emptyType} />
      ) : (
        <>
          <button
            type="button"
            aria-label="유형 테스트 버튼"
            onClick={handleTypeTest}
            className="mt-6 mb-5.5 flex w-full items-center justify-between rounded-xl border border-gray-900 bg-gray-950 text-start"
          >
            <div className="flex flex-col gap-0.75 pl-6">
              <p className="caption-1-medium text-gray-500">
                {user?.nickname}님은 {user?.userTypeTitle}
              </p>
              <p className="body-2-semibold text-gray-100">
                유형 테스트 다시하기
              </p>
            </div>
            <Image src={PATH_IMAGES.TYPE_TEST} width={105} height={77} alt="" />
          </button>
          <Carousel events={events ?? []} />
        </>
      )}
    </section>
  );
}
