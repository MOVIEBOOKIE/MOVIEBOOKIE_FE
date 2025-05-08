import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface TypeListProps {
  children: ReactNode;
  className?: string;
}

export default function TypeList({ children, className }: TypeListProps) {
  return (
    <div
      className={cn(
        "body-3-regular flex w-full items-center gap-3 rounded-xl border border-gray-900 text-gray-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
