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
import { useState, useEffect, useMemo } from "react";
import Modal from "@/components/modal";
import Complete from "@/components/complete";
import { MODAL_CONTENT } from "@/constants/detail";
import { PATHS } from "@/constants";
import { useGetToTicket } from "app/_hooks/ticket/use-ticket";
import { useGetAnonymousEvent } from "app/_hooks/use-anonymous-events";
import { EventData } from "app/_types/event";
import { useUserStore } from "app/_stores/use-user-store";
import { useNotificationStore } from "app/_stores/use-noti";
import { useToast } from "app/_context/toast-context";
import { useConfirmedNoti } from "app/_hooks/use-confirmed-noti";
import { ParticipantNotificationType } from "app/_types/noti";

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
  const [shouldPoll, setShouldPoll] = useState(true);

  const params = useParams();
  const eventId = useMemo(() => Number(params?.id), [params?.id]);
  const isValidEventId = !isNaN(eventId) && eventId > 0;
  const user = useUserStore((state) => state.user);
  const loggedIn = !!user;
  const { showToast } = useToast();
  const { addNotification } = useNotificationStore();

  const { data: dataWithAuth, isPending: isPendingWithAuth } = useGetEvent(
    eventId,
    {
      enabled: loggedIn && isValidEventId,
      refetchInterval: shouldPoll ? 5000 : false,
    },
  );

  const { data: dataAnonymousRaw, isPending: isPendingAnonymous } =
    useGetAnonymousEvent(eventId, {
      enabled: !loggedIn && isValidEventId,
    });

  const data = (loggedIn ? dataWithAuth : dataAnonymousRaw) as
    | EventData
    | undefined;

  useEffect(() => {
    if (data?.buttonState?.trim() === "티켓으로 이동") {
      setShouldPoll(false);
    }
  }, [data?.buttonState, showToast]);

  //TODO: 주석처리
  // useConfirmedNoti({ eventId, buttonState: data?.buttonState });

  const isPending = loggedIn ? isPendingWithAuth : isPendingAnonymous;
  const { data: moveToTicket } = useGetToTicket(eventId, {
    enabled: data?.buttonState === "티켓으로 이동",
  });

  console.log("티켓데이터", data);
  console.log("moveToTicket 데이터", moveToTicket);

  const handleClick = () => {
    if (!loggedIn) {
      setModalType("loginRequired");
      return;
    }

    console.log("버튼 클릭 - buttonState:", data?.buttonState);

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
        console.log("티켓으로 이동 케이스 진입");
        if (moveToTicket?.ticketId) {
          console.log("티켓 ID 존재:", moveToTicket.ticketId);
          const ticketPath = `${PATHS.TICKET}/${moveToTicket.ticketId}`;
          console.log("이동할 경로:", ticketPath);
          router.push(ticketPath);
        } else {
          console.log("티켓 ID가 없음:", moveToTicket);
          if (eventId) {
            router.push(`${PATHS.TICKET}?eventId=${eventId}`);
          }
        }
        break;
      case "대관 신청하기":
        setModalType("venueApply");
        break;
      default:
        console.log("매칭되지 않는 buttonState:", data?.buttonState);
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

  const showNotificationAndSave = async (notificationCode: number) => {
    const excludedCodes = [1, 2, 10, 11, 12];
    if (excludedCodes.includes(notificationCode)) return;

    try {
      const response = await fetch(
        `/api/notifications/notifications/preview/participant/${eventId}/${notificationCode}`,
      );

      if (response.ok) {
        const notification = await response.json();

        showToast({
          title: notification.title,
          body: notification.body,
          type: "success",
        });

        addNotification({
          eventId,
          code: notificationCode,
          title: notification.title,
          body: notification.body,
        });
      }
    } catch (error) {
      console.error("알림을 가져오는데 실패했습니다:", error);
    }
  };

  const handleApply = () => {
    setIsComplete(true);
    mutate(eventId, {
      onSuccess: () => {
        showNotificationAndSave(ParticipantNotificationType.APPLY_COMPLETED);
      },
      onError: (error) => {
        console.error("이벤트 신청 실패:", error);
        setIsComplete(false);
      },
    });
  };

  const handleCancel = () => {
    applyCancel(eventId, {
      onSuccess: () => {
        showNotificationAndSave(ParticipantNotificationType.APPLY_CANCEL);
      },
      onError: (error) => {
        console.error("이벤트 신청 취소 실패:", error);
      },
    });
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
