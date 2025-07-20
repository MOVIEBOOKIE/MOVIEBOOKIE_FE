"use client";

import { NotiCancelIcon, NotiCheckIcon, NotiConfirmIcon } from "@/icons/index";
import { useRouter } from "next/navigation";
import { getNotificationTargetUrl } from "./target-url";
import { getStatusByTitle } from "./get-status-bytitle";

export type NotificationStatus = "confirm" | "cancel" | "check";

interface NotificationItemProps {
  type: string;
  title: string;
  description: string;
  time: string;
  eventId?: number;
  isRead?: boolean;
  highlight?: boolean;
  onClick?: () => void;
}

export function NotificationItem({
  type,
  title,
  description,
  time,
  eventId,
  isRead = false,
  highlight = false,
  onClick,
}: NotificationItemProps) {
  const status = getStatusByTitle(title);

  const statusIcon = {
    confirm: <NotiConfirmIcon />,
    cancel: <NotiCancelIcon />,
    check: <NotiCheckIcon />,
  }[status];

  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (onClick) onClick();
        const targetUrl = getNotificationTargetUrl(type, eventId);
        if (targetUrl) {
          router.push(targetUrl);
        }
      }}
      className={`relative flex cursor-pointer items-start gap-2 px-5 py-3.5 transition ${
        highlight ? "bg-gray-950" : isRead ? "bg-gray-black" : "bg-gray-950"
      }`}
    >
      <div>{statusIcon}</div>
      <div className="flex-1 gap-2 text-gray-100">
        <p className="caption-1-medium m-0.5 mb-1">{type}</p>
        <p className="body-3-medium whitespace-pre-line text-gray-400">
          {description}
        </p>
      </div>

      <span
        className={`caption-1-regular mt-1 whitespace-nowrap ${
          isRead ? "text-gray-500" : "text-gray-100"
        }`}
      >
        {time}
      </span>
    </div>
  );
}
