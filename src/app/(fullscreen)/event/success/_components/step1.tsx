import { PATH_IMAGES } from "@/constants";
import Image from "next/image";

export default function Step1() {
  return (
    <>
      <div
        className="relative flex w-full justify-center"
        style={{ aspectRatio: "375 / 302" }}
      >
        <div className="from-gray-black/0 absolute inset-0 z-10 bg-gradient-to-b to-black/100" />
        <div className="to-70.53% absolute inset-0 z-10 bg-gradient-to-b from-black from-0% to-black/0" />
        <Image
          src={PATH_IMAGES.IMAGE}
          alt="movie-poster"
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-11.75 flex w-full flex-col justify-center gap-2">
        <p className="text-gray-white title-1-bold text-center">
          미리보기를 통해
          <br />
          이벤트를 확인해 보아요!
        </p>
        <p className="caption-1-regular text-red-main text-center">
          생성한 이벤트는 수정이 불가능해요
          <br />
          <span className="text-gray-500">
            지금 만든 이벤트를 다시 한번 점검해 주세요!
          </span>
        </p>
      </div>
    </>
  );
}
