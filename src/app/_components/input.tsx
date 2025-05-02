import { SearchIcon } from "icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "BUTTON" | "INPUT";
}

export default function Input({ type, ...props }: InputProps) {
  const commonProps = {
    className:
      "body-2-medium h-13 w-full bg-gray-950 placeholder:text-gray-800 pl-4 text-gray-800 text-start rounded-xl focus:outline-none",
  };

  return (
    <div className="relative">
      <input
        {...commonProps}
        {...props}
        type={type === "BUTTON" ? "button" : "text"}
        {...(type === "BUTTON"
          ? { value: "이벤트 검색하기" }
          : { placeholder: "이벤트 검색하기" })}
      />
      <SearchIcon className="absolute top-3.5 right-3" />
    </div>
  );
}
