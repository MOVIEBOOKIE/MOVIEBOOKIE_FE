import { cn } from "@/utils/cn";
import { MouseEventHandler, ReactNode } from "react";

interface TypeListProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  direction?: "row" | "col";
}

export default function TypeList({
  children,
  className,
  onClick,
  direction = "row",
  ...props
}: TypeListProps) {
  return (
    <div
      className={cn(
        "body-3-regular w-full rounded-xl border border-gray-900 px-4 py-7.5 text-gray-100",
        "cursor-pointer transition-colors duration-200 will-change-transform",
        direction === "col"
          ? "flex flex-col items-center justify-around gap-1 text-center"
          : "flex items-center gap-3",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
