// public/firebase-messaging-sw.js

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
    icon: "/icons/icon-192x192.png",
  });
});
