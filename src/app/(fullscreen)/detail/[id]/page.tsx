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
  usePostEventsVenue,
} from "app/_hooks/events/use-events";
import { useState } from "react";
import Modal from "@/components/modal";
import Complete from "@/components/complete";
import { MODAL_CONTENT } from "app/(fullscreen)/detail/_constants/detail";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { useGetToTicket } from "app/_hooks/ticket/use-ticket";

type ModalType = "apply" | "cancel" | "recruitCancel" | "venueApply" | null;

export default function Detail() {
  const router = useRouter();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isComplete, setIsComplete] = useState(false);
  const params = useParams();
  const id = params?.id;
  const eventId = Number(id);

  const { data } = useGetEvent(eventId);
  const { data: moveToTicket } = useGetToTicket(eventId);

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
      case "티켓으로 이동":
        if (moveToTicket?.ticketId) {
          router.push(`${PATHS.TICKET}?id=${moveToTicket.ticketId}`);
        }

        break;
      case "대관 신청하기":
        setModalType("venueApply");
        break;
    }
  };

  const currentModal = modalType ? MODAL_CONTENT[modalType] : null;

  const { mutate } = usePostEventRegister();
  const { mutate: applyCancel } = useDeleteEvent();
  const { mutate: recruitCancel } = useDeleteEventsRecruit();
  const { mutate: postEventVenue } = usePostEventsVenue();

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

  const handleVenueApply = () => {
    postEventVenue({ eventId, type: 0 });
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
          disabled={
            data?.eventState === "모집 취소" ||
            (data?.eventState === "모집 완료" && data?.userRole != "주최자") ||
            data?.eventState === "대관 취소"
          }
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
            if (modalType === "venueApply") handleVenueApply();
            setModalType(null);
          }}
          onCancel={() => setModalType(null)}
        />
      )}
    </>
  );
}
