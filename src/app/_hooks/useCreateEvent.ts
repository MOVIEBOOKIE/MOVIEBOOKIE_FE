import { useMutation } from "@tanstack/react-query";
import { createEvent, CreateEventRequest } from "app/_api/events";

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: (data: CreateEventRequest) => createEvent(data),
  });
};
