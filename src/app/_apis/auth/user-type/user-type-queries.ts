import { queryOptions } from "@tanstack/react-query";
import { getUser, getUserTypeResult } from "./user-type";

export const USER_TYPE_KEY = {
  RESULT: () => ["user-type"],
  USER: () => ["user"],
} as const;

export const USER_TYPE_OPTION = {
  RESULT: () =>
    queryOptions({
      queryKey: USER_TYPE_KEY.RESULT(),
      queryFn: () => getUserTypeResult(),
      staleTime: 1000 * 60 * 60 * 24,
    }),
  USER: () =>
    queryOptions({
      queryKey: USER_TYPE_KEY.USER(),
      queryFn: () => getUser(),
      staleTime: 1000 * 60 * 60 * 24,
    }),
};
