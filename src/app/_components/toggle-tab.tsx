interface ToggleTabProps {
  options: readonly string[];
  selected: string;
  onSelect: (selected: string) => void;
  withSuffix?: string;
}

export default function ToggleTab({
  options,
  selected,
  onSelect,
  withSuffix,
}: ToggleTabProps) {
  return (
    <div className="flex h-12.5 rounded-[12px] bg-gray-950 p-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`body-3-semibold flex-1 rounded-[9px] py-2 ${
            selected === option
              ? "bg-gray-900 py-2.75 text-gray-200"
              : "text-gray-800"
          }`}
        >
          {option}
          {withSuffix ? ` ${withSuffix}` : ""}
        </button>
      ))}
    </div>
  );
}
