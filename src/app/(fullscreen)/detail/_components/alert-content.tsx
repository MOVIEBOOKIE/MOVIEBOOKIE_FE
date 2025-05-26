import { DangerIcon } from "@/icons/index";

export interface AlertContentProps {
  children: string;
}

export default function AlertContent({ children }: AlertContentProps) {
  return (
    <div className="mt-3 flex items-center justify-center gap-0.5 rounded-[10px] border-[1.4px] border-gray-900 py-2.5">
      <DangerIcon />
      <p className="caption-1-medium text-gray-500">{children}</p>
    </div>
  );
}
