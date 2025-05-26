import { CheckAlertIcon, DangerIcon } from "@/icons/index";

export interface AlertContentProps {
  children: string;
  iconType: "danger" | "check";
}

export default function AlertContent({
  children,
  iconType,
}: AlertContentProps) {
  return (
    <div className="mt-3 flex items-center justify-center gap-0.5 rounded-[10px] border-[1.4px] border-gray-900 py-2.5">
      {iconType === "danger" ? <DangerIcon /> : <CheckAlertIcon />}

      <p className="caption-1-medium text-gray-500">{children}</p>
    </div>
  );
}
