// apis/events.ts
import { apiClient } from "@/utils/axios";

export interface CreateEventRequest {
  request: {
    mediaType: string;
    eventDate: string;
    eventStartTime: string;
    eventProgressTime: number;
    recruitmentStart: string;
    recruitmentEnd: string;
    minParticipants: number;
    maxParticipants: number;
    locationId: number;
    mediaTitle: string;
    eventTitle: string;
    description: string;
  };
  eventImage?: File | null;
}

export const createEvent = async (data: CreateEventRequest) => {
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(data.request)], { type: "application/json" }),
  );

  if (data.eventImage) {
    formData.append("eventImage", data.eventImage);
  }

  const response = await apiClient.post("/api/events", formData);
  return response.data;
};
