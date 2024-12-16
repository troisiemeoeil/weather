import { create } from "zustand";

interface themeState {
  state: string;
 
  setThemeMode: (theme: string) => Promise<void>;
}
//update the theme state everytime the user changes the theme
export const useThemeStore = create<themeState>((set) => ({
    state: "dark",
    setThemeMode: async (theme: string) => {
    set({ state: theme });  
  },
 
}));
