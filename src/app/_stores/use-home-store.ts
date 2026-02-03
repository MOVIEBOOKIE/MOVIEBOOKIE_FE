import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CATEGORY_LABELS } from "@/constants";

export type HomeTab = "discover" | "recommend";
export type CategoryLabel = (typeof CATEGORY_LABELS)[number];

type HomeUIState = {
  activeTab: HomeTab;
  selectedCategory: CategoryLabel;
  fetchedCategories: CategoryLabel[];

  setActiveTab: (tab: HomeTab) => void;
  setSelectedCategory: (label: CategoryLabel) => void;
  ensureFetchedCategory: (label: CategoryLabel) => void;
  reset: () => void;

  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
};

const DEFAULT_CATEGORY: CategoryLabel = "인기";

export const useHomeUIStore = create<HomeUIState>()(
  persist(
    (set, get) => ({
      activeTab: "discover",
      selectedCategory: DEFAULT_CATEGORY,
      fetchedCategories: ["인기", "최신"],

      setActiveTab: (tab) => set({ activeTab: tab }),

      setSelectedCategory: (label) => {
        set({ selectedCategory: label });
        get().ensureFetchedCategory(label);
      },

      ensureFetchedCategory: (label) => {
        const { fetchedCategories } = get();
        if (fetchedCategories.includes(label)) return;
        set({ fetchedCategories: [...fetchedCategories, label] });
      },

      reset: () =>
        set({
          activeTab: "discover",
          selectedCategory: DEFAULT_CATEGORY,
          fetchedCategories: ["인기", "최신"],
        }),

      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "home-ui-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        activeTab: state.activeTab,
        selectedCategory: state.selectedCategory,
        fetchedCategories: state.fetchedCategories,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
