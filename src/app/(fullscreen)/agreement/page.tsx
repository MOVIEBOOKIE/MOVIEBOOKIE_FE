"use client";

import { useRouter } from "next/navigation";
import { Fixedlayout, StepHeader } from "@/components";
import { BellIcon, MailIcon, PhoneIcon } from "@/icons/index";
import Item from "./components/item";

export default function PhoneStep() {
  const router = useRouter();
  return (
    <Fixedlayout
      title="동의"
      buttonText="동의하고 계속하기"
      showBackButton={false}
      onButtonClick={() => {
        router.push(`/verify/verify-n`);
      }}
    >
      <StepHeader
        title={
          <>
            서비스 이용을 위해 <br />
            약관에 동의해 주세요
          </>
        }
        description={<>원활한 운영과 서비스 제공을 위해 정보가 필요해요</>}
      />

      <div className="mt-13 mb-19">
        <div className="mt-8 space-y-4">
          <Item
            icon={<PhoneIcon />}
            title="전화번호 제공 동의"
            description="주최자와 편하게 소통할 때 필요해요"
          />
          <Item
            icon={<MailIcon />}
            title="이메일 제공 및 수신 동의"
            description="대관 확정 여부와 참여자 리스트 같은 중요한 사항을 메일로 보내드릴게요"
          />
          <Item
            icon={<BellIcon />}
            title="알림 수신 동의"
            description="모집 현황이나 대관 진행 소식을 푸시와 앱 알림으로 알려드릴게요"
          />
        </div>
      </div>
    </Fixedlayout>
  );
}
