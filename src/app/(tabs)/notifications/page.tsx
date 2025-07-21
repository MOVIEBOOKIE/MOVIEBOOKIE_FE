"use client";

import { useEffect, useState } from "react";
import { NotificationItem } from "./components/item";
import { apiGet } from "app/_apis/methods";

interface Notification {
  id: string;
  title: string;
  body: string;
  timeAgo: string;
  isRead: boolean;
  isNew?: boolean;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiGet<{ result: any[] }>("/notifications");
        const mapped = res.result.map((n, i) => ({
          id: `${n.title}-${n.timeAgo}`,
          title: n.title,
          body: n.message,
          timeAgo: n.timeAgo,
          isRead: n.read,
          isNew: false,
        }));
        setNotifications(mapped);
      } catch (error) {
        console.error("알림 요청 실패:", error);
      }
    };

    fetchNotifications();
  }, []);

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
            isRead={n.isRead}
            highlight={n.isNew}
            onClick={() => console.log("알림 클릭됨", n.id)}
          />
        ))
      )}
    </div>
  );
}
