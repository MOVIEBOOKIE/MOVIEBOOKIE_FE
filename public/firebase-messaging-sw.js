importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyCRSgZQawB0veTEDXgQdJqm7ccBD1IpM5Y",
  authDomain: "moviebookie-ece28.firebaseapp.com",
  projectId: "moviebookie-ece28",
  messagingSenderId: "885582338514",
  appId: "1:885582338514:web:7369898f75d160f59c100b",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("백그라운드 알림 수신:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/favicon.ico",
  });
});
