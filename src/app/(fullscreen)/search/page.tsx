import { Input } from "@/components";
import { BackIcon } from "@/icons/index";
import CategoryButton from "./_components/category-button";
import { EVENT_CATEGORIES } from "@/constants";

export default function Search() {
  return (
    <div className="w-full">
      <div className="mt-5.5 flex w-full items-center gap-2 pr-5 pl-2.5">
        <BackIcon />
        <Input type="INPUT" />
      </div>
      <p className="body-2-medium mt-6 ml-5.5 text-gray-300">
        어떤 이벤트를 찾으시나요?
      </p>
      <div className="gap mx-auto mt-4.5 grid w-fit grid-cols-2 justify-center gap-3.25">
        {EVENT_CATEGORIES.map((category) => (
          <CategoryButton
            key={category.path}
            label={category.label}
            src={category.src}
            path={category.path}
          />
        ))}
      </div>
    </div>
  );
}
