"use client";

import { useState } from "react";
import { FixedLayout, StepHeader } from "@/components";
import Modal from "@/components/modal";
import { WITHDRAW_REASONS } from "@/constants/mypage/my-page";
import { WithDrawCheckIcon } from "@/icons/index";

export default function WithDraw() {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
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

        <ul className="mt-8 mb-10 space-y-3">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Modal
            iconType="alert"
            title="정말 탈퇴하시겠어요?"
            description={`탈퇴 시 계정 및 이용 기록은 모두 삭제되며,\n삭제된 데이터는 복구할 수 없습니다.`}
            confirmText="탈퇴하기"
            cancelText="취소"
            onConfirm={() => {
              setShowConfirmModal(false);
            }}
            onCancel={() => setShowConfirmModal(false)}
          />
        </div>
      )}
    </>
  );
}
