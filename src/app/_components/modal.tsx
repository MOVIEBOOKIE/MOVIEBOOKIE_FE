import { AlertIcon, CheckIcon, CloseIcon } from "@/icons/index";
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
 * @param onClose - x 버튼 클릭 시 실행할 콜백 함수.
 */

interface ModalProps {
  iconType?: "alert" | "confirm" | "";
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCloseButton?: boolean;
  hideButtons?: boolean;
  children: ReactNode;
  onClose?: () => void;
  ButtonClassName?: string;
}

export default function Modal({
  iconType,
  title,
  children,
  description,
  confirmText,
  cancelText = "아니요",
  onConfirm,
  onCancel,
  onClose,
  showCloseButton = false,
  hideButtons = false,
  ButtonClassName,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="drap-shadow relative flex w-80 flex-col items-center rounded-2xl bg-gray-900 px-5 pt-6 pb-5">
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 text-gray-100"
          >
            <CloseIcon />
          </button>
        )}

        {iconType === "confirm" && <CheckIcon />}
        {iconType === "alert" && <AlertIcon />}

        <h3 className="title-3-semibold mt-4.75 text-center whitespace-pre-line">
          {title}
        </h3>
        <div className="body-3-regular mt-1 mb-4.5 text-center whitespace-pre-line text-gray-500">
          {description ?? children}
        </div>
        {!hideButtons && (
          <div className="flex w-full gap-2.5">
            {onConfirm && (
              <Button
                onClick={onConfirm}
                className="active:bg-gray-850 bg-gray-800 text-gray-200"
              >
                {confirmText}
              </Button>
            )}
            {onCancel && (
              <Button
                variant="secondary"
                onClick={onCancel}
                className={
                  ButtonClassName ||
                  "bg-red-main text-gray-200 hover:bg-red-600 focus:bg-red-700 active:bg-red-700"
                }
              >
                {cancelText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
