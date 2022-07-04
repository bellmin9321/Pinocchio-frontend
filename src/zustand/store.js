import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  isMuted: false,
  toggleIsMuted: () => set((state) => ({ isMuted: !state.isMuted })),
  isWebcamOpen: true,
  toggleIsWebcamOpen: () =>
    set((state) => ({ isWebcamOpen: !state.isWebcamOpen })),
  isMirrored: true,
  toggleIsMirrored: () => set((state) => ({ isMirrored: !state.isMirrored })),
});

const useStore = create(devtools(store));

export default useStore;
