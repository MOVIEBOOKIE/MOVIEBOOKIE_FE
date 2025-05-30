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
  },
  cancel: {
    iconType: "alert",
    title: "이벤트 신청을 취소할까요?",
    description: "지금 취소해도 다시 신청할 수 있어요",
    confirmText: "신청 취소",
    showCloseButton: "false",
  },
  recruitCancel: {
    iconType: "alert",
    title: "정말 이벤트 모집을 취소할까요?",
    description: "지금 취소하면 이벤트가 완전히 삭제돼요",
    confirmText: "모집 취소",
    showCloseButton: "false",
  },
  venueApply: {
    iconType: "confirm",
    showCloseButton: "true",
    title: "대관 신청 여부를 알려주세요",
    description: (
      <>
        지금 취소하면
        <span className="text-gray-300">다시 대관을 진행할 수 없으며</span>
        <br />
        확정 가능 여부는 <span className="text-gray-300">이메일을 통해</span>
        알려드려요
      </>
    ),
    confirmText: "대관 신청",
    cancelText: "대관 취소",
  },
};
