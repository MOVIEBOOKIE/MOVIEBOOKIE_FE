import { EventFormValues } from "app/_types/event";

export const createEventFormData = (data: EventFormValues): FormData => {
  const formData = new FormData();

  const payload = {
    mediaType: data.mediaType,
    eventDate: data.eventDate,
    eventStartTime: data.eventStartTime,
    eventProgressTime: Number(data.eventProgressTime),
    recruitmentStart: data.recruitmentStart,
    recruitmentEnd: data.recruitmentEnd,
    minParticipants: Number(data.minParticipants),
    maxParticipants: Number(data.maxParticipants),
    locationId: Number(data.locationId),
    mediaTitle: data.mediaTitle,
    eventTitle: data.eventTitle,
    description: data.description,
  };
  formData.append(
    "request",
    new Blob([JSON.stringify(payload)], { type: "application/json" }),
  );

  if (data.thumbnail) {
    formData.append("eventImage", data.thumbnail);
  }

  return formData;
};
