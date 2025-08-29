import { PATHS } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postUserType } from "app/_apis/auth/user-type/user-type";
import { USER_TYPE_OPTION } from "app/_apis/auth/user-type/user-type-queries";
import { UserTypeData } from "app/_types/user";
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

export const useGetUser = () => {
  return useQuery(USER_TYPE_OPTION.USER());
};
