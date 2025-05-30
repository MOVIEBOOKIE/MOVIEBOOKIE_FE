// public/custom-sw/sw.js

importScripts("/firebase-config.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js",
);

firebase.initializeApp(self.FIREBASE_CONFIG);

const messaging = firebase.messaging();
self.__WB_MANIFEST;

messaging.onBackgroundMessage(function (payload) {
  const rawTitle = payload.notification.title || "";
  const notificationTitle = rawTitle.replace(/ 알림$/, "");

  const notificationOptions = {
    body: payload.notification.body,
    data: {
      eventId: payload.data?.eventId,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("notificationclick", function (event) {
//   const eventId = event.notification.data?.eventId;
//   const urlToOpen = eventId
//     ? `/notifications?eventId=${eventId}`
//     : "/notifications";

//   event.notification.close();

//   event.waitUntil(
//     clients
//       .matchAll({ type: "window", includeUncontrolled: true })
//       .then((clientList) => {
//         for (const client of clientList) {
//           if ("focus" in client) return client.focus();
//         }
//         if (clients.openWindow) return clients.openWindow(urlToOpen);
//       }),
//   );
// });

self.addEventListener("notificationclick", function (event) {
  const eventId = event.notification.data?.eventId;
  const url = eventId ? `/notifications?eventId=${eventId}` : "/notifications";

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      }),
  );
});
