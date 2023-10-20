import { create } from "zustand";

type ICoverImageStoreProps = {
  url?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onReplace: (url: string) => void;
};

export const useCoverImageStore = create<ICoverImageStoreProps>((set) => ({
  url: undefined,
  isOpen: false,
  onClose: () => set({ isOpen: false, url: undefined }),
  onOpen: () => set({ isOpen: true, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));
