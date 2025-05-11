import { CATEGORY_TYPE_TO_LABEL, CATEGORIES } from "@/constants/categories";
import { notFound } from "next/navigation";
import { MOVIE_LISTS } from "@/mocks/movie-list";
import CategoryPageClient from "./client";

export const dynamic = "force-static";
export async function generateStaticParams() {
  const categories = [
    "movie",
    "drama",
    "entertainment",
    "sports",
    "concert",
    "others",
  ];

  return categories.map((category) => ({
    category,
  }));
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  const label =
    CATEGORY_TYPE_TO_LABEL[category as keyof typeof CATEGORY_TYPE_TO_LABEL];
  if (!label) return notFound();

  const filteredCards = MOVIE_LISTS.filter(
    (card) => CATEGORIES[card.category as keyof typeof CATEGORIES] === category,
  );

  return <CategoryPageClient label={label} cards={filteredCards} />;
}
