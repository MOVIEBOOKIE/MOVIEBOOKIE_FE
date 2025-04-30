import { cn } from "../_utils/cn";

interface BadgeProps {
  children: string;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "caption-1-medium rounded-md bg-gray-950 px-1.75 py-1 text-gray-300",
        className,
      )}
    >
      {children}
    </div>
  );
}
