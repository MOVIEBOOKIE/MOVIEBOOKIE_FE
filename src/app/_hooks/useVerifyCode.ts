import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";

interface VerifyPayload {
  phoneNum: string;
  certificationCode: string;
}

export const useVerifySms = () => {
  return useMutation({
    mutationFn: async ({ phoneNum, certificationCode }: VerifyPayload) => {
      const res = await apiClient.post("/api/sms/verify", {
        phoneNum,
        certificationCode,
      });
      return res.data;
    },
  });
};

interface VerifyEmailPayload {
  email: string;
  certificationCode: string;
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ email, certificationCode }: VerifyEmailPayload) => {
      const res = await apiClient.post("/api/email/verify", {
        email,
        certificationCode,
      });
      return res.data;
    },
  });
};
