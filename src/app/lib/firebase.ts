import { initializeApp } from "firebase/app";
import { getMessaging, isSupported, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCfoF3SI3S7G_AxNSmao1V0BaOD_mYo8jQ",
  authDomain: "moviebooky-2009d.firebaseapp.com",
  projectId: "moviebooky-2009d",
  storageBucket: "moviebooky-2009d.appspot.com",
  messagingSenderId: "854250295423",
  appId: "1:854250295423:web:d99f7f0f3e5102e2beef4a",
  measurementId: "G-9KGXJLXLZE",
};

const app = initializeApp(firebaseConfig);

export const messagingPromise: Promise<Messaging | null> =
  typeof window !== "undefined"
    ? isSupported().then((supported) => (supported ? getMessaging(app) : null))
    : Promise.resolve(null);
