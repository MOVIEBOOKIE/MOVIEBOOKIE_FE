import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CATEGORY_LABELS } from "@/constants";

export type HomeTab = "discover" | "recommend";
export type CategoryLabel = (typeof CATEGORY_LABELS)[number];
export type HomeBackContext = {
  source: "home";
  path: string;
  detailId: string;
};

type HomeUIState = {
  activeTab: HomeTab;
  selectedCategory: CategoryLabel;
  fetchedCategories: CategoryLabel[];
  backContext: HomeBackContext | null;

  setActiveTab: (tab: HomeTab) => void;
  setSelectedCategory: (label: CategoryLabel) => void;
  ensureFetchedCategory: (label: CategoryLabel) => void;
  reset: () => void;
  setBackContext: (context: HomeBackContext | null) => void;
  clearBackContext: () => void;

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
      backContext: null,

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
          backContext: null,
        }),

      setBackContext: (context) => set({ backContext: context }),
      clearBackContext: () => set({ backContext: null }),

      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "home-ui-store",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => sessionStorage)
          : undefined,
      partialize: (state) => ({
        activeTab: state.activeTab,
        selectedCategory: state.selectedCategory,
        fetchedCategories: state.fetchedCategories,
        backContext: state.backContext,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
