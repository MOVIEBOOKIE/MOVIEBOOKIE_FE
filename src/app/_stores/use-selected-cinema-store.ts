import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedCinema {
  locationName: string;
  address: string;
  locationImageUrl: string;
}

interface SelectedCinemaStore {
  selectedCinema: SelectedCinema | null;
  setSelectedCinema: (cinema: SelectedCinema) => void;
}

export const useSelectedCinemaStore = create<SelectedCinemaStore>()(
  persist(
    (set) => ({
      selectedCinema: null,
      setSelectedCinema: (cinema) => set({ selectedCinema: cinema }),
    }),
    {
      name: "selected-cinema-session",
      storage: {
        getItem: (name: string): any => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: any) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);
