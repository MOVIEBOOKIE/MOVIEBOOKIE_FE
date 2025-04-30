"use client";

import { SwipeDownIcon } from "@/icons";
import Carousel from "./(route)/home/_components/carousel";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center overflow-x-hidden pt-15.75">
      <div className="mb-7 flex flex-col items-center">
        <p className="body-1-medium text-gray-300">못말리는 영화러버</p>
        <h2 className="title-1-bold text-gray-white mt-0.75">
          서현님을 위한 추천
        </h2>
      </div>
      <Carousel />
      <div className="from-gray-black/0 to-gray-black fixed bottom-0 z-10 mb-25.5 flex w-full flex-col items-center gap-1 bg-gradient-to-b from-0% to-50% pt-14.25 pb-3">
        <p className="caption-1-medium">
          더 많은 이벤트를 찾으려면 아래로 스와이프
        </p>
        <SwipeDownIcon className="h-6 w-6" />
      </div>
    </div>
  );
}
