import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Client from "./client";
import { prefetchHomeCategoryEvents } from "./_utils/category-events";

const DEFAULT_HOME_CATEGORY = "인기";

export default async function Home() {
  const queryClient = new QueryClient();
  await prefetchHomeCategoryEvents(queryClient, DEFAULT_HOME_CATEGORY);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-[calc(100dvh-102px)]">
        <Client />
      </div>
    </HydrationBoundary>
  );
}
