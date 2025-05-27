// importScripts("/firebase-config.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js",
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js",
// );

// firebase.initializeApp(self.FIREBASE_CONFIG);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("📦 백그라운드 알림 수신:", payload);
//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: "/favicon.ico",
//   });
// });

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
});

self.addEventListener("push", function (event) {
  if (!event.data) return;

  const payload = event.data.json();

  const title = payload.notification.title;
  const options = {
    body: payload.notification?.body,
    icon: "/images/favicon/72x72.png",
    badge: "/images/favicon/72x72.png",
    data: {
      url: "https://movie-bookie.shop", // 클릭 시 열릴 URL
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
