import { useMutation } from "@tanstack/react-query";
import { postLogout } from "app/_apis/auth/auth";

export const useLogout = () => {
  return useMutation({
    mutationFn: postLogout,
  });
};
