import { CATEGORY_TYPE_TO_LABEL } from "@/constants/categories";
import { notFound } from "next/navigation";
import CategoryPageClient from "./client";
import { Header } from "@/components";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const label =
    CATEGORY_TYPE_TO_LABEL[category as keyof typeof CATEGORY_TYPE_TO_LABEL];

  if (!label) return notFound();

  return (
    <div className="bg-gray-black min-h-screen">
      <Header title={label} showBackButton={true} showCloseButton={false} />
      <div className="flex min-h-screen flex-col justify-between px-4 pt-12.5">
        <CategoryPageClient label={label} />
      </div>
    </div>
  );
}
