import { useQuery } from "@tanstack/react-query";
import { getHomeEvents } from "app/_apis/events/home-slides";
export const useHomeEvents = () => {
  return useQuery({
    queryKey: ["home-events"],
    queryFn: getHomeEvents,
    staleTime: 1000 * 60 * 5,
  });
};
