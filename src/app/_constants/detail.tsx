import { ReactNode } from "react";

type ModalContentItem = {
  iconType: "confirm" | "alert";
  title: string;
  description: string | ReactNode;
  confirmText: string;
  cancelText?: string;
  showCloseButton: string;
};

export const MODAL_CONTENT: Record<string, ModalContentItem> = {
  apply: {
    iconType: "confirm",
    title: "이벤트를 신청할까요?",
    description: "이벤트 정보를 자세히 확인한 후 신청해주세요",
    confirmText: "신청하기",
    showCloseButton: "false",
    cancelText: "돌아가기",
  },
  cancel: {
    iconType: "alert",
    title: "이벤트 신청을 취소할까요?",
    description: "지금 취소해도 다시 신청할 수 있어요",
    confirmText: "신청 취소",
    showCloseButton: "false",
    cancelText: "돌아가기",
  },
  recruitCancel: {
    iconType: "alert",
    title: "정말 이벤트 모집을 취소할까요?",
    description: "지금 취소하면 이벤트가 완전히 삭제돼요",
    confirmText: "모집 취소",
    showCloseButton: "false",
    cancelText: "돌아가기",
  },
  venueApply: {
    iconType: "confirm",
    showCloseButton: "true",
    title: "영화관 대관 신청을 진행할까요?",
    description: (
      <>
        진행 가능 여부는 <span className="text-red-main">이메일</span>을 통해
        알려드려요
      </>
    ),
    confirmText: "신청하기",
    cancelText: "돌아가기",
  },
};
