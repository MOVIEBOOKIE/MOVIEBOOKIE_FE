import { NotiCancelIcon, NotiCheckIcon, NotiConfirmIcon } from "@/icons/index";

export type NotificationStatus = "confirm" | "cancel" | "check";

interface NotificationItemProps {
  type: string;
  title: string;
  description: string;
  time: string;
  status: NotificationStatus;
}

export function NotificationItem({
  type,
  title,
  description,
  time,
  status,
}: NotificationItemProps) {
  const statusIcon = {
    confirm: <NotiConfirmIcon />,
    cancel: <NotiCancelIcon />,
    check: <NotiCheckIcon />,
  }[status];

  return (
    <div className="flex gap-2 border-gray-800 px-5 py-3.25">
      <div>{statusIcon}</div>
      <div className="flex-1 text-gray-200">
        <p className="caption-1-medium mb-1 text-gray-500">{type}</p>
        <p className="body-3-medium">“{title}”</p>
        <p className="body-3-medium whitespace-pre-line">{description}</p>
      </div>
      <span className="caption-1-regular self-start text-gray-500">{time}</span>
    </div>
  );
}
