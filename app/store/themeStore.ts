import { create } from "zustand";

interface themeState {
  state: string;
  detectTheme: (theme: string) => Promise<void>;

}

export const useUIStore = create<themeState>((set) => ({
    state: "dark",
    detectTheme: async (theme: string) => {
            set({ state: theme });  
    },
}));
