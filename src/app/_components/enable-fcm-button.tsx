"use client";
import { useState } from "react";
import { useFCMHandler } from "app/_hooks/fcm/use-fcm-handler";
import { useToastStore } from "app/_stores/use-toast-store";

export default function EnableNotiButton() {
  const { requestPermissionViaButton } = useFCMHandler();
  const showToast = useToastStore((s) => s.showToast);
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const ok = await requestPermissionViaButton();
      if (ok) {
        showToast("알림이 활성화됐어요 ");
      } else {
        const state =
          typeof window !== "undefined" && "Notification" in window
            ? Notification.permission
            : "unsupported";
        if (state === "denied") {
          showToast("알림 권한이 허용되지 않았습니다. 설정에서 허용해 주세요.");
        } else if (state === "default") {
          showToast("알림 권한 요청이 취소되었어요.");
        } else {
          showToast("이 환경에서는 알림을 지원하지 않습니다.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? "권한 요청 중..." : "알림 권한 허용하기"}
    </button>
  );
}
