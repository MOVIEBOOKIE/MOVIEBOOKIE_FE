// app/_components/notification-test-button.tsx
"use client";

import { useState } from "react";

export default function NotificationTestButton() {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "🔥 테스트 알림",
          body: "알림 잘 도착했나요?",
        }),
      });

      const data = await res.json();
      console.log("✅ 전송 결과:", data);
      alert("알림 전송 완료!");
    } catch (e) {
      console.error("❌ 전송 실패", e);
      alert("알림 전송 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "전송 중..." : "🔔 푸시 알림 테스트"}
    </button>
  );
}
