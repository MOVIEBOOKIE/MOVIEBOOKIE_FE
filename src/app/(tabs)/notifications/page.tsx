"use client";

import { useEffect, useState } from "react";
import { NotificationItem } from "./components/item";
import { apiGet } from "app/_apis/methods";
import { useNotificationStore } from "app/_stores/use-noti";

interface Notification {
  id: string;
  title: string;
  body: string;
  timeAgo: string;
  isNew?: boolean;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const setHasUnread = useNotificationStore((state) => state.setHasUnread);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiGet<any[]>("/notifications");
        if (!Array.isArray(res)) {
          return;
        }

        const lastSeenIds: string[] = JSON.parse(
          localStorage.getItem("lastSeenNotificationIds") || "[]",
        );

        const newNotificationIds = res.map((n) => `${n.id}`);
        localStorage.setItem(
          "lastSeenNotificationIds",
          JSON.stringify(newNotificationIds),
        );

        const mapped = res.map((n) => ({
          id: `${n.id}`,
          title: n.title,
          body: n.message,
          timeAgo: n.timeAgo,
          isNew: !lastSeenIds.includes(`${n.id}`),
        }));

        setNotifications(mapped);
        setHasUnread(false);
      } catch (error) {
        console.error("알림 요청 실패:", error);
      }
    };

    fetchNotifications();
  }, [setHasUnread]);

  return (
    <div className="h-[calc(100vh-102px)] overflow-y-scroll text-white">
      <div className="flex items-center justify-between px-5 pt-6 pb-7.5">
        <h1 className="title-1-semibold">알림</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-center text-gray-500">받은 알림이 없습니다</p>
        </div>
      ) : (
        notifications.map((n) => (
          <NotificationItem
            key={n.id}
            type={n.title}
            title={n.title}
            description={n.body}
            time={n.timeAgo}
            eventId={n.id}
            highlight={n.isNew}
            onClick={() => console.log("알림 클릭됨", n.id)}
          />
        ))
      )}
    </div>
  );
}
