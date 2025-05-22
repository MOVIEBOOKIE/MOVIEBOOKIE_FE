import { AlertIcon, CheckIcon } from "@/icons/index";
import Button from "./button";
import { ReactNode } from "react";

/**
 * 공통 모달 컴포넌트
 *
 * @param iconType - 아이콘 타입. `"alert"` 또는 `"confirm"` 중 하나를 선택.
 * @param title - 모달의 제목 텍스트
 * @param description - 모달의 설명 또는 본문. ReactNode이므로 텍스트 외 `<span>`, `<br />` 등 추가 가능.
 * @param confirmText - 확인 버튼에 표시될 텍스트.
 * @param cancelText - 취소 버튼에 표시될 텍스트. 기본값: `"아니요"`
 * @param onConfirm - 확인 버튼 클릭 시 실행할 콜백 함수.
 * @param onCancel - 취소 버튼 클릭 시 실행할 콜백 함수.
 */

interface ModalProps {
  iconType: "alert" | "confirm";
  title: string;
  description: ReactNode;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  iconType,
  title,
  description,
  confirmText,
  cancelText = "아니요",
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <div className="drap-shadow flex w-80 flex-col items-center rounded-2xl bg-gray-900 px-5 pt-6 pb-5">
      {iconType === "confirm" ? <CheckIcon /> : <AlertIcon />}
      <h3 className="title-3-semibold mt-4.75">{title}</h3>
      <p className="body-3-regular mt-0.5 mb-4.5 text-gray-500">
        {description}
      </p>
      <div className="flex w-full gap-2.75">
        <Button
          variant="secondary"
          onClick={onCancel}
          className="bg-gray-800 text-gray-200"
        >
          {cancelText}
        </Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    </div>
  );
}
