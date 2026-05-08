import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Client from "./client";
import { categoryEventsQueryOptions } from "app/_hooks/events/use-category-events";

export default async function Home() {
  const DEFAULT_HOME_CATEGORY = "인기";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    categoryEventsQueryOptions(DEFAULT_HOME_CATEGORY),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-[calc(100dvh-102px)]">
        <Client />
      </div>
    </HydrationBoundary>
  );
}
