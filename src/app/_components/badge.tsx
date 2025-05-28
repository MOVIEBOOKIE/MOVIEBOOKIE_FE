import { cn } from "../_utils/cn";

interface BadgeProps {
  children: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Badge({
  children,
  className,
  variant = "primary",
}: BadgeProps) {
  const badgeStyle =
    variant === "secondary"
      ? "bg-gray-950 text-white"
      : "bg-red-main text-white";
  return (
    <div
      className={cn(
        "caption-1-medium rounded-md px-1.75 py-1 text-gray-300",
        className,
        badgeStyle,
      )}
    >
      {children}
    </div>
  );
}
