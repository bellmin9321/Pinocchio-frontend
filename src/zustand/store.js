import create from "zustand";
import { devtools } from "zustand/middleware";
import { questionList } from "../constants/question";

const store = (set) => ({
  isMuted: false,
  toggleIsMuted: () => set((state) => ({ isMuted: !state.isMuted })),
  isWebcamOpen: true,
  toggleIsWebcamOpen: () =>
    set((state) => ({ isWebcamOpen: !state.isWebcamOpen })),
  isMirrored: false,
  toggleIsMirrored: () => set((state) => ({ isMirrored: !state.isMirrored })),
  questionList,
  randomQuestionList: [],
});

const useStore = create(devtools(store));

export default useStore;
