"use client";

import { Button } from "@/components";
import TopBar from "../_components/top-bar";
import DetailContent from "@/components/detail-content";
import { useGetEvent } from "app/_hooks/use-event";
import { useParams } from "next/navigation";

export default function Detail() {
  const params = useParams();
  const id = params?.id;
  const price = 24000;

  const eventId = Number(id);

  const { data } = useGetEvent(eventId);

  console.log(data);
  return (
    <>
      <TopBar />
      {data && <DetailContent {...data} />}
      <div className="bg-gray-black fixed bottom-0 flex w-full max-w-125 gap-9.5 px-5 pt-4.25 pb-10.75">
        <div className="flex flex-col justify-center">
          <p className="caption-1-medium text-gray-500">예상 가격</p>
          <p className="body-3-semibold whitespace-nowrap text-gray-300">
            {price.toLocaleString()}원
          </p>
        </div>
        <Button variant="primary">신청하기</Button>
      </div>
    </>
  );
}
