import { EventFormValues } from "app/_types/event";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EventFormStore {
  formData: EventFormValues;
  setFormData: (data: EventFormValues) => void;
  resetFormData: () => void;

  step: number;
  setStep: (step: number) => void;
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

export const useEventFormStore = create<EventFormStore>()(
  persist(
    (set) => ({
      formData: defaultFormData,
      setFormData: (data) => set({ formData: data }),
      resetFormData: () =>
        set({
          formData: defaultFormData,
          step: 0,
        }),
      step: 0,
      setStep: (step) => set({ step }),
    }),
    {
      name: "event-form-session",
      partialize: (state) => ({
        formData: state.formData,
      }),
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);
