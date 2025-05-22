import { useMutation } from "@tanstack/react-query";
import { apiPost } from "app/_apis/methods";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return await apiPost<null, { email: string }>("/email/send", { email });
    },
  });
};

const formatPhoneNumberForApi = (phone: string) => phone.replace(/-/g, "");

export const useSendSms = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      const cleaned = formatPhoneNumberForApi(phone);
      return await apiPost<null, { phoneNum: string }>("/sms/send", {
        phoneNum: cleaned,
      });
    },
  });
};
