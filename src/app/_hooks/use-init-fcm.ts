// import { NotificationStatus, useNotificationStore } from "app/_stores/noti";
// import { useToastStore } from "app/_stores/use-toast-store";
// import { onFirebaseMessage } from "app/lib/firebase-notification";

// const { showToast } = useToastStore();
// const { addNotification } = useNotificationStore();

// onFirebaseMessage((payload) => {
//   console.log("📩 알림 수신:", payload);

//   const now = new Date();
//   const timeString = now.toLocaleTimeString("ko-KR", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   addNotification({
//     type: payload.data?.type || "알림",
//     title: payload.notification?.title || "제목 없음",
//     description: payload.notification?.body || "",
//     time: timeString,
//     status: (payload.data?.status as NotificationStatus) || "confirm",
//     // eventId: payload.data?.eventId ? Number(payload.data.eventId) : undefined,
//   });

//   showToast(payload.notification?.body || "새 알림이 도착했습니다!");
// });
