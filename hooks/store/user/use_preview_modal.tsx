import { Category, Menu, Size, Image } from "@/lib/types/store_types";
import { create } from "zustand";

interface PreviewModalStore {
  isOpen: boolean;
  data?: Menu & { images: Image[]; category?: Category; size?: Size };

  onOpen: (
    data: Menu & { images: Image[]; category?: Category; size?: Size }
  ) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (
    data: Menu & { images: Image[]; category?: Category; size?: Size }
  ) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
