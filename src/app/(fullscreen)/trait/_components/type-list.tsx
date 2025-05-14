import { cn } from "@/utils/cn";
import { MouseEventHandler, ReactNode } from "react";

interface TypeListProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function TypeList({
  children,
  className,
  onClick,
  ...props
}: TypeListProps) {
  return (
    <div
      className={cn(
        "body-3-regular flex w-full items-center gap-3 rounded-xl border border-gray-900 text-gray-100",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
