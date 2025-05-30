"use client";
import { useNotificationStore } from "app/_stores/use-noti";
import { NotificationItem } from "./components/item";
import { useEffect } from "react";

export default function NotificationPage() {
  const { notifications, unreadCount, markAsRead } = useNotificationStore();

  useEffect(() => {
    console.log("🔔 알림 목록 (zustand):", notifications);
  }, [notifications]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      return "방금 전";
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}일 전`;
    }
  };

  // 알림 코드에 따른 status 매핑
  const getNotificationStatus = (code: number) => {
    // 신청 완료, 모집 완료, 대관 확정 등 긍정적인 알림
    if ([1, 4, 5, 10, 14, 16].includes(code)) {
      return "confirm";
    }
    // 취소, 삭제, 거부 등 부정적인 알림
    if ([2, 3, 6, 11, 12, 13, 15].includes(code)) {
      return "cancel";
    }
    // 완료, 후기 요청 등 중립적인 알림
    return "check";
  };

  return (
    <div className="h-[calc(100vh-102px)] overflow-y-scroll text-white">
      <div className="flex items-center justify-between px-5 pt-6 pb-7.5">
        <h1 className="title-1-semibold">알림</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 text-6xl text-gray-400"></div>
          <p className="text-center text-gray-500">받은 알림이 없습니다</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.title}
            title={notification.title}
            description={notification.body}
            time={formatDate(notification.createdAt)}
            status={getNotificationStatus(notification.code)}
            eventId={notification.eventId}
            isRead={notification.isRead}
            onClick={() => markAsRead(notification.id)}
          />
        ))
      )}
    </div>
  );
}
