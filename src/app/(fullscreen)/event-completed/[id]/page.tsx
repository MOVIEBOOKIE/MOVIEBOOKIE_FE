"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button, FixedLayout } from "@/components";
import { PATHS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "app/_apis/methods";
import Loading from "app/loading";
import { EventData } from "app/_types/event";

export default function EventCompletedPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = Number(params?.id);

  const { data, isLoading } = useQuery<EventData>({
    queryKey: ["event-detail", eventId],
    queryFn: () => apiGet(`/events/${eventId}`),
    enabled: !!eventId,
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleComplete = () => {
    router.push(`${PATHS.FEEDBACK}?eventId=${eventId}`);
  };

  const handleCancel = () => {
    router.push(PATHS.HOME);
  };

  return (
    <>
      <FixedLayout
        title="이벤트 상영 완료"
        showBackButton
        isHeader
        showBottomButton={false}
        state="default"
      >
        <div className="mt-31 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6 aspect-square w-[200px]">
            <Image
              src={data?.posterImageUrl || "/images/image.png"}
              alt="이벤트 포스터"
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="body-2-semibold text-white">“{data?.mediaTitle}”</div>
          <div className="title-2-semibold mt-1 text-white">
            이벤트 상영은 잘 완료되었나요?
          </div>
        </div>
      </FixedLayout>

      <div className="bg-gray-black fixed bottom-0 z-50 w-full max-w-125 px-5 pt-5 pb-12.5">
        <div className="flex flex-col gap-3">
          <Button className="bg-red-main text-white" onClick={handleComplete}>
            네, 상영이 완료되었어요
          </Button>
          <Button className="bg-gray-800 text-white" onClick={handleCancel}>
            아니요, 상영이 취소되었어요
          </Button>
        </div>
      </div>
    </>
  );
}
