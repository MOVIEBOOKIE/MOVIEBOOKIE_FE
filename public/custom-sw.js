importScripts(
  "https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js",
);
importScripts("/firebase-config.js");

firebase.initializeApp(self.FIREBASE_CONFIG);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message received:", payload);
  console.log("📬 도착한 Background 알림 내용:", { title, body });

  self.registration.showNotification(title, {
    body,
    icon: "/images/favicon/96x96.png",
    tag: `event-${eventId}`,
    // 같은 태그면 알림이 덮어씌워지므로 유사 알림 중복도 막을 수 있음
    data: {
      eventId: payload.data?.eventId,
    },
    data: {
      url: `/detail/${payload.data?.eventId}`,
    },
  });
});

self.__WB_MANIFEST;

self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const data = event.notification.data || {};
  const eventId = data.eventId;

  const url = new URL("/notifications", self.location.origin);
  if (eventId) {
    url.searchParams.set("clicked", "1");
    url.searchParams.set("id", String(messageId)); // 알림 ID로 사용
  }

  event.waitUntil(clients.openWindow(url.toString()));
});
