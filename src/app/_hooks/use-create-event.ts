import { useMutation } from "@tanstack/react-query";
import { apiPost } from "../_apis/methods";
import { EventFormValues } from "app/_types/event";
import { createEventFormData } from "@/utils/create-event-formdata";

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: async (payload: EventFormValues) => {
      const formData = createEventFormData(payload);

      return await apiPost<FormData, FormData>("/events", formData);
    },
  });
};
