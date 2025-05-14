import { use } from "react";
import { CATEGORY_TYPE_TO_LABEL, CATEGORIES } from "@/constants/categories";
import { notFound } from "next/navigation";
import { MOVIE_LISTS } from "@/mocks/movie-list";
import CategoryPageClient from "./client";

export default function CategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(props.params);

  const label =
    CATEGORY_TYPE_TO_LABEL[category as keyof typeof CATEGORY_TYPE_TO_LABEL];
  if (!label) return notFound();

  const filteredCards = MOVIE_LISTS.filter(
    (card) => CATEGORIES[card.category as keyof typeof CATEGORIES] === category,
  );

  return <CategoryPageClient label={label} cards={filteredCards} />;
}
