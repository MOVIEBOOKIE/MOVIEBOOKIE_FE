import { create } from "zustand";

interface SelectedCinema {
  locationName: string;
  address: string;
  locationImageUrl: string;
}

interface SelectedCinemaStore {
  selectedCinema: SelectedCinema | null;
  setSelectedCinema: (cinema: SelectedCinema) => void;
}

export const useSelectedCinemaStore = create<SelectedCinemaStore>((set) => ({
  selectedCinema: null,
  setSelectedCinema: (cinema) => set({ selectedCinema: cinema }),
}));
