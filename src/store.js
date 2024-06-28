/* eslint-disable no-unused-vars */
import { create } from "zustand";
const useStore = create((set) => ({
  count: 0,
  adicionar: () => set((state) => ({ count: state.count + 1 })),
}));
