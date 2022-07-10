import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { MESH_ANNOTATIONS, boundingBox } from "../constants";

const {
  leftCheek,
  rightCheek,
  midwayBetweenEyes,
  rightEyeUpper0,
  rightEyeLower0,
  leftEyeUpper0,
  leftEyeLower0,
  leftEyeIris,
} = MESH_ANNOTATIONS;

let ctx, detector;

export const initEyeDetection = async (video, canvas) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;

  const detectorConfig = {
    maxFaces: 1,
    runtime: "mediapipe",
    refineLandmarks: true,
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
  };

  await tf.setBackend("webgl");

  detector = await faceLandmarksDetection.createDetector(model, detectorConfig);

  if (video && canvas) {
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    video.width = videoWidth;
    video.height = videoHeight;

    canvas.width = video.width;
    canvas.height = video.heigth;
    ctx = canvas.getContext("2d");
  }
};

let amountStraightEvents = 0;
let positionXLeftIris;
let positionYLeftIris;
let event;

const normalize = (val, max, min) =>
  Math.max(0, Math.min(1, (val - min) / (max - min)));

const isFaceRotated = (video) => {
  const xPositionLeftCheek = video.width - leftCheek.x;
  const xPositionRightCheek = video.width - rightCheek.x;
  const xPositionMidwayBetweenEyes = video.width - midwayBetweenEyes.x;

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

export async function renderPrediction(video) {
  const predictions = await detector.estimateFaces(video, true, true);

  if (predictions) {
    detectIris(predictions);

    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.keypoints;
        positionXLeftIris = keypoints[leftEyeIris[0]].x;
        positionYLeftIris = keypoints[leftEyeIris[0]].y;

        const faceTopRightX = video.width - boundingBox.topLeft[0]; // -132.28
        const faceTopRightY = boundingBox.topLeft[1]; // 145.26
        const faceBottomLeftX = video.width - boundingBox.bottomRight[0]; // -349.75
        const faceBottomLeftY = boundingBox.bottomRight[1]; // 308.36

        // console.log(
        //   faceTopRightX, // 407.72
        //   faceTopRightY, // 145.26
        //   faceBottomLeftX, // 190.25
        //   faceBottomLeftY, // 308.36
        // );

        if (faceBottomLeftX > 0 && !isFaceRotated(video)) {
          const positionLeftIrisX = video.width - positionXLeftIris;
          const normalizedXIrisPosition = normalize(
            positionLeftIrisX,
            faceTopRightX,
            faceBottomLeftX,
          );

          if (normalizedXIrisPosition > 0.78) {
            event = "RIGHT";
          } else if (normalizedXIrisPosition < 0.74) {
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

          console.log(normalizedYIrisPosition);
          if (normalizedYIrisPosition > 0.95) {
            event = "TOP";
          }
        }
      });
    }

    const state = {
      IRIS_SIDE: event,
      BLINKING_COUNT: detectBlinkingEyes(predictions),
    };

    return state;
  }
}

function detectIris(predictions) {
  if (ctx) {
    ctx.strokeStyle = "red";
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.keypoints;

        for (let i = 468; i < 478; i++) {
          const { x, y } = keypoints[i];

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      });
    }
  }
}

let eyesBlinkedCounter = 0;
let eyesClosed = 0;
let keypoints;

function detectBlinkingEyes(predictions) {
  if (ctx) {
    ctx.fillStyle = "red";

    const eyeOutlinePoints = rightEyeUpper0.concat(
      rightEyeLower0,
      leftEyeUpper0,
      leftEyeLower0,
    );

    let count = 1;

    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        keypoints = prediction?.keypoints;

        for (let i = 0; eyeOutlinePoints.length - 1; i++) {
          if (count === 32) {
            break;
          }

          count++;
          const { x, y } = keypoints[eyeOutlinePoints[i]];

          ctx.beginPath();
          ctx.rect(x, y, 2, 2);
          ctx.fill();
        }
      });
    }

    const rightEyeCenterPointDistance = Math.abs(
      keypoints[rightEyeUpper0[3]].y - keypoints[rightEyeLower0[4]].y,
    );

    const leftEyeCenterPointDistance = Math.abs(
      keypoints[leftEyeUpper0[3]].y - keypoints[leftEyeLower0[4]].y,
    );

    if (rightEyeCenterPointDistance < 7 && leftEyeCenterPointDistance < 7) {
      eyesClosed = 1;
    }

    if (
      eyesClosed === 1 &&
      rightEyeCenterPointDistance > 9 &&
      leftEyeCenterPointDistance > 9
    ) {
      eyesBlinkedCounter++;
      eyesClosed = 0;
    }

    if (eyesBlinkedCounter > 4) {
      eyesBlinkedCounter = 0;
    }

    return eyesBlinkedCounter;
  }
}
