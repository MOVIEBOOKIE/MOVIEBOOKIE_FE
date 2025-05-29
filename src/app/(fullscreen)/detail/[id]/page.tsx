"use client";

import { Button } from "@/components";
import TopBar from "../_components/top-bar";
import DetailContent from "@/components/detail-content";
import { useParams, useRouter } from "next/navigation";
import {
  useDeleteEvent,
  useDeleteEventsRecruit,
  useGetEvent,
  usePostEventRegister,
  usePostEventsVenue,
} from "app/_hooks/events/use-events";
import { useState, useEffect } from "react";
import Modal from "@/components/modal";
import Complete from "@/components/complete";
import { MODAL_CONTENT } from "@/constants/detail";
import { PATHS } from "@/constants";
import { useGetToTicket } from "app/_hooks/ticket/use-ticket";
import { useGetAnonymousEvent } from "app/_hooks/use-anonymous-events";
import { EventData } from "app/_types/event";
import { useUserStore } from "app/_stores/use-user-store";

type ModalType =
  | "apply"
  | "cancel"
  | "recruitCancel"
  | "venueApply"
  | "loginRequired"
  | null;

const LOGIN_REQUIRED_MODAL = {
  iconType: "alert" as const,
  title: "이벤트 신청은 로그인 후에 가능해요",
  description: "지금 바로 로그인하고 신청해보세요",
  confirmText: "로그인하기",
  cancelText: "취소",
};

export default function Detail() {
  const router = useRouter();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const params = useParams();
  const id = params?.id;
  const eventId = Number(id);
  const user = useUserStore((state) => state.user);
  const loggedIn = !!user;

  const { data: dataWithAuth, isPending: isPendingWithAuth } = useGetEvent(
    eventId,
    {
      enabled: !!user && !!eventId,
    },
  );

  const { data: dataAnonymousRaw, isPending: isPendingAnonymous } =
    useGetAnonymousEvent(eventId, {
      enabled: !user && !!eventId,
    });

  const data = (loggedIn ? dataWithAuth : dataAnonymousRaw) as
    | EventData
    | undefined;

  const isPending = loggedIn ? isPendingWithAuth : isPendingAnonymous;

  const { data: moveToTicket } = useGetToTicket(eventId);

  const handleClick = () => {
    if (!loggedIn) {
      setModalType("loginRequired");
      return;
    }

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
          router.push(`${PATHS.TICKET}/${moveToTicket.ticketId}`);
        }
        break;
      case "대관 신청하기":
        setModalType("venueApply");
        break;
    }
  };

  const currentModal =
    modalType && modalType !== "loginRequired"
      ? MODAL_CONTENT[modalType]
      : null;

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
    router.push(PATHS.EVENT);
  };

  const handleVenueApply = (type: number) => {
    postEventVenue({ eventId, type });
  };

  const handleModalClose = () => {
    setModalType(null);
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
      {data && (
        <TopBar
          event={{
            eventId: data.eventId,
            posterImageUrl: data.posterImageUrl,
            title: data.eventTitle,
            description: data.description,
          }}
        />
      )}

      {data && <DetailContent {...data} />}

      {!isPending && (
        <div className="bg-gray-black fixed bottom-0 flex w-full max-w-125 gap-9.5 px-5 pt-4.25 pb-10.75">
          <div
            className={`flex flex-col justify-center ${
              data?.eventState === "모집 취소" ||
              data?.eventState === "대관 취소"
                ? "opacity-30"
                : ""
            }`}
          >
            <p className="caption-1-medium text-gray-500">예상 가격</p>
            {data && (
              <p className="body-3-semibold whitespace-nowrap text-gray-300">
                {data.estimatedPrice?.toLocaleString?.() ?? "-"}원
              </p>
            )}
          </div>
          <Button
            variant="primary"
            onClick={handleClick}
            disabled={
              data?.eventState === "모집 취소" ||
              (data?.eventState === "모집 완료" &&
                data?.userRole !== "주최자") ||
              data?.eventState === "대관 취소" ||
              data?.buttonState === "대관 진행 중"
            }
          >
            {data?.buttonState ?? ""}
          </Button>
        </div>
      )}

      {modalType && (
        <Modal
          iconType={
            modalType === "loginRequired"
              ? "alert"
              : (currentModal?.iconType as "confirm" | "alert" | "")
          }
          title={
            modalType === "loginRequired"
              ? LOGIN_REQUIRED_MODAL.title
              : currentModal?.title || ""
          }
          confirmText={
            modalType === "loginRequired"
              ? LOGIN_REQUIRED_MODAL.confirmText
              : currentModal?.confirmText || "확인"
          }
          cancelText={
            modalType === "loginRequired"
              ? LOGIN_REQUIRED_MODAL.cancelText
              : currentModal?.cancelText || "취소"
          }
          onConfirm={() => {
            if (modalType === "loginRequired") {
              router.push(PATHS.LOGIN);
              setModalType(null);
              return;
            }
            if (modalType === "apply") handleApply();
            if (modalType === "cancel") handleCancel();
            if (modalType === "recruitCancel") handleRecruitCancel();
            if (modalType === "venueApply") handleVenueApply(0);
            setModalType(null);
          }}
          onCancel={() => {
            if (modalType === "venueApply") handleVenueApply(1);
            setModalType(null);
          }}
          showCloseButton
          onClose={handleModalClose}
        >
          {modalType === "loginRequired"
            ? LOGIN_REQUIRED_MODAL.description
            : currentModal?.description}
        </Modal>
      )}
    </>
  );
}
