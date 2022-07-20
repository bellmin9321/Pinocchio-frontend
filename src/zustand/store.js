import create from "zustand";
import { devtools } from "zustand/middleware";
import { QUESTION_LIST } from "../constants";

const store = (set) => ({
  isMuted: false,
  isWebcamOpen: true,
  isMirrored: true,
  isQuestionDone: false,
  questionList,
  randomQuestionList: [],
  showModal: false,
  modalSize: "SMALL",
  screenshotList: [],
  questionCount: 0,
  lieCount: 0,

  toggleIsMuted: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleIsWebcamOpen: () =>
    set((state) => ({ isWebcamOpen: !state.isWebcamOpen })),
  toggleIsMirrored: () => set((state) => ({ isMirrored: !state.isMirrored })),
});

const questionList = QUESTION_LIST;

const useStore = create(devtools(store));

export default useStore;
