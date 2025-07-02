// FCM 스크립트
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
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/images/favicon/96x96.png",
  });
});

// next-pwa의 워크박스 매니페스트
self.__WB_MANIFEST;

// 서비스워커 생명주기 관리
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker activated");
  event.waitUntil(self.clients.claim());
});
