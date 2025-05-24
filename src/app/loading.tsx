"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/lotties/loading.json";

export default function Loading() {
  return (
    <div className="relative flex h-screen w-full justify-center">
      <div
        className="relative inline-flex flex-col"
        style={{ paddingTop: "30vh" }}
      >
        <Lottie animationData={loadingAnimation} loop autoplay />
      </div>
    </div>
  );
}
