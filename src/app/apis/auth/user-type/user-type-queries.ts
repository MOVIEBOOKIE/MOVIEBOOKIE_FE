import { queryOptions } from "@tanstack/react-query";
import { getUserTypeResult } from "./user-type";

export const USER_TYPE_KEY = {
  RESULT: () => ["user-type"],
} as const;

export const USER_TYPE_OPTION = {
  RESULT: () =>
    queryOptions({
      queryKey: USER_TYPE_KEY.RESULT(),
      queryFn: () => getUserTypeResult(),
    }),
};
