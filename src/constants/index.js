// Question
export const QUESTION_INTERVAL = 5000;
export const QUESTION_DELAY = 1000;
export const QUESTION_COUNTDOWN = 1000;
export const DETECT_INTERVAL = 200;
export const TOTAL_QUESTIONS = 10;
export const LOADING_DELAY = 4000;

export const QUESTION_LIST = [
  "나는 모쏠이다",
  "지금 떨고있다",
  "나는 이성을 좋아한다",
  "혼자 밥먹는게 편하다",
  "세상이 망하길 바란다",
  "전 여자친구가 생각난다",
  "내가 잘났다고 생각한다",
  "내가 잘생겼다고 생각한다",
  "코딩을 잘한다고 생각한다",
  "바닐라코딩에 온 걸 후회한다",
  "머리를 긁고 냄새를 맡는다",
  "수영장에서 오줌 싼 적이 있다",
  "바닐라코딩에 좋아하는 사람이 있다",
  "만난 이성 수를 손가락으로 셀 수 없다",
  "신었던 양말을 또 신으려 냄새를 맡은 적이 있다",
  "켄님은 바닐라코딩으로 막대한 수익을 얻었다고 생각한다",
];

// Mediapipe-facemesh Keypoints
export const BOUNDING_BOX = {
  topLeft: [232.28, 145.26],
  bottomRight: [449.75, 308.36],
};

export const MESH_ANNOTATIONS = {
  silhouette: [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379,
    378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127,
    162, 21, 54, 103, 67, 109,
  ],

  lipsUpperOuter: [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291],
  lipsLowerOuter: [146, 91, 181, 84, 17, 314, 405, 321, 375, 291],
  lipsUpperInner: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308],
  lipsLowerInner: [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308],

  rightEyeUpper0: [246, 161, 160, 159, 158, 157, 173],
  rightEyeLower0: [33, 7, 163, 144, 145, 153, 154, 155, 133],
  rightEyeUpper1: [247, 30, 29, 27, 28, 56, 190],
  rightEyeLower1: [130, 25, 110, 24, 23, 22, 26, 112, 243],
  rightEyeUpper2: [113, 225, 224, 223, 222, 221, 189],
  rightEyeLower2: [226, 31, 228, 229, 230, 231, 232, 233, 244],
  rightEyeLower3: [143, 111, 117, 118, 119, 120, 121, 128, 245],

  rightEyebrowUpper: [156, 70, 63, 105, 66, 107, 55, 193],
  rightEyebrowLower: [35, 124, 46, 53, 52, 65],

  rightEyeIris: [473, 474, 475, 476, 477],

  leftEyeUpper0: [466, 388, 387, 386, 385, 384, 398],
  leftEyeLower0: [263, 249, 390, 373, 374, 380, 381, 382, 362],
  leftEyeUpper1: [467, 260, 259, 257, 258, 286, 414],
  leftEyeLower1: [359, 255, 339, 254, 253, 252, 256, 341, 463],
  leftEyeUpper2: [342, 445, 444, 443, 442, 441, 413],
  leftEyeLower2: [446, 261, 448, 449, 450, 451, 452, 453, 464],
  leftEyeLower3: [372, 340, 346, 347, 348, 349, 350, 357, 465],

  leftEyebrowUpper: [383, 300, 293, 334, 296, 336, 285, 417],
  leftEyebrowLower: [265, 353, 276, 283, 282, 295],

  leftEyeIris: [468, 469, 470, 471, 472],

  midwayBetweenEyes: [168],

  noseTip: [1],
  noseBottom: [2],
  noseRightCorner: [98],
  noseLeftCorner: [327],

  rightCheek: [205],
  leftCheek: [425],
};
