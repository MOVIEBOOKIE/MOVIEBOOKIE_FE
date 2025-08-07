"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryButtonProps {
  label: string;
  src: string;
  path: string;
  index: number;
}

export default function CategoryButton({
  label,
  src,
  path,
  index,
}: CategoryButtonProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(path);
  };

  const formattedLabel = label.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      {index < label.split("\n").length - 1 && <br />}
    </span>
  ));

  return (
    <button
      type="button"
      className="relative aspect-[161/135] w-full"
      onClick={handleNavigate}
      aria-label={`${label} 카테고리로 이동`}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="161px"
        className="object-cover"
        loading={index < 2 ? "eager" : "lazy"}
        priority={index < 2}
      />
      <p className="body-2-semibold absolute top-4 left-4 text-start text-gray-100">
        {formattedLabel}
      </p>
    </button>
  );
}
