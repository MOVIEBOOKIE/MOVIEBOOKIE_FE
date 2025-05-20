import { apiClient } from "@/utils/axios";
import { EventCreateFormData } from "@/utils/event-create-formdata";
import { useMutation } from "@tanstack/react-query";
import { EventFormValues } from "app/_types/event";

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: async (payload: EventFormValues) => {
      const formData = EventCreateFormData(payload);
      const res = await apiClient.post("/api/events", formData);
      return res.data;
    },
  });
};
