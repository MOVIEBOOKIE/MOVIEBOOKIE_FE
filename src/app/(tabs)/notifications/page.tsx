"use client";
import { useNotificationStore } from "app/_stores/use-noti";
import { NotificationItem } from "./components/item";

export default function NotificationPage() {
  const { list, markAsRead } = useNotificationStore();

  return (
    <div className="min-h-screen text-white">
      <h1 className="title-1-semibold px-5 pt-6 pb-7.5">알림</h1>
      {list.length === 0 ? (
        <p className="text-center text-gray-500">알림이 없습니다.</p>
      ) : (
        list.map((n, i) => (
          <NotificationItem key={i} {...n} onClick={() => markAsRead(i)} />
        ))
      )}
    </div>
  );
}
