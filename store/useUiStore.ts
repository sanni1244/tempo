import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  loading: boolean;

  // Actions
  toggleSidebar: () => void;
  openModal: () => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  sidebarOpen: false,
  modalOpen: false,
  loading: false,

  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
  setLoading: (loading) => set({ loading }),
}));
