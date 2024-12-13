import { create } from "zustand";

interface themeState {
  state: string;
 
  setThemeMode: (theme: string) => Promise<void>;
}

export const useThemeStore = create<themeState>((set) => ({
    state: "dark",
    setThemeMode: async (theme: string) => {
    set({ state: theme });  
  },
 
}));
