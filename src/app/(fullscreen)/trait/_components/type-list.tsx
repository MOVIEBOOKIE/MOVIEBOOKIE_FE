import { cn } from "@/utils/cn";
import { MouseEventHandler, ReactNode } from "react";

interface TypeListProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isEtc?: boolean;
}

export default function TypeList({
  children,
  className,
  onClick,
  isEtc = false,
  ...props
}: TypeListProps) {
  return (
    <div
      className={cn(
        "body-3-regular w-full rounded-xl border border-gray-900 px-4 py-7.5 text-gray-100",
        isEtc
          ? "flex flex-col items-center justify-around gap-1 text-center"
          : "flex flex-col items-center gap-3",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
