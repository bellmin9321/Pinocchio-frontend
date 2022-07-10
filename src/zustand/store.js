import create from "zustand";
import { devtools } from "zustand/middleware";

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

const questionList = [
  "나는 지금 떨고있다",
  "나는 모쏠이다",
  "나는 내가 잘생겼다고 생각한다",
  "나는 바닐라코딩에 좋아하는 사람이 있다",
  "나는 코딩을 잘한다고 생각한다",
  "켄님은 바닐라코딩으로 막대한 수익을 얻었다고 생각한다",
  "전 여자친구가 생각난다",
  "나는 바닐코딩에 온 걸 후회한다",
  "나는 신었던 양말을 또 신으려 냄새를 맡은 적이 있다",
  "나는 머리를 긁고 냄새를 맡는다",
  "나는 목욕탕에서 소변을 본 적이 있다",
  "나는 혼자 밥먹는게 편하다",
  "세상이 망하길 바란다",
  "나는 내가 잘났다고 생각한다",
  "만난 이성 수가 손가락으로 셀 수 없다",
  "나는 게이다",
];

const useStore = create(devtools(store));

export default useStore;
