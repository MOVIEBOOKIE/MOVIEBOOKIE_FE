import { cn } from "@/utils/cn";
import { SearchIcon } from "@/icons/index";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "BUTTON" | "INPUT";
  className?: string;
}

export default function Input({ type, className, ...props }: InputProps) {
  const inputClass = cn(
    "body-2-medium w-full h-full placeholder:text-gray-700 pl-4 text-gray-700 text-start focus:outline-none",
    type === "INPUT" ? "focus:text-gray-100" : "",
    className,
  );

  return (
    <div className="flex h-13 w-full items-center gap-2 rounded-xl bg-gray-900 pr-3 text-gray-700">
      <input
        className={inputClass}
        {...props}
        type={type === "BUTTON" ? "button" : "text"}
        {...(type === "BUTTON"
          ? { value: "이벤트 검색하기" }
          : { placeholder: "이벤트 검색하기" })}
      />
      <SearchIcon width={24} height={24} />
    </div>
  );
}
