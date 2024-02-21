import { create } from "zustand";

interface useChefModalStore {
  isChefModalOpen: boolean;
  onChefModalOpen: () => void;
  onChefModalClose: () => void;
}

export const useChefModal = create<useChefModalStore>((set) => ({
  isChefModalOpen: false,
  onChefModalOpen: () => set({ isChefModalOpen: true }),
  onChefModalClose: () => set({ isChefModalOpen: false }),
}));
