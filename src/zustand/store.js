import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  isMuted: false,
  isWebcamOpen: true,
  isMirrored: false,
  questionList,
  randomQuestionList: [],
  showModal: false,
  modalSize: "SMALL",

  toggleIsMuted: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleIsWebcamOpen: () =>
    set((state) => ({ isWebcamOpen: !state.isWebcamOpen })),
  toggleIsMirrored: () => set((state) => ({ isMirrored: !state.isMirrored })),
});

const questionList = [
  "나는 게이다",
  "나는 모쏠이다",
  "지금 떨고있다",
  "혼자 밥먹는게 편하다",
  "세상이 망하길 바란다",
  "전 여자친구가 생각난다",
  "내가 잘났다고 생각한다",
  "내가 잘생겼다고 생각한다",
  "코딩을 잘한다고 생각한다",
  "바닐코딩에 온 걸 후회한다",
  "머리를 긁고 냄새를 맡는다",
  "수영장에서 오줌 싼 적이 있다",
  "바닐라코딩에 좋아하는 사람이 있다",
  "만난 이성 수를 손가락으로 셀 수 없다",
  "신었던 양말을 또 신으려 냄새를 맡은 적이 있다",
  "켄님은 바닐라코딩으로 막대한 수익을 얻었다고 생각한다",
];

const useStore = create(devtools(store));

export default useStore;
