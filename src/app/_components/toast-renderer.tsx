"use client";

import { useToastStore } from "app/_stores/use-toast-store";
import Toast from "./toast";

export default function ToastRenderer() {
  const { isVisible, message, type } = useToastStore();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-30.25 left-1/2 z-99 -translate-x-1/2">
      <Toast iconType={type}>{message}</Toast>
    </div>
  );
}
