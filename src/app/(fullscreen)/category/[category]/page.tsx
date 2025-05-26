import { CATEGORY_TYPE_TO_LABEL } from "@/constants/categories";
import { notFound } from "next/navigation";
import CategoryPageClient from "./client";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const label =
    CATEGORY_TYPE_TO_LABEL[
      params.category as keyof typeof CATEGORY_TYPE_TO_LABEL
    ];

  if (!label) return notFound();

  return <CategoryPageClient label={label} />;
}
