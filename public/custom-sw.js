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

  //  notification or data에서 title/body 추출
  const title =
    payload.notification?.title || payload.data?.title || "📩 무비부키 알림";
  const body =
    payload.notification?.body ||
    payload.data?.body ||
    "새로운 알림이 도착했어요!";
  console.log("📬 도착한 Background 알림 내용:", { title, body });

  self.registration.showNotification(title, {
    body,
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
