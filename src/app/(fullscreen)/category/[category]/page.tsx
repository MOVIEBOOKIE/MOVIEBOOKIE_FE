import { CATEGORY_TYPE_TO_LABEL } from "@/constants/categories";
import { notFound } from "next/navigation";
import CategoryPageClient from "./client";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const label =
    CATEGORY_TYPE_TO_LABEL[category as keyof typeof CATEGORY_TYPE_TO_LABEL];

  if (!label) return notFound();

  return <CategoryPageClient label={label} />;
}
