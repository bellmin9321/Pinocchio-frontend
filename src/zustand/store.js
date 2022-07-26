import create from "zustand";
import { devtools } from "zustand/middleware";
import { QUESTION_LIST, HARDCORE_QUESTION_LIST } from "../constants";

const store = (set) => ({
  isMuted: false,
  isWebcamOpen: true,
  isMirrored: true,
  isHardcoreSelected: false,
  isQuestionDone: false,
  isDetected: true,
  isFitted: true,
  questionList,
  hardcoreList,
  randomQuestionList: [],
  showModal: false,
  modalSize: "S",
  screenshotList: [],
  questionCount: 0,
  lieCount: 0,
  headCount: 0,
  eyesCount: 0,

  toggleIsMuted: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleIsWebcamOpen: () =>
    set((state) => ({ isWebcamOpen: !state.isWebcamOpen })),
  toggleIsMirrored: () => set((state) => ({ isMirrored: !state.isMirrored })),
});

const questionList = QUESTION_LIST;
const hardcoreList = HARDCORE_QUESTION_LIST;

const useStore = create(devtools(store));

export default useStore;
