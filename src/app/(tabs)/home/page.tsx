import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

import Client from "./client";
import { categoryEventsQueryOptions } from "app/_hooks/events/use-category-events";

const DEFAULT_HOME_CATEGORY = "인기";

export default async function Home() {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  await queryClient.prefetchQuery(
    categoryEventsQueryOptions(
      DEFAULT_HOME_CATEGORY,
      cookieHeader
        ? {
            headers: {
              Cookie: cookieHeader,
            },
          }
        : undefined,
    ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-[calc(100dvh-102px)]">
        <Client />
      </div>
    </HydrationBoundary>
  );
}
