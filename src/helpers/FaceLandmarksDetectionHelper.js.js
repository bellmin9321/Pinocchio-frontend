import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { MESH_ANNOTATIONS, BOUNDING_BOX } from "../constants";

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
let gaze, state;

export async function loadFaceLandmarksDetection(video, canvas) {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;

  const detectorConfig = {
    maxFaces: 1,
    runtime: "mediapipe",
    refineLandmarks: true,
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4",
  };

  await tf.setBackend("webgl");

  detector = await faceLandmarksDetection.createDetector(model, detectorConfig);

  if (video && canvas) {
    video.width = 1050;

    canvas.width = video.width;
    canvas.height = video.heigth;
    ctx = canvas.getContext("2d");
  }
}

export async function detectLies(video) {
  const predictions = await detector.estimateFaces(video);
  let positionXLeftIris;
  let positionYLeftIris;

  if (predictions) {
    drawIris(predictions);

    if (predictions?.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.keypoints;
        positionXLeftIris = keypoints[leftEyeIris[0]].x;
        positionYLeftIris = keypoints[leftEyeIris[0]].y;

        const faceTopRightX = video.width - BOUNDING_BOX.topLeft[0];
        const faceTopRightY = BOUNDING_BOX.topLeft[1];
        const faceBottomLeftX = video.width - BOUNDING_BOX.bottomRight[0];
        const faceBottomLeftY = BOUNDING_BOX.bottomRight[1];

        // Detect Gazing
        if (faceBottomLeftX > 0 && !isFaceRotated(video, predictions)) {
          const positionLeftIrisX = video.width - positionXLeftIris;
          const normalizedXIrisPosition = normalize(
            positionLeftIrisX,
            faceTopRightX,
            faceBottomLeftX,
          );

          const normalizedYIrisPosition = normalize(
            positionYLeftIris,
            faceTopRightY,
            faceBottomLeftY,
          );

          if (
            normalizedXIrisPosition < 0.7 ||
            normalizedXIrisPosition > 0.85 ||
            normalizedYIrisPosition === 1 ||
            normalizedYIrisPosition < 0.75
          ) {
            gaze = "UNDETECTED GAZING";
          } else if (
            0.82 < normalizedXIrisPosition &&
            normalizedXIrisPosition < 0.85 &&
            0.8 < normalizedYIrisPosition < 0.95
          ) {
            gaze = "RIGHT";
          } else if (
            0.73 < normalizedXIrisPosition &&
            normalizedXIrisPosition < 0.76 &&
            0.8 < normalizedYIrisPosition > 0.95
          ) {
            gaze = "LEFT";
          } else {
            gaze = "STRAIGHT";
          }
        }
      });
    }

    return {
      EYES_BLINKING: detectBlinkingEyes(predictions),
      EYES_GAZING: gaze,
      HEAD_STATE: state,
    };
  }
}

const normalize = (val, max, min) =>
  Math.max(0, Math.min(1, (val - min) / (max - min)));

function isFaceRotated(video, predictions) {
  if (predictions) {
    if (predictions?.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.keypoints;

        const xPositionLeftCheek = video.width - keypoints[leftCheek].x;
        const xPositionRightCheek = video.width - keypoints[rightCheek].x;
        const xPositionMidwayBetweenEyes =
          video.width - keypoints[midwayBetweenEyes].x;

        const widthLeftSideFace =
          xPositionMidwayBetweenEyes - xPositionLeftCheek;
        const widthRightSideFace =
          xPositionRightCheek - xPositionMidwayBetweenEyes;

        const difference = widthRightSideFace - widthLeftSideFace;

        if (
          widthLeftSideFace < widthRightSideFace &&
          Math.abs(difference) > 30
        ) {
          state = "LEFT";
          return true;
        } else if (
          widthLeftSideFace > widthRightSideFace &&
          Math.abs(difference) > 30
        ) {
          state = "RIGHT";
          return true;
        }

        state = "FRONT";
        return false;
      });
    }
  }
}

function drawIris(predictions) {
  if (ctx) {
    ctx.strokeStyle = "red";

    if (predictions) {
      if (predictions?.length > 0) {
        predictions.forEach((prediction) => {
          const keypoints = prediction.keypoints;

          for (let i = 468; i < 478; i++) {
            const { x, y } = keypoints[i];

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 5 * Math.PI);
            ctx.fill();
          }
        });
      }
    }
  }
}

let eyesClosed = 0;
let eyesBlinkedCounter = 0;
let countForReset = 0;
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

    if (predictions) {
      if (predictions?.length > 0) {
        predictions.forEach((prediction) => {
          keypoints = prediction.keypoints;

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

      if (rightEyeCenterPointDistance < 2 && leftEyeCenterPointDistance < 2) {
        eyesClosed = 1;
      }

      if (
        eyesClosed === 1 &&
        rightEyeCenterPointDistance > 5 &&
        leftEyeCenterPointDistance > 5
      ) {
        eyesBlinkedCounter++;
        eyesClosed = 0;
      }

      countForReset++;

      if (countForReset === 15) {
        eyesBlinkedCounter = 0;
        countForReset = 0;
      }

      return eyesBlinkedCounter;
    }
  }
}
