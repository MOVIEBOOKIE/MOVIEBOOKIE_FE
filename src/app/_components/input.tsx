import { cn } from "@/utils/cn";
import { SearchIcon } from "@/icons/index";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "BUTTON" | "INPUT";
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, ...props }, ref) => {
    const inputClass = cn(
      "body-2-medium w-full h-full placeholder:text-gray-700 pl-4 text-gray-800 text-start focus:outline-none",
      type === "INPUT" ? "focus:text-gray-100" : "",
      className,
    );

    return (
      <div className="flex h-13 w-full items-center gap-2 rounded-xl bg-gray-900 pr-3">
        <input
          ref={ref}
          className={inputClass}
          type={type === "BUTTON" ? "button" : "text"}
          {...(type === "BUTTON"
            ? { value: "이벤트 검색하기" }
            : { placeholder: "이벤트 검색하기" })}
          {...props}
        />
        <SearchIcon width={24} height={24} />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
