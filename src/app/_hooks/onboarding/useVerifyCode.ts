import { useMutation } from "@tanstack/react-query";
import { apiPost } from "app/apis/methods";

interface VerifySmsPayload {
  phoneNum: string;
  certificationCode: string;
}

export const useVerifySms = () => {
  return useMutation({
    mutationFn: async (payload: VerifySmsPayload) => {
      return await apiPost<null, VerifySmsPayload>("/sms/verify", payload);
    },
  });
};

interface VerifyEmailPayload {
  email: string;
  certificationCode: string;
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (payload: VerifyEmailPayload) => {
      return await apiPost<null, VerifyEmailPayload>("/email/verify", payload);
    },
  });
};
