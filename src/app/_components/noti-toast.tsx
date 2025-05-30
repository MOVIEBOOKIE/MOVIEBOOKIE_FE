// app/_components/toast.tsx
"use client";

import { useToast } from "app/_context/toast-context";
import React from "react";

const NotiToast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-in max-w-md min-w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="mb-1 font-semibold text-gray-900">
                {toast.title}
              </h4>
              <p className="text-sm whitespace-pre-line text-gray-600">
                {toast.body}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotiToast;
