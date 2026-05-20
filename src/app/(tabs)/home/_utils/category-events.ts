import "server-only";

import type { QueryClient } from "@tanstack/react-query";

import { categoryEventsQueryOptions } from "app/_hooks/events/use-category-events";
import {
  getForwardedCookieHeader,
  getRequestCookieNames,
} from "app/_apis/server-cookie";

type CategoryEventsResponse = {
  eventList?: unknown[];
};

export const prefetchHomeCategoryEvents = async (
  queryClient: QueryClient,
  category: string,
) => {
  let cookieHeader = "";
  let requestCookieNames: string[] = [];

  try {
    requestCookieNames = await getRequestCookieNames();
    cookieHeader = await getForwardedCookieHeader({ forwardAll: true });

    const queryOption = categoryEventsQueryOptions(
      category,
      cookieHeader
        ? {
            headers: {
              Cookie: cookieHeader,
            },
          }
        : undefined,
      { strict: true },
    );

    await queryClient.prefetchQuery(queryOption);

    const prefetchedData = queryClient.getQueryData<CategoryEventsResponse>(
      queryOption.queryKey,
    );

    console.log("홈 카테고리 prefetch 성공", {
      category,
      hasCookie: Boolean(cookieHeader),
      requestCookieNames,
      hasData: Boolean(prefetchedData),
      eventListLength: prefetchedData?.eventList?.length ?? 0,
      dataKeys: prefetchedData ? Object.keys(prefetchedData) : [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";

    console.error("홈 카테고리 prefetch 실패", {
      category,
      hasCookie: Boolean(cookieHeader),
      requestCookieNames,
      message,
    });
  }
};
