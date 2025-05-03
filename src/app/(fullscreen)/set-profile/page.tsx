"use client";

import { Button } from "@/components";
import Image from "next/image";
import Header from "@/components/header";

export default function VerifyFlow() {
  return (
    <div className="flex min-h-screen flex-col px-5 pt-11 text-white">
      <Header
        title="프로필 설정"
        showBackButton
        // onBack={() => setStepIndex((i) => i - 1)}
        // showCloseButton
        // onClose={() => router.push("/")}
      />

      <>
        <p className="body-1-semibold mt-9.25 text-gray-400">3/3</p>
        <h2 className="title-3-semibold mt-1.5">
          무비부키에서 사용할 <br />
          프로필을 확인해 주세요
        </h2>
        <p className="caption-1-medium mt-1.5 text-gray-500">
          입력한 전화번호, 이메일 정보와 <br />
          카톡 프로필 사진, 닉네임을 최종 확인해주세요
        </p>

        <div className="mt-13">
          <div className="mt-12 flex flex-col items-center">
            <div className="border-red-main gap-2 rounded-full border-2">
              <div className="h-30 w-30 overflow-hidden rounded-full bg-gray-800">
                <Image
                  src="/images/default-profile.png"
                  alt="프로필 이미지"
                  width={128}
                  height={128}
                />
              </div>
            </div>

            <div className="title-3-semibold mt-3 text-gray-200">카톡이름</div>
            <div className="caption-1-medium mt-1 text-gray-500">
              @@gmail.com
            </div>
            <div className="caption-1-medium mt-1 text-gray-500">
              010-1535-354
            </div>
          </div>
        </div>

        <div className="mt-auto mb-19">
          <Button
            //   onClick={() => onNext(emailId)}
            className="bg-red-main text-white"
          >
            확인했어요
          </Button>
        </div>
      </>
    </div>
  );
}
