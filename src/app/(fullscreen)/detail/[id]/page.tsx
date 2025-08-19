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
import { useLoading } from "app/_context/loading-context";
import { useToastStore } from "app/_stores/use-toast-store";

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
  const showToast = useToastStore((state) => state.showToast);

  const { setLoading } = useLoading();

  const params = useParams();
  const eventId = useMemo(() => Number(params?.id), [params?.id]);
  const isValidEventId = !isNaN(eventId) && eventId > 0;

  const user = useUserStore((state) => state.user);
  const loggedIn = !!user;

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
  }, [data?.buttonState]);

  const isPending = loggedIn ? isPendingWithAuth : isPendingAnonymous;

  const { data: moveToTicket } = useGetToTicket(eventId, {
    enabled: data?.buttonState === "티켓으로 이동",
  });

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
        } else if (eventId) {
          router.push(`${PATHS.TICKET}?eventId=${eventId}`);
        }
        break;
      case "대관 신청하기":
        setModalType("venueApply");
        break;
      default:
        setModalType("apply");
    }
  };

  const { mutate } = usePostEventRegister();
  const { mutate: applyCancel } = useDeleteEvent();
  const { mutate: recruitCancel } = useDeleteEventsRecruit();
  const { mutate: postEventVenue } = usePostEventsVenue();

  const handleApply = () => {
    setLoading(true);
    setIsComplete(true);

    mutate(eventId, {
      onSuccess: () => {
        setLoading(false);
      },
      onError: (err: any) => {
        setLoading(false);

        const code = err?.response?.data?.code;

        if (code === "PARTICIPATION_404") {
          useToastStore
            .getState()
            .showToast(
              "해당 날짜에 이미 참여 중인 이벤트가 있어요",
              "checkbox",
            );
        } else {
          console.error("이벤트 신청 실패:", err);
        }
        setIsComplete(false);
        setLoading(false);
      },
    });
  };

  const handleCancel = () => {
    setLoading(true);
    applyCancel(eventId, {
      onSuccess: () => {
        setLoading(false);
      },
      onError: (error) => {
        console.error("이벤트 신청 취소 실패:", error);
        setLoading(false);
      },
    });
  };

  const handleRecruitCancel = () => {
    setLoading(true);
    recruitCancel(eventId, {
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  const handleVenueApply = (type: number) => {
    setLoading(true);
    postEventVenue(
      { eventId, type },
      {
        onSettled: () => {
          setLoading(false);
        },
      },
    );
  };

  const handleComplete = () => {
    router.push(PATHS.EVENT);
  };

  const currentModal =
    modalType && modalType !== "loginRequired"
      ? MODAL_CONTENT[modalType]
      : null;

  const handleModalClose = () => {
    setModalType(null);
  };

  if (isComplete) {
    return (
      <Complete
        status="success"
        action="이벤트 신청"
        buttonText="신청목록 확인하기"
        onButtonClick={handleComplete}
      />
    );
  }

  return (
    <>
      {loggedIn && data && (
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
            <p className="body-2-semibold whitespace-nowrap text-gray-200">
              {data?.estimatedPrice?.toLocaleString?.() ?? "-"}원
            </p>
          </div>

          <Button
            variant="primary"
            onClick={handleClick}
            disabled={
              data?.eventState === "모집 취소" ||
              (data?.eventState === "모집 완료" &&
                data?.userRole !== "주최자") ||
              data?.eventState === "대관 취소" ||
              data?.buttonState === "대관 진행 중" ||
              data?.buttonState === "신청 마감"
            }
          >
            {data?.buttonState ?? ""}
          </Button>
        </div>
      )}

      {modalType === "loginRequired" ? (
        <Modal
          iconType="alert"
          title={`이벤트 신청은\n로그인 후에 가능해요`}
          children="지금 바로 로그인하고 신청해보세요"
          confirmText="로그인하기"
          onCancel={undefined}
          onConfirm={() => {
            router.push(PATHS.LOGIN);
            setModalType(null);
          }}
          onClose={() => {
            setModalType(null);
          }}
        ></Modal>
      ) : (
        modalType && (
          <Modal
            iconType={currentModal?.iconType as "confirm" | "alert" | ""}
            title={currentModal?.title || ""}
            confirmText={currentModal?.confirmText || "확인"}
            cancelText={currentModal?.cancelText || "취소"}
            onConfirm={() => {
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
            showCloseButton={currentModal?.showCloseButton}
            onClose={handleModalClose}
            isVerticalLayout={currentModal?.isVerticalLayout}
          >
            {currentModal?.description}
          </Modal>
        )
      )}
    </>
  );
}
