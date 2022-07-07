import * as faceapi from "face-api.js";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

export const loadModels = async () => {
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    await faceapi.nets.ageGenderNet.loadFromUri("/models");
  } catch (error) {
    console.log(error);
  }
};

export const detectFaces = async (video) => {
  if (!video) {
    return;
  }

  const videoSize = video.getBoundingClientRect();
  const displaySize = { width: videoSize.width, height: videoSize.height };
  if (displaySize.height === 0) {
    return;
  }

  const faces = await faceapi
    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender();

  return faceapi.resizeResults(faces, displaySize);
};

export const drawResults = async (video, canvas, results, type) => {
  if (video && canvas && results) {
    const imgSize = video.getBoundingClientRect();
    const displaySize = { width: imgSize.width, height: imgSize.height };
    faceapi.matchDimensions(canvas, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    const resizedDetections = faceapi.resizeResults(results, displaySize);

    const face = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true);

    const jawOutline = getTop(face.landmarks.getJawOutline());
    const nose = getMeanPosition(face.landmarks.getNose());
    const mouth = getMeanPosition(face.landmarks.getMouth());
    const leftEye = getMeanPosition(face.landmarks.getLeftEye());
    const rightEye = getMeanPosition(face.landmarks.getRightEye());

    const rx = (jawOutline - mouth[1]) / face.detection._box._height + 0.5;
    const ry =
      (leftEye[0] + (rightEye[0] - leftEye[0])) / 2 -
      nose[0] / face.detection._box._width;

    let state = "undetected";

    if (face.detection._score > 0.5) {
      state = "정면";

      if (rx < 0.02) {
        state = "왼쪽으로 고개돌림";
      }

      if (rx > 0.07) {
        state = "오른쪽으로 고개돌림";
      }

      console.log(state);
    } else {
      console.log("얼굴이 제대로 인식되지 않았습니다.");
    }

    const x1 = face.landmarks._positions[0]._x;
    const y1 = face.landmarks._positions[0]._y;
    const x2 = face.landmarks._positions[16]._x;
    const y2 = face.landmarks._positions[16]._y;

    const _m = (y2 - y1) / (x2 - x1);
    const rad = Math.atan(_m);
    const ang = rad * (180 / 3.14) * -1;

    if (ang < -30) {
      console.log("왼 기울임: ", ang);
    }

    if (ang > 30) {
      console.log("오 기울임: ", ang);
    }

    switch (type) {
      case "landmarks":
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        break;
      case "expressions":
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        break;
      case "box":
        faceapi.draw.drawDetections(canvas, resizedDetections);
        break;
      case "boxLandmarks":
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        break;
      default:
        break;
    }
  }
};

function getTop(l) {
  return l.map((a) => a.y).reduce((a, b) => Math.min(a, b));
}

function getMeanPosition(l) {
  return l
    .map((a) => [a.x, a.y])
    .reduce((a, b) => [a[0] + b[0], a[1] + b[1]])
    .map((a) => a / l.length);
}

let model, video;
let amountStraightEvents = 0;
let positionXLeftIris;
let positionYLeftIris;
let event;

const normalize = (val, max, min) =>
  Math.max(0, Math.min(1, (val - min) / (max - min)));

const isFaceRotated = (landmarks) => {
  const { leftCheek, rightCheek, midwayBetweenEyes } = landmarks;

  const xPositionLeftCheek = video.width - leftCheek[0][0];
  const xPositionRightCheek = video.width - rightCheek[0][0];
  const xPositionMidwayBetweenEyes = video.width - midwayBetweenEyes[0][0];

  const widthLeftSideFace = xPositionMidwayBetweenEyes - xPositionLeftCheek;
  const widthRightSideFace = xPositionRightCheek - xPositionMidwayBetweenEyes;

  const difference = widthRightSideFace - widthLeftSideFace;

  if (widthLeftSideFace < widthRightSideFace && Math.abs(difference) > 5) {
    return true;
  } else if (
    widthLeftSideFace > widthRightSideFace &&
    Math.abs(difference) > 5
  ) {
    return true;
  }
  return false;
};

async function renderGazePrediction(video) {
  const predictions = await model.estimateFaces({
    input: video,
    returnTensors: false,
    flipHorizontal: false,
    predictIrises: true,
  });

  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      positionXLeftIris = prediction.annotations.leftEyeIris[0][0];
      positionYLeftIris = prediction.annotations.leftEyeIris[0][1];

      const faceBottomLeftX =
        video.width - prediction.boundingBox.bottomRight[0];
      const faceBottomLeftY = prediction.boundingBox.bottomRight[1];

      const faceTopRightX = video.width - prediction.boundingBox.topLeft[0];
      const faceTopRightY = prediction.boundingBox.topLeft[1];

      if (faceBottomLeftX > 0 && !isFaceRotated(prediction.annotations)) {
        const positionLeftIrisX = video.width - positionXLeftIris;
        const normalizedXIrisPosition = normalize(
          positionLeftIrisX,
          faceTopRightX,
          faceBottomLeftX,
        );

        if (normalizedXIrisPosition > 0.355) {
          event = "RIGHT";
        } else if (normalizedXIrisPosition < 0.315) {
          event = "LEFT";
        } else {
          amountStraightEvents++;
          if (amountStraightEvents > 8) {
            event = "STRAIGHT";
            amountStraightEvents = 0;
          }
        }

        const normalizedYIrisPosition = normalize(
          positionYLeftIris,
          faceTopRightY,
          faceBottomLeftY,
        );

        if (normalizedYIrisPosition > 0.62) {
          event = "TOP";
        }
      }
    });
  }
  console.log("event!!! ", event);
  return event;
}

const loadModel = async () => {
  try {
    await tf.setBackend("webgl");
    tf.engine().startScope();

    model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
      { maxFaces: 1 },
    );
  } catch (error) {
    tf.engine().endScope();
    throw Error(`blazeface Estimate Error : ${error}`);
  }
};

const setUpCamera = async (video) => {
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
};

export const gaze = {
  loadModel,
  setUpCamera,
  renderGazePrediction,
};

export const detectHands = async () => {
  const model = await handpose.load();
  console.log("Handpose model loaded");

  const hand = await model.estimateHands(video);
  console.log(hand);
};
