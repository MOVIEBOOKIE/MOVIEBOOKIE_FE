"use client";

import { Button, Header, StepHeader } from "@/components";
import { DefaultProfileIcon } from "@/icons/index";

export default function VerifyFlow() {
  const handleProfileConfirmation = () => {
    // router.push('/유형테스트');
  };
  return (
    <div className="flex min-h-screen flex-col px-5 pt-11 text-white">
      <Header title="프로필 설정" />

      <>
        <StepHeader
          StepHeader="3/3"
          title={
            <>
              무비부키에서 사용할 <br />
              프로필을 확인해 주세요
            </>
          }
          description={
            <>
              입력한 전화번호, 이메일 정보와 <br />
              카톡 프로필 사진, 닉네임을 최종 확인해주세요
            </>
          }
        />

        <div className="mt-18">
          <div className="flex flex-col items-center">
            <div className="border-red-main flex h-31.75 w-31.75 items-center justify-center rounded-full border-2">
              <DefaultProfileIcon className="h-28 w-28 rounded-full" />
            </div>

            <div className="title-3-semibold mt-4 text-gray-200">카톡이름</div>
            <div className="caption-1-medium mt-1 text-gray-500">
              moviebookie@gmail.com
            </div>
            <div className="caption-1-medium mt-1 text-gray-500">
              010-1535-354
            </div>
          </div>
        </div>

        <div className="mt-auto mb-19">
          <Button
            className="bg-red-main text-white"
            onClick={handleProfileConfirmation}
          >
            확인했어요
          </Button>
        </div>
      </>
    </div>
  );
}
