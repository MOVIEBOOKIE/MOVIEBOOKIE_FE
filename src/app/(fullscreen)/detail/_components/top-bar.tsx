"use client";

import { BackIcon, UploadIcon } from "@/icons/index";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleShare = () => {
    //TODO: 공유 기능 추가
  };
  return (
    <div className="fixed z-10 mx-auto w-full max-w-125">
      <button
        type="button"
        className="absolute top-2.5 left-5 h-9.5 w-9.5 rounded-full bg-gray-950"
        aria-label="Back"
        onClick={handleBack}
      >
        <BackIcon />
      </button>
      <button
        type="button"
        className="absolute top-2.5 right-5 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-950"
        aria-label="Upload"
        onClick={handleShare}
      >
        <UploadIcon />
      </button>
    </div>
  );
}
