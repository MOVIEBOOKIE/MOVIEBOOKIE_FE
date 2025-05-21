import { CheckboxIcon, ToastAlertIcon } from "@/icons/index";
import React from "react";

interface ToastProps {
  children: string;
  iconType?: "checkbox" | "alert";
}

export default function Toast({ children, iconType = "checkbox" }: ToastProps) {
  const IconComponent = iconType === "alert" ? ToastAlertIcon : CheckboxIcon;

  return (
    <div className="drop-shadow-2 flex w-[335px] items-center gap-2.5 rounded-[14px] bg-gray-900 p-3">
      <IconComponent width={30} height={30} className="m-0.5" />
      <p className="body-3-medium text-white">{children}</p>
    </div>
  );
}
