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

// FCM 관련 스크립트 로드 (순서 중요!)
try {
  importScripts("/firebase-config.js");
  importScripts("/firebase-messaging-sw.js");
  console.log("🔥 Firebase scripts loaded successfully");
} catch (error) {
  console.error("❌ Failed to load Firebase scripts:", error);
}
