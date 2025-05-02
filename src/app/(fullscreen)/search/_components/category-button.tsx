"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryButtonProps {
  label: string;
  src: string;
  path: string;
}

export default function CategoryButton({
  label,
  src,
  path,
}: CategoryButtonProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(path);
  };

  const formattedLabel = label.split("/n").map((line, index) => (
    <span key={index}>
      {line}
      {index < label.split("/n").length - 1 && <br />}
    </span>
  ));

  return (
    <button className="relative" onClick={handleNavigate}>
      <Image
        width={161}
        height={35}
        src={src}
        alt={label}
        layout="intrinsic"
        priority
      />
      <p className="body-2-medium absolute top-4 left-4 text-start text-gray-100">
        {formattedLabel}
      </p>
    </button>
  );
}
