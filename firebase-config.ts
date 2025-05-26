// firebase-config.ts
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCRSgZQawB0veTEDXgQdJqm7ccBD1IpM5Y",
  authDomain: "moviebookie-ece28.firebaseapp.com",
  projectId: "moviebookie-ece28",
  storageBucket: "moviebookie-ece28.firebasestorage.app",
  messagingSenderId: "885582338514",
  appId: "1:885582338514:web:7369898f75d160f59c100b",
  measurementId: "G-G9SZRH86LX",
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
