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
    data: {
      eventId: payload.data?.eventId,
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

  // eventId 전달받기 (tag 또는 data로부터)
  const eventId = event.notification?.data?.eventId;

  const targetUrl = eventId ? `/detail/${eventId}` : "/"; // fallback

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes("/") && "focus" in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }

        // 창이 없으면 새로 열기
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      }),
  );
});
