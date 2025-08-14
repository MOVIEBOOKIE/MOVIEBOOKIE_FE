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
  const url = d.url || (d.eventId ? `/detail/${d.eventId}` : "/");

  self.registration.showNotification(title, {
    body,
    icon,
    tag: d.eventId ? `event-${d.eventId}` : "moviebookie",
    data: {
      url,
      eventId: d.eventId || null,
    },
  });
});

self.__WB_MANIFEST;

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const clickedUrl =
    (event.notification &&
      event.notification.data &&
      event.notification.data.url) ||
    "/";

  const absoluteUrl = new URL(clickedUrl, self.location.origin).href;

  event.waitUntil(
    (async () => {
      const windowClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        try {
          if ("navigate" in client) {
            await client.focus();
            await client.navigate(absoluteUrl);
            return;
          }
        } catch (e) {}
      }

      await clients.openWindow(absoluteUrl);
    })(),
  );
});
