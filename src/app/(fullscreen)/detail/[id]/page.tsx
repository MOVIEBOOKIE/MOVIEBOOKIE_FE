"use client";

import { Button } from "@/components";
import TopBar from "../_components/top-bar";
import DetailContent from "@/components/detail-content";
import { useParams } from "next/navigation";
import {
  useDeleteEvent,
  useGetEvent,
  usePostEventRegister,
} from "app/_hooks/events/use-events";
import { useState } from "react";
import Modal from "@/components/modal";
import Complete from "@/components/complete";

type ModalType = "apply" | "cancel" | "recruitCancel" | null;

export default function Detail() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isComplete, setIsComplete] = useState(false);
  const params = useParams();
  const id = params?.id;
  const eventId = Number(id);

  const { data } = useGetEvent(eventId);

  const handleClick = () => {
    switch (data?.buttonState) {
      case "신청하기":
        setModalType("apply");
        break;
      case "신청 취소":
        setModalType("cancel");
        break;
      case "모집 취소":
        setModalType("recruitCancel");
        break;
    }
  };

  const modalContent = {
    apply: {
      iconType: "confirm",
      title: "이벤트를 신청할까요?",
      description: "이벤트 정보를 자세히 확인한 후 신청해주세요",
      confirmText: "신청하기",
    },
    cancel: {
      iconType: "alert",
      title: "이벤트 신청을 취소할까요?",
      description: "지금 취소해도 다시 신청할 수 있어요",
      confirmText: "신청 취소",
    },
    recruitCancel: {
      iconType: "alert",
      title: "정말 이벤트 모집을 취소할까요?",
      description: "지금 취소하면 이벤트가 완전히 삭제돼요",
      confirmText: "모집 취소",
    },
  };

  const currentModal = modalType ? modalContent[modalType] : null;

  const { mutate } = usePostEventRegister();
  const { mutate: recruitCancel } = useDeleteEvent();

  const handleApply = () => {
    setIsComplete(true);
    mutate(eventId);
  };

  const handleCancel = () => {
    recruitCancel(eventId);
  };

  const handleRecruitCancel = () => {};

  const handleComplete = () => {
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <Complete
        state="이벤트 신청"
        buttonText="신청목록 확인하기"
        onButtonClick={handleComplete}
      />
    );
  }

  return (
    <>
      <TopBar />
      {data && <DetailContent {...data} />}
      <div className="bg-gray-black fixed bottom-0 flex w-full max-w-125 gap-9.5 px-5 pt-4.25 pb-10.75">
        <div className="flex flex-col justify-center">
          <p className="caption-1-medium text-gray-500">예상 가격</p>
          {data && (
            <p className="body-3-semibold whitespace-nowrap text-gray-300">
              {data.estimatedPrice.toLocaleString()}원
            </p>
          )}
        </div>
        <Button variant="primary" onClick={handleClick}>
          {data?.buttonState}
        </Button>
      </div>

      {currentModal && (
        <Modal
          iconType={currentModal.iconType as "confirm" | "alert"}
          title={currentModal.title}
          description={currentModal.description}
          confirmText={currentModal.confirmText}
          onConfirm={() => {
            if (modalType === "apply") handleApply();
            if (modalType === "cancel") handleCancel();
            if (modalType === "recruitCancel") handleRecruitCancel();
            setModalType(null);
          }}
          onCancel={() => setModalType(null)}
        />
      )}
    </>
  );
}
