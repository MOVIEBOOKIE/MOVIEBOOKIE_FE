import { EventFormValues } from "app/_types/event";
import { create } from "zustand";

interface EventFormStore {
  formData: EventFormValues;
  setFormData: (data: EventFormValues) => void;
  resetFormData: () => void;
}

const defaultFormData: EventFormValues = {
  mediaType: "",
  eventDate: "",
  eventStartTime: "",
  eventProgressTime: "",
  recruitmentStart: "",
  recruitmentEnd: "",
  minParticipants: "",
  maxParticipants: "",
  locationId: null,
  mediaTitle: "",
  eventTitle: "",
  description: "",
  thumbnail: null,
};

export const useEventFormStore = create<EventFormStore>((set) => ({
  formData: defaultFormData,
  setFormData: (data) => set({ formData: data }),
  resetFormData: () => set({ formData: defaultFormData }),
}));
