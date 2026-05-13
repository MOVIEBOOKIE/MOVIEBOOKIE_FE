import "server-only";

import type { QueryClient } from "@tanstack/react-query";

import { categoryEventsQueryOptions } from "app/_hooks/events/use-category-events";
import { getForwardedCookieHeader } from "app/_apis/server-cookie";

export const prefetchHomeCategoryEvents = async (
  queryClient: QueryClient,
  category: string,
) => {
  const cookieHeader = await getForwardedCookieHeader();

  try {
    await queryClient.prefetchQuery(
      categoryEventsQueryOptions(
        category,
        cookieHeader
          ? {
              headers: {
                Cookie: cookieHeader,
              },
            }
          : undefined,
      ),
    );
  } catch (error) {
    console.error("홈 카테고리 이벤트 prefetch 실패:", error);
  }
};
