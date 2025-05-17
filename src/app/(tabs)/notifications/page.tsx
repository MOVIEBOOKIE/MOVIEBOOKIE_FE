"use client";

import { NotificationItem, NotificationStatus } from "./components/item";

const notifications: {
  type: string;
  title: string;
  description: string;
  time: string;
  status: NotificationStatus;
}[] = [
  {
    type: "이벤트 생성 완료",
    title: "더 폴: 오디어스와 환상의 문",
    description: "이벤트 신청이 완료됐어요!\n멋진 만남을 기다려볼까요? 🙌",
    time: "N시간 전",
    status: "confirm",
  },
  {
    type: "이벤트 신청 취소",
    title: "더 폴: 오디어스와 환상의 문",
    description: "이벤트 신청이 취소됐어요.\n아쉽지만, 다음에 꼭 함께해요!",
    time: "N시간 전",
    status: "cancel",
  },
  {
    type: "이벤트 모집 완료",
    title: "더 폴: 오디어스와 환상의 문",
    description: "이벤트 모집이 완료됐어요!\n주최자가 대관 신청 중이에요.",
    time: "N시간 전",
    status: "check",
  },
  {
    type: "이벤트 상영 완료",
    title: "더 폴: 오디어스와 환상의 문",
    description:
      "이벤트가 잘 마무리 됐나요? ✨\n함께한 시간의 후기를 남겨주세요 😊",
    time: "N시간 전",
    status: "confirm",
  },
  {
    type: "이벤트 상영 완료",
    title: "더 폴: 오디어스와 환상의 문",
    description:
      "이벤트가 잘 마무리 됐나요? ✨\n함께한 시간의 후기를 남겨주세요 😊",
    time: "N시간 전",
    status: "confirm",
  },
  {
    type: "이벤트 상영 완료",
    title: "더 폴: 오디어스와 환상의 문",
    description:
      "이벤트가 잘 마무리 됐나요? ✨\n함께한 시간의 후기를 남겨주세요 😊",
    time: "N시간 전",
    status: "confirm",
  },
  {
    type: "이벤트 상영 완료",
    title: "더 폴: 오디어스와 환상의 문",
    description:
      "이벤트가 잘 마무리 됐나요? ✨\n함께한 시간의 후기를 남겨주세요 😊",
    time: "N시간 전",
    status: "confirm",
  },
  {
    type: "이벤트 상영 완료",
    title: "더 폴: 오디어스와 환상의 문",
    description:
      "이벤트가 잘 마무리 됐나요? ✨\n함께한 시간의 후기를 남겨주세요 😊",
    time: "N시간 전",
    status: "confirm",
  },
  {
    type: "이벤트 상영 완료",
    title: "더 폴: 오디어스와 환상의 문",
    description:
      "이벤트가 잘 마무리 됐나요? ✨\n함께한 시간의 후기를 남겨주세요 😊",
    time: "N시간 전",
    status: "confirm",
  },
];

export default function NotificationPage() {
  return (
    <div className="min-h-screen text-white">
      <h1 className="title-1-semibold px-5 pt-6 pb-7.5">알림</h1>

      {notifications.map((n, i) => (
        <NotificationItem key={i} {...n} />
      ))}
    </div>
  );
}
