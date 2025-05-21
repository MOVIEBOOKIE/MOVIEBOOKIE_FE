import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await apiClient.post("/api/email/send", { email });
      return res.data;
    },
  });
};
const formatPhoneNumberForApi = (phone: string) => phone.replace(/-/g, "");

export const useSendSms = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      const cleaned = formatPhoneNumberForApi(phone);
      const response = await apiClient.post("/api/sms/send", {
        phoneNum: cleaned,
      });
      return response.data;
    },
  });
};
