importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyCfoF3SI3S7G_AxNSmao1V0BaOD_mYo8jQ",
  authDomain: "moviebooky-2009d.firebaseapp.com",
  projectId: "moviebooky-2009d",
  storageBucket: "moviebooky-2009d.appspot.com",
  messagingSenderId: "854250295423",
  appId: "1:854250295423:web:d99f7f0f3e5102e2beef4a",
  measurementId: "G-9KGXJLXLZE",
});

const messaging = firebase.messaging();

// ✅ 알림 수신 시 시스템 알림 띄우기
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: {
      eventId: payload.data?.eventId, // ✅ 클릭 이벤트에 전달될 데이터
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ 알림 클릭 시 이벤트 상세페이지로 이동
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const eventId = event.notification?.data?.eventId;
  const targetUrl = eventId ? `/event/${eventId}` : "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // 이미 열려있는 탭이 있으면 포커스
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus();
          }
        }

        // 새 창/탭 열기
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      }),
  );
});
