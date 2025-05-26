"use client";

import { Button } from "@/components";
import TopBar from "../_components/top-bar";
import DetailContent from "@/components/detail-content";
import { useParams } from "next/navigation";
import {
  useDeleteEvent,
  useDeleteEventsRecruit,
  useGetEvent,
  usePostEventRegister,
} from "app/_hooks/events/use-events";
import { useState } from "react";
import Modal from "@/components/modal";
import Complete from "@/components/complete";
import { MODAL_CONTENT } from "app/(fullscreen)/detail/_constants/detail";

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

  const currentModal = modalType ? MODAL_CONTENT[modalType] : null;

  const { mutate } = usePostEventRegister();
  const { mutate: applyCancel } = useDeleteEvent();
  const { mutate: recruitCancel } = useDeleteEventsRecruit();

  const handleApply = () => {
    setIsComplete(true);
    mutate(eventId);
  };

  const handleCancel = () => {
    applyCancel(eventId);
  };

  const handleRecruitCancel = () => {
    recruitCancel(eventId);
  };

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
        <Button
          variant="primary"
          onClick={handleClick}
          disabled={data?.eventState === "모집 취소"}
        >
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
