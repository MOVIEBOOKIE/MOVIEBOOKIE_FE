"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/lotties/loading.json";

type LoadingProps = {
  fixed?: boolean; // 패딩 없는 스타일을 원할 때 사용
};

export default function Loading({ fixed = false }: LoadingProps) {
  return (
    <div
      className={`relative flex w-full justify-center ${
        fixed ? "h-full" : "h-screen"
      }`}
    >
      <div
        className="relative inline-flex flex-col items-center"
        style={fixed ? {} : { paddingTop: "30vh" }}
      >
        <Lottie animationData={loadingAnimation} loop autoplay />
        <p className="body-1-medium z-1 -mt-15.5 text-center text-gray-200">
          무비부키가 열심히
          <br /> 정보를 가져오고 있어요
        </p>
      </div>
    </div>
  );
}
