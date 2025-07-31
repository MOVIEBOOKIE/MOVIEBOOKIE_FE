"use client";

import { useState } from "react";
import { FixedLayout, StepHeader } from "@/components";
import Modal from "@/components/modal";
import { WITHDRAW_REASONS } from "@/constants/mypage/my-page";
import { WithDrawCheckIcon } from "@/icons/index";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { apiDelete } from "app/_apis/methods";
import { useToastStore } from "app/_stores/use-toast-store";
export default function WithDraw() {
  const router = useRouter();
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
  };

  const handleWithdraw = async () => {
    try {
      await apiDelete<null>("/auth/delete");
      showToast("정상적으로 탈퇴되었습니다.");
      router.push(PATHS.LOGIN);
    } catch (error: any) {
      if (error.response?.status === 400) {
        setShowBlockedModal(true);
      } else {
        console.error("탈퇴 오류:", error);
        showToast("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <FixedLayout
        title="회원 탈퇴"
        showBackButton
        isHeader
        state="default"
        buttonText="탈퇴하기"
        onButtonClick={() => setShowConfirmModal(true)}
      >
        <StepHeader
          title={<>탈퇴하는 이유를 선택해주세요</>}
          description={
            <>작은 의견도 무비부키에 큰 도움이 돼요 (복수선택 가능)</>
          }
        />

        <ul className="mt-8 mb-10">
          {WITHDRAW_REASONS.map((reason) => {
            const isSelected = selectedReasons.includes(reason);
            return (
              <li
                key={reason}
                className="caption-1-medium flex items-center gap-4.5 py-4"
                onClick={() => toggleReason(reason)}
                role="button"
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-1 ${
                    isSelected
                      ? "bg-red-main border-red-main"
                      : "border-gray-700"
                  }`}
                >
                  {isSelected && <WithDrawCheckIcon />}
                </div>
                <span className="body-3-medium text-gray-200">{reason}</span>
              </li>
            );
          })}
        </ul>
      </FixedLayout>
      {showConfirmModal && (
        <Modal
          iconType="alert"
          title="정말 탈퇴하시겠어요?"
          children={`탈퇴 시 계정 및 이용 기록은 모두 삭제되며,\n삭제된 데이터는 복구할 수 없습니다.`}
          confirmText="탈퇴하기"
          cancelText="취소"
          onConfirm={() => {
            setShowConfirmModal(false);
            handleWithdraw();
          }}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
      {showBlockedModal && (
        <Modal
          iconType="alert"
          title={`현재 진행 중인 이벤트가 있어\n탈퇴할 수 없어요`}
          children={
            <>
              진행 중인 이벤트 목록을 <br />
              모두 취소한 뒤 다시 시도해주세요
            </>
          }
          confirmText="이벤트 목록 바로가기"
          onConfirm={() => {
            setShowBlockedModal(false);
            router.push(PATHS.EVENT);
          }}
          onCancel={undefined}
          confirmButtonClassName="bg-gray-800 active:bg-gray-850 text-gray-200"
        />
      )}
    </>
  );
}
