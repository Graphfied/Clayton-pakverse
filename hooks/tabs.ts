import { create } from "zustand";

const useStore = create((set) => ({
  activeTab: "Desk",
  setActiveTab: (tab: string) => set({ activeTab: tab }),
}));

export default useStore;
