"use client";

import { useEffect, useMemo, useState } from "react";
import { NotificationItem } from "./components/item";
import { apiGet } from "app/_apis/methods";
import { useNotificationStore } from "app/_stores/use-noti";
import { EmptyNotiIcon } from "@/icons/index";
import { PATHS } from "@/constants";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  title: string;
  body: string;
  timeAgo: string;
  isNew?: boolean;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null,
  );
  const setHasUnread = useNotificationStore((state) => state.setHasUnread);
  const hasUnread = useNotificationStore((state) => state.hasUnread);
  const router = useRouter();
  const occur = useMemo(() => new Map<string, number>(), [notifications]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiGet<any[]>("/notifications");
        if (!Array.isArray(res)) return;

        const isFirstVisit =
          localStorage.getItem("hasSeenNotification") !== "true";

        const lastSeenIds: string[] = isFirstVisit
          ? res.map((n) => `${n.id}`)
          : JSON.parse(localStorage.getItem("확인한 알림 ID") || "[]");

        const newNotificationIds = res.map((n) => `${n.id}`);
        localStorage.setItem(
          "확인한 알림 ID",
          JSON.stringify(newNotificationIds),
        );
        localStorage.setItem("hasSeenNotification", "true");

        const mapped = res.map((n) => ({
          id: `${n.id}`,
          title: n.title,
          body: n.message,
          timeAgo: n.timeAgo,
          isNew: hasUnread && !lastSeenIds.includes(`${n.id}`),
        }));

        setNotifications(mapped);
        setHasUnread(false);
      } catch (error) {
        console.error("알림 요청 실패:", error);
      }
    };

    fetchNotifications();
  }, [setHasUnread, hasUnread]);

  return (
    <div className="scrollbar-hide relative h-[calc(100vh-102px)] overflow-y-scroll pb-25.5 text-white">
      <h1 className="title-1-semibold px-5 pt-6 pb-5">알림</h1>

      {notifications === null ? null : notifications.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center text-center text-gray-500"
          style={{ height: "calc(100vh - 102px - 88px)" }}
        >
          <EmptyNotiIcon />
          <p className="body-3-medium mt-5 mb-7 text-gray-800">
            아직 알림이 없어요 <br />
            지금 바로 나만의 이벤트를 만들어보세요
          </p>
          <button
            type="button"
            onClick={() => router.push(PATHS.EVENT_CREATE)}
            className="bg-red-main body-3-semibold w-75 rounded-xl px-6 py-4 text-white"
          >
            나만의 이벤트 만들러 가기
          </button>
        </div>
      ) : (
        <div className="scrollbar-hide overflow-y-scroll">
          {notifications.map((n) => {
            const count = (occur.get(n.id) ?? 0) + 1;
            occur.set(n.id, count);
            const uid = `noti-${n.id}-${count}`;

            return (
              <NotificationItem
                key={uid}
                type={n.title}
                title={n.title}
                description={n.body}
                time={n.timeAgo}
                eventId={n.id}
                highlight={n.isNew}
                onClick={() => n.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
