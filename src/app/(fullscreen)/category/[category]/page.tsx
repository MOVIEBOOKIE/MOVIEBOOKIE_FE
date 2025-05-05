import { Card, Header } from "@/components";
import { CATEGORIES, CATEGORY_TYPE_TO_LABEL } from "@/constants/categories";
import { MOVIE_LISTS } from "@/mocks/movie-list";
import { notFound } from "next/navigation";

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

  const filteredCards = MOVIE_LISTS.filter(
    (card) =>
      CATEGORIES[card.category as keyof typeof CATEGORIES] === params.category,
  );
  return (
    <div className="flex min-h-screen flex-col px-5 pt-11 pb-28.5 text-white">
      <Header title={label} />
      <div className="mt-6 flex flex-col">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, idx) => (
            <div key={idx}>
              <Card {...card} />
              {idx < filteredCards.length - 1 && (
                <div className="my-4 h-px w-full bg-gray-950" />
              )}
            </div>
          ))
        ) : (
          <p className="mt-8 text-center text-gray-500">x</p>
        )}
      </div>
    </div>
  );
}
