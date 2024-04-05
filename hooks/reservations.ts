// store.ts
import { create } from "zustand";

// Define a type for the store's state
type ReservationState = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

// Create the store
export const useReservationStore = create<ReservationState>((set) => ({
  currentStep: 0,
  setCurrentStep: (step: number) => set({ currentStep: step }),
}));
