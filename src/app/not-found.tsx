"use client";

import { useRouter } from "next/navigation";
import { FixedLayout } from "./_components";
import { PATHS } from "./_constants";
import { ErrorIcon } from "../icons";

export default function NotFound() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(PATHS.HOME);
  };
  return (
    <FixedLayout
      showBackButton={false}
      buttonText="홈으로 돌아가기"
      onButtonClick={handleButtonClick}
    >
      <div className="flex min-h-[calc(100vh-230px)] flex-col items-center justify-center gap-6.5 text-center">
        <ErrorIcon />
        <p className="body-1-semibold text-gray-400">
          찾으시는 페이지가 없어요
        </p>
      </div>
    </FixedLayout>
  );
}
