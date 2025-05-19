import { CheckboxIcon } from "@/icons/index";
import React from "react";

interface ToastProps {
  children: string;
}

export default function Toast({ children }: ToastProps) {
  return (
    <div className="drop-shadow-2 flex w-88.75 items-center gap-2.5 rounded-[14px] bg-gray-900 p-3">
      <CheckboxIcon width={26} height={26} className="m-0.5" />
      <p className="body-3-medium">{children}</p>
    </div>
  );
}
