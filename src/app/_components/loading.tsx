"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/lotties/loading.json";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Lottie animationData={loadingAnimation} loop autoplay />
    </div>
  );
}
