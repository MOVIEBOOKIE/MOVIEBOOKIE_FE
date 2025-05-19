"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/lotties/loading.json";

export default function Loading() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <Lottie animationData={loadingAnimation} loop autoplay />
      <p className="body-1-medium absolute bottom-3 text-center text-gray-200">
        무비부키가 열심히
        <br /> 정보를 가져오고 있어요
      </p>
    </div>
  );
}
