import { PATHS } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserTypeData } from "app/_types/user-type";
import {
  getUserTypeResult,
  postUserType,
} from "app/apis/auth/user-type/user-type";
import {
  USER_TYPE_KEY,
  USER_TYPE_OPTION,
} from "app/apis/auth/user-type/user-type-queries";
import { useRouter } from "next/navigation";

export const usePostUserType = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (body: UserTypeData) => postUserType(body),
    onSuccess: () => {
      router.push(PATHS.TRAIT_RESULT);
    },
  });
};

export const useGetUserTypeResult = () => {
  return useQuery(USER_TYPE_OPTION.RESULT());
};
